const BASE_URL = 'https://dummyjson.com/products';
const Timeout_Limit = 8000;
const USD_TO_INR = 90

export const getLiveCategories = async()=>{
    try {
        const res = await fetch(`${BASE_URL})/category-list`);
        const data = await res.json();

        const categories = data.slice(0,10)
            .map((categoryItemName) =>({
                id: categoryItemName,
                name: categoryItemName.charAt(0).toUpperCase() +
                       categoryItemName.slice(1). replace('-',' '),
                icon: categoryItemName.includes('phone') ? 'smartphone' : categoryName.includes('laptop') ? 'hard-drive' : 'disc',
            }));


        return [{ id: 'all', name: 'All Products', icon: 'grid'}, ...categories];

    } catch (error) {
        console.error('Error fetching categories:', error);
        return [{ id: 'all', name: 'All Products', icon: 'grid' }];
    }
};


// now fetch products and format prices into Rupees & EMI
export const getLiveProducts = async (category = 'all', searchQuery = '') =>{
    try {
        let url = `${BASE_URL}?limit = 12`;

        if(searchQuery.trim() == ''){
            url = `${BASE_URL}/search?q=${encodeURIComponent(searchQuery)}`;
        }else if(category !== 'all'){
            url = `${BASE_URL}/category/${encodeURIComponent(category)}`;
        }


        const res = await fetch(url);
        const data = await res.json();

        return data.products.map((item) =>{
            const inrPrice = Math.round(item.price * 90); //usd to inr
            const monthlyCost = Math.round(inrPrice/12);


            return {
                id: String(item.id),
                name: item.title,
                brand: item.brand || '1Fi Choice',
                price: inrPrice,
                monthlyCost: monthlyCost,
                tag: item.rating >= 4.0 ? 'Bestseller' : 'New',
                image: item.thumbnail,
                description: item.description,
                emiPlans: [
                    { id: '3m', months: 3, perMonth: Math.round(inrPrice / 3) },
                    { id: '6m', months: 6, perMonth: Math.round(inrPrice / 6) },
                    { id: '12m', months: 12, perMonth: monthlyCost },
                
                ],

            };
        });
    } catch (error) {
        console.log('Error fetching products:', error);
        return [];
    }

}