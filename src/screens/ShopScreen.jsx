import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useMarketplaceHook } from '../hooks/useMarketplace';

import MarketplaceSkeleton from '../components/marketPlace/MarketplaceSkeleton';
import MarketplaceEmpty from '../components/marketPlace/MarketplaceEmpty';
import MarketplaceError from '../components/marketPlace/MarketplaceError';

export default function ShopScreen({ navigation }) {
  const {
    products,
    categories,
    loading,
    error,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    refreshData,
  } = useMarketplaceHook();

  const [currentTab, setCurrentTab] = useState('marketplace');
  const [savedItems, setSavedItems] = useState({});

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#2700B8" translucent />

      {/* 1. FIXED TOP HERO HEADER */}
      <LinearGradient
        colors={['#2700B8', '#3C10E8', '#4E1DF0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroFixed}
      >
        <SafeAreaView edges={['top']}>
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

      {/* 2. FLOATING SEGMENT TABS (Pinned over hero bottom) */}
      <View style={styles.tabBarWrapper}>
        <View style={styles.tabPill}>
          {[
            { id: 'brands', label: 'Top Brands' },
            { id: 'nearby', label: 'Nearby Stores' },
            { id: 'marketplace', label: '1Fi Marketplace' },
          ].map((tab) => {
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

      {/* 3. SCROLLABLE CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollArea}
        bounces={true}
      >
        {/* A. TOP BRANDS TAB (Blank Placeholder as per assignment) */}
        {currentTab === 'brands' && (
          <View style={styles.blankTabContainer}>
            <View style={styles.blankIconWrap}>
              <Feather name="award" size={32} color="#94A3B8" />
            </View>
            <Text style={styles.blankTitle}>Top Brands</Text>
            <Text style={styles.blankSub}>
              Discover official brand outlets and partner stores. Coming soon on 1Fi!
            </Text>
          </View>
        )}

        {/* B. NEARBY STORES TAB (Blank Placeholder as per assignment) */}
        {currentTab === 'nearby' && (
          <View style={styles.blankTabContainer}>
            <View style={styles.blankIconWrap}>
              <Feather name="map-pin" size={32} color="#94A3B8" />
            </View>
            <Text style={styles.blankTitle}>Nearby Stores</Text>
            <Text style={styles.blankSub}>
              Explore local offline electronics and vehicle partners in your neighborhood.
            </Text>
          </View>
        )}

        {/* C. 1FI MARKETPLACE TAB (Fully Implemented) */}
        {currentTab === 'marketplace' && (
          <View style={styles.marketContent}>
            {/* Search Input */}
            <View style={styles.searchBox}>
              <Feather name="search" size={18} color="#94A3B8" />
              <TextInput
                placeholder="Search products, brands..."
                placeholderTextColor="#94A3B8"
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.input}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={16} color="#94A3B8" />
                </TouchableOpacity>
              )}
            </View>

            {/* Horizontal Category Strip */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryScroll}
            >
              {categories.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <TouchableOpacity
                    key={cat.id}
                    onPress={() => setSelectedCategory(cat.id)}
                    style={styles.categoryBtn}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.categoryIconWrap, active && styles.activeCatWrap]}>
                      <MaterialCommunityIcons
                        name={cat.icon || 'view-grid-outline'}
                        size={22}
                        color={active ? '#FFFFFF' : '#475569'}
                      />
                    </View>
                    <Text style={[styles.categoryText, active && styles.activeCatText]}>
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Section Header */}
            <View style={styles.sectionHeadingRow}>
              <Text style={styles.sectionHeader}>Featured Deals</Text>
              <Text style={styles.productCount}>{products.length} Products</Text>
            </View>

            {/* STATE HANDLING: LOADING / ERROR / EMPTY / PRODUCT GRID */}
            {loading ? (
              <MarketplaceSkeleton />
            ) : error ? (
              <MarketplaceError error={error} onRetry={refreshData} />
            ) : products.length === 0 ? (
              <MarketplaceEmpty
                searchQuery={searchQuery}
                onClearSearch={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              />
            ) : (
              <View style={styles.grid}>
                {products.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.dealCard}
                    activeOpacity={0.85}
                    onPress={() => navigation.navigate('ProductDetails', { product: item })}
                  >
                    {/* Header Tag & Favorite Icon */}
                    <View style={styles.cardHeader}>
                      <View
                        style={[
                          styles.tagPill,
                          item.tag === 'New' ? styles.newTag : styles.bestsellerTag,
                        ]}
                      >
                        <Text style={styles.tagText}>{item.tag || 'Popular'}</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                          setSavedItems((p) => ({ ...p, [item.id]: !p[item.id] }))
                        }
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      >
                        <Ionicons
                          name={savedItems[item.id] ? 'heart' : 'heart-outline'}
                          size={18}
                          color={savedItems[item.id] ? '#EF4444' : '#94A3B8'}
                        />
                      </TouchableOpacity>
                    </View>

                    {/* Product Image */}
                    <Image
                      source={{ uri: item.image }}
                      style={styles.productImg}
                      resizeMode="contain"
                    />

                    {/* Info */}
                    <View style={styles.cardInfo}>
                      <Text style={styles.productTitle} numberOfLines={1}>
                        {item.name}
                      </Text>
                      <Text style={styles.productSpec}>{item.brand}</Text>
                      <Text style={styles.productPrice}>
                        ₹{item.price.toLocaleString('en-IN')}
                      </Text>

                      <View style={styles.emiHighlight}>
                        <Text style={styles.emiHighlightText}>
                          ₹{item.monthlyCost.toLocaleString('en-IN')}/month
                        </Text>
                      </View>
                      <Text style={styles.emiTerms}>No-cost EMI</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
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
  heroFixed: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    zIndex: 1,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
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
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 26,
  },
  subheading: {
    fontSize: 11,
    color: '#E0E7FF',
    lineHeight: 16,
    marginTop: 6,
  },
  heroVisual: {
    width: 100,
    height: 95,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImg: {
    width: '100%',
    height: '100%',
  },
  tabBarWrapper: {
    marginTop: -24,
    paddingHorizontal: 16,
    zIndex: 10,
  },
  tabPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3EEFB',
    borderRadius: 36,
    padding: 5,
    height: 54,
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
  scrollArea: {
    paddingBottom: 90,
  },
  blankTabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  blankIconWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  blankTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
  },
  blankSub: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
  },
  marketContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 44,
    borderRadius: 22,
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
  categoryScroll: {
    paddingVertical: 16,
    gap: 16,
  },
  categoryBtn: {
    alignItems: 'center',
    gap: 6,
  },
  categoryIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCatWrap: {
    backgroundColor: '#3C10E8',
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  activeCatText: {
    color: '#3C10E8',
    fontWeight: '800',
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
  productCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  dealCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
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
    paddingVertical: 2.5,
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
    height: 100,
    marginVertical: 6,
  },
  cardInfo: {
    marginTop: 2,
  },
  productTitle: {
    fontSize: 13,
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
    paddingHorizontal: 6,
    paddingVertical: 3,
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
    marginTop: 2,
    fontWeight: '600',
  },
});
