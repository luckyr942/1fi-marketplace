import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Image,
    SafeAreaView,
    StatusBar,
    Platform,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const TABS = [
    { id: 'brands', label: 'Top Brands' },
    { id: 'nearby', label: 'Nearby Stores' },
    { id: 'marketplace', label: '1Fi Marketplace' },
];

const CATEGORIES = [
    { id: 'mobiles', name: 'Mobiles', icon: 'smartphone' },
    { id: 'laptops', name: 'Laptops', icon: 'hard-drive' },
    { id: 'electronics', name: 'Electronics', icon: 'disc' },
    { id: 'fashion', name: 'Fashion', icon: 'shopping-bag' },
    { id: 'home', name: 'Home', icon: 'home' },
];

const FEATURED_DEALS = [
    {
        id: 'deal-iphone16',
        tag: 'New',
        name: 'iPhone 16',
        variant: '(128 GB)',
        price: 79900,
        monthlyCost: 6659,
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&auto=format&fit=crop&q=80',
    },
    {
        id: 'deal-macbook-m3',
        tag: 'Bestseller',
        name: 'MacBook Air M3',
        variant: '(256 GB)',
        price: 99900,
        monthlyCost: 8325,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&auto=format&fit=crop&q=80',
    },
];

const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;

export default function ShopScreen({ navigation }) {
    const [currentTab, setCurrentTab] = useState('marketplace');
    const [search, setSearch] = useState('');
    const [savedItems, setSavedItems] = useState({});

    const handleFavoriteToggle = (id) => {
        setSavedItems((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleProductPress = (product) => {
        if (navigation?.navigate) {
            navigation.navigate('ProductDetails', { product });
        }
    };

    return (
        <View style={styles.screen}>
            <StatusBar barStyle="light-content" backgroundColor="#2700B8" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollArea}
                bounces={false}
            >
                {/* Top Hero Banner */}
                <LinearGradient
                    colors={['#2700B8', '#3C10E8', '#4E1DF0']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.hero}
                >
                    <SafeAreaView>
                        <View style={styles.heroRow}>
                            <View style={styles.heroCopy}>
                                <View style={styles.pillBadge}>
                                    <Text style={styles.pillBadgeText}>✦ NO-COST EMIs</Text>
                                </View>
                                <Text style={styles.heading}>Shop today,</Text>
                                <Text style={styles.heading}>Pay later using</Text>
                                <Text style={styles.heading}>Mutual funds.</Text>
                                <Text style={styles.subheading}>
                                    No credit score required. No interest.{'\n'}Backed by your investments.
                                </Text>
                            </View>

                            <View style={styles.heroVisual}>
                                <Image
                                    source={{
                                        uri: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&auto=format&fit=crop&q=80',
                                    }}
                                    style={styles.heroImg}
                                    resizeMode="contain"
                                />
                            </View>
                        </View>
                    </SafeAreaView>
                </LinearGradient>

                {/* Tab Switcher */}
                <View style={styles.tabBarWrapper}>
                    <View style={styles.tabPill}>
                        {TABS.map((tab) => {
                            const active = currentTab === tab.id;
                            return (
                                <TouchableOpacity
                                    key={tab.id}
                                    activeOpacity={0.8}
                                    onPress={() => setCurrentTab(tab.id)}
                                    style={[styles.tabBtn, active && styles.activeTabBtn]}
                                >
                                    <Text style={[styles.tabLabel, active && styles.activeTabLabel]}>
                                        {tab.label}
                                    </Text>
                                    {active && <View style={styles.indicator} />}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* Tab Content Views */}
                {currentTab === 'brands' && (
                    <View style={styles.emptyView}>
                        <Text style={styles.emptyTitle}>Top Brands</Text>
                        <Text style={styles.emptySubtitle}>No implementation required</Text>
                    </View>
                )}

                {currentTab === 'nearby' && (
                    <View style={styles.emptyView}>
                        <Text style={styles.emptyTitle}>Nearby Stores</Text>
                        <Text style={styles.emptySubtitle}>No implementation required</Text>
                    </View>
                )}

                {currentTab === 'marketplace' && (
                    <View style={styles.marketContent}>
                        {/* Search Input */}
                        <View style={styles.searchBox}>
                            <Feather name="search" size={18} color="#94A3B8" />
                            <TextInput
                                placeholder="Search products, brands..."
                                placeholderTextColor="#94A3B8"
                                value={search}
                                onChangeText={setSearch}
                                style={styles.input}
                            />
                            {search.length > 0 && (
                                <TouchableOpacity onPress={() => setSearch('')}>
                                    <Ionicons name="close-circle" size={16} color="#94A3B8" />
                                </TouchableOpacity>
                            )}
                        </View>

                        {/* Category Strip */}
                        <View style={styles.categoryRow}>
                            {CATEGORIES.map((item) => (
                                <TouchableOpacity key={item.id} style={styles.categoryBtn} activeOpacity={0.7}>
                                    <View style={styles.categoryIconWrap}>
                                        <Feather name={item.icon} size={20} color="#3C10E8" />
                                    </View>
                                    <Text style={styles.categoryText}>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Top Deals Section */}
                        <View style={styles.sectionHeadingRow}>
                            <Text style={styles.sectionHeader}>Top Deals</Text>
                            <TouchableOpacity activeOpacity={0.7}>
                                <Text style={styles.seeAllBtn}>See all</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Product Cards */}
                        <View style={styles.grid}>
                            {FEATURED_DEALS.map((deal) => {
                                const isSaved = !!savedItems[deal.id];
                                return (
                                    <TouchableOpacity
                                        key={deal.id}
                                        style={styles.dealCard}
                                        activeOpacity={0.9}
                                        onPress={() => handleProductPress(deal)}
                                    >
                                        <View style={styles.cardHeader}>
                                            <View
                                                style={[
                                                    styles.tagPill,
                                                    deal.tag === 'Bestseller' ? styles.bestsellerTag : styles.newTag,
                                                ]}
                                            >
                                                <Text style={styles.tagText}>{deal.tag}</Text>
                                            </View>
                                            <TouchableOpacity
                                                onPress={() => handleFavoriteToggle(deal.id)}
                                                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                            >
                                                <Ionicons
                                                    name={isSaved ? 'heart' : 'heart-outline'}
                                                    size={18}
                                                    color={isSaved ? '#EF4444' : '#94A3B8'}
                                                />
                                            </TouchableOpacity>
                                        </View>

                                        <Image
                                            source={{ uri: deal.image }}
                                            style={styles.productImg}
                                            resizeMode="contain"
                                        />

                                        <View style={styles.cardInfo}>
                                            <Text style={styles.productTitle}>{deal.name}</Text>
                                            <Text style={styles.productSpec}>{deal.variant}</Text>
                                            <Text style={styles.productPrice}>{formatCurrency(deal.price)}</Text>

                                            <View style={styles.emiHighlight}>
                                                <Text style={styles.emiHighlightText}>
                                                    {formatCurrency(deal.monthlyCost)}/month
                                                </Text>
                                            </View>
                                            <Text style={styles.emiTerms}>No-cost EMI</Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F8F9FD',
    },
    scrollArea: {
        paddingBottom: 90,
    },
    hero: {
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 12 : 24,
        paddingBottom: 44,
    },
    heroRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    heroCopy: {
        flex: 1,
    },
    pillBadge: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255, 255, 255, 0.18)',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
        marginBottom: 8,
    },
    pillBadgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '700',
    },
    heading: {
        fontSize: 22,
        fontWeight: '800',
        color: '#FFFFFF',
        lineHeight: 28,
    },
    subheading: {
        fontSize: 11,
        color: '#E0E7FF',
        lineHeight: 16,
        marginTop: 6,
    },
    heroVisual: {
        width: 110,
        height: 105,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroImg: {
        width: '100%',
        height: '100%',
    },
    tabBarWrapper: {
        marginTop: -26,
        paddingHorizontal: 16,
        zIndex: 10,
    },
    tabPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3EEFB',
        borderRadius: 36,
        padding: 5,
        height: 56,
    },
    tabBtn: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 28,
        position: 'relative',
    },
    activeTabBtn: {
        backgroundColor: '#FFFFFF',
        ...Platform.select({
            ios: {
                shadowColor: '#3C10E8',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.12,
                shadowRadius: 6,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    tabLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#64748B',
    },
    activeTabLabel: {
        color: '#3C10E8',
        fontWeight: '800',
        marginBottom: 2,
    },
    indicator: {
        width: 22,
        height: 3,
        backgroundColor: '#3C10E8',
        borderRadius: 2,
        marginTop: 2,
    },
    marketContent: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: 46,
        borderRadius: 23,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#E8ECF4',
        gap: 10,
    },
    input: {
        flex: 1,
        fontSize: 13,
        color: '#0F172A',
    },
    categoryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 18,
    },
    categoryBtn: {
        alignItems: 'center',
        gap: 6,
    },
    categoryIconWrap: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: '#EEF2FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#475569',
    },
    sectionHeadingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
    },
    seeAllBtn: {
        fontSize: 13,
        fontWeight: '700',
        color: '#3C10E8',
    },
    grid: {
        flexDirection: 'row',
        gap: 12,
    },
    dealCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 12,
        borderWidth: 1,
        borderColor: '#F1F4FA',
        ...Platform.select({
            ios: {
                shadowColor: '#0F172A',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.04,
                shadowRadius: 8,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tagPill: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    newTag: {
        backgroundColor: '#3C10E8',
    },
    bestsellerTag: {
        backgroundColor: '#6D28D9',
    },
    tagText: {
        color: '#FFFFFF',
        fontSize: 9,
        fontWeight: '800',
    },
    productImg: {
        width: '100%',
        height: 105,
        marginVertical: 8,
    },
    cardInfo: {
        marginTop: 2,
    },
    productTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0F172A',
    },
    productSpec: {
        fontSize: 11,
        color: '#64748B',
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 15,
        fontWeight: '800',
        color: '#0F172A',
    },
    emiHighlight: {
        alignSelf: 'flex-start',
        backgroundColor: '#EEF2FF',
        paddingHorizontal: 7,
        paddingVertical: 3.5,
        borderRadius: 6,
        marginTop: 6,
    },
    emiHighlightText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#3C10E8',
    },
    emiTerms: {
        fontSize: 10,
        color: '#3C10E8',
        marginTop: 3,
        fontWeight: '600',
    },
    emptyView: {
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
    },
    emptySubtitle: {
        fontSize: 13,
        color: '#94A3B8',
        marginTop: 4,
    },
});