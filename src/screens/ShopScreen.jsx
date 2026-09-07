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
import { Feather, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const TABS = [
    { key: 'topBrands', label: 'Shop Brands' },
    { key: 'nearbyStores', label: 'Nearby Stores' },
    { key: 'marketplace', label: '1Fi Marketplace' },
];

const CATEGORIES = [
    { id: '1', name: 'Mobiles', icon: 'smartphone' },
    { id: '2', name: 'Laptops', icon: 'hard-drive' },
    { id: '3', name: 'Electronics', icon: 'disc' },
    { id: '4', name: 'Fashion', icon: 'shopping-bag' },
    { id: '5', name: 'Home', icon: 'home' },
];

const TOP_DEALS = [
    {
        id: 'deal-1',
        badge: 'New',
        name: 'iPhone 16',
        variant: '(128 GB)',
        price: 79900,
        monthlyEmi: 6659,
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&auto=format&fit=crop&q=80',
    },
    {
        id: 'deal-2',
        badge: 'Bestseller',
        name: 'MacBook Air M3',
        variant: '(256 GB)',
        price: 99900,
        monthlyEmi: 8325,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&auto=format&fit=crop&q=80',
    },
];

export default function ShopScreen({ navigation }) {
    const [activeTab, setActiveTab] = useState('marketplace');
    const [searchQuery, setSearchQuery] = useState('');
    const [wishlist, setWishlist] = useState({});

    const toggleWishlist = (id) => {
        setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#2A0845" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                bounces={false}
            >
                {/* 1. Purple Hero Header Section */}
                <View style={styles.heroSection}>
                    <View style={styles.heroLeft}>
                        <View style={styles.noCostBadge}>
                            <Text style={styles.noCostBadgeText}>✦ NO-COST EMIs</Text>
                        </View>
                        <Text style={styles.heroTitle}>Shop today,</Text>
                        <Text style={styles.heroTitle}>Pay later using</Text>
                        <Text style={styles.heroHighlight}>Mutual funds.</Text>
                        <Text style={styles.heroSubtitle}>
                            No credit score required. No interest.{'\n'}Backed by your investments.
                        </Text>
                    </View>

                    {/* 3D Shopping Visual Graphic */}
                    <View style={styles.heroRight}>
                        <Image
                            source={{
                                uri: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&auto=format&fit=crop&q=80',
                            }}
                            style={styles.heroBagImage}
                            resizeMode="contain"
                        />
                    </View>
                </View>

                {/* 2. Floating Segmented Navigation Bar */}
                <View style={styles.segmentContainer}>
                    <View style={styles.outerCapsule}>
                        {TABS.map((tab) => {
                            const isActive = activeTab === tab.key;
                            return (
                                <TouchableOpacity
                                    key={tab.key}
                                    activeOpacity={0.8}
                                    onPress={() => setActiveTab(tab.key)}
                                    style={[styles.segmentBtn, isActive && styles.activePillCard]}
                                >
                                    <Text style={[styles.segmentText, isActive && styles.activeSegmentText]}>
                                        {tab.label}
                                    </Text>
                                    {isActive && <View style={styles.activeDash} />}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* 3. Screen Views */}
                {activeTab === 'topBrands' && (
                    <View style={styles.blankContainer}>
                        <Text style={styles.blankTitle}>Shop Brands</Text>
                        <Text style={styles.blankSubtitle}>(No implementation required)</Text>
                    </View>
                )}

                {activeTab === 'nearbyStores' && (
                    <View style={styles.blankContainer}>
                        <Text style={styles.blankTitle}>Nearby Stores</Text>
                        <Text style={styles.blankSubtitle}>(No implementation required)</Text>
                    </View>
                )}

                {activeTab === 'marketplace' && (
                    <View style={styles.marketplaceWrapper}>
                        {/* Search Input Bar */}
                        <View style={styles.searchBar}>
                            <Feather name="search" size={18} color="#94A3B8" />
                            <TextInput
                                placeholder="Search products, brands..."
                                placeholderTextColor="#94A3B8"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                style={styles.searchInput}
                            />
                            {searchQuery.length > 0 && (
                                <TouchableOpacity onPress={() => setSearchQuery('')}>
                                    <Ionicons name="close-circle" size={16} color="#94A3B8" />
                                </TouchableOpacity>
                            )}
                        </View>

                        {/* Circular Category Strip */}
                        <View style={styles.categoryRow}>
                            {CATEGORIES.map((cat) => (
                                <TouchableOpacity key={cat.id} style={styles.categoryItem} activeOpacity={0.8}>
                                    <View style={styles.categoryCircle}>
                                        <Feather name={cat.icon} size={20} color="#5B21B6" />
                                    </View>
                                    <Text style={styles.categoryLabel}>{cat.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Top Deals Header */}
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Top Deals</Text>
                            <TouchableOpacity>
                                <Text style={styles.seeAllText}>See all</Text>
                            </TouchableOpacity>
                        </View>

                        {/* 2-Column Product Deals Grid */}
                        <View style={styles.dealsGrid}>
                            {TOP_DEALS.map((deal) => {
                                const isFavorite = wishlist[deal.id];
                                return (
                                    <TouchableOpacity
                                        key={deal.id}
                                        style={styles.dealCard}
                                        activeOpacity={0.9}
                                        onPress={() => navigation?.navigate?.('ProductDetails', { product: deal })}
                                    >
                                        <View style={styles.dealCardHeader}>
                                            <View
                                                style={[
                                                    styles.badgePill,
                                                    deal.badge === 'Bestseller' && { backgroundColor: '#7C3AED' },
                                                ]}
                                            >
                                                <Text style={styles.badgeText}>{deal.badge}</Text>
                                            </View>
                                            <TouchableOpacity onPress={() => toggleWishlist(deal.id)} hitSlop={10}>
                                                <Ionicons
                                                    name={isFavorite ? 'heart' : 'heart-outline'}
                                                    size={18}
                                                    color={isFavorite ? '#EF4444' : '#94A3B8'}
                                                />
                                            </TouchableOpacity>
                                        </View>

                                        <Image
                                            source={{ uri: deal.image }}
                                            style={styles.dealImage}
                                            resizeMode="contain"
                                        />

                                        <View style={styles.dealContent}>
                                            <Text style={styles.dealProductName}>{deal.name}</Text>
                                            <Text style={styles.dealProductVariant}>{deal.variant}</Text>
                                            <Text style={styles.dealProductPrice}>
                                                ₹{deal.price.toLocaleString('en-IN')}
                                            </Text>

                                            <View style={styles.emiPill}>
                                                <Text style={styles.emiPillText}>
                                                    ₹{deal.monthlyEmi.toLocaleString('en-IN')}/month
                                                </Text>
                                            </View>
                                            <Text style={styles.noCostEmiText}>No-cost EMI</Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {/* Mid-Page Promo Card */}
                        <View style={styles.promoBanner}>
                            <View style={styles.promoTextGroup}>
                                <Text style={styles.promoTitle}>Upgrade your tech</Text>
                                <Text style={styles.promoSubtitle}>with easy EMIs</Text>
                            </View>
                            <TouchableOpacity style={styles.promoButton} activeOpacity={0.85}>
                                <Text style={styles.promoButtonText}>Shop Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#2A0845',
    },
    scrollContent: {
        paddingBottom: 95, // Clearance for the floating bottom navigation bar
        backgroundColor: '#FFFFFF',
    },

    // Hero Section
    heroSection: {
        backgroundColor: '#2A0845',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 42,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    heroLeft: {
        flex: 1,
    },
    noCostBadge: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255, 255, 255, 0.16)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 10,
    },
    noCostBadgeText: {
        color: '#E9D5FF',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    heroTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#FFFFFF',
        lineHeight: 28,
    },
    heroHighlight: {
        fontSize: 22,
        fontWeight: '800',
        color: '#FFFFFF',
        lineHeight: 28,
        marginBottom: 6,
    },
    heroSubtitle: {
        fontSize: 11,
        color: '#DDD6FE',
        lineHeight: 16,
    },
    heroRight: {
        width: 110,
        height: 105,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroBagImage: {
        width: '100%',
        height: '100%',
    },

    // Floating Segmented Selector
    segmentContainer: {
        marginTop: -26,
        paddingHorizontal: 16,
        zIndex: 10,
    },
    outerCapsule: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3EEFB',
        borderRadius: 40,
        padding: 5,
        borderWidth: 1.5,
        borderColor: '#ECE5F8',
        height: 56,
    },
    segmentBtn: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        position: 'relative',
    },
    activePillCard: {
        backgroundColor: '#FFFFFF',
        ...Platform.select({
            ios: {
                shadowColor: '#5B21B6',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.12,
                shadowRadius: 6,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    segmentText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#64748B',
    },
    activeSegmentText: {
        color: '#6D28D9',
        fontWeight: '800',
        marginBottom: 2,
    },
    activeDash: {
        width: 22,
        height: 3,
        backgroundColor: '#6D28D9',
        borderRadius: 2,
        marginTop: 2,
    },

    // Marketplace Layout
    marketplaceWrapper: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        height: 44,
        borderRadius: 22,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        gap: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 13,
        color: '#0F172A',
    },

    // Category Bubbles
    categoryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 18,
    },
    categoryItem: {
        alignItems: 'center',
        gap: 6,
    },
    categoryCircle: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: '#F5F3FF',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#EDE9FE',
    },
    categoryLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: '#475569',
    },

    // Deals Header
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
    },
    seeAllText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#5B21B6',
    },

    // Deals Grid
    dealsGrid: {
        flexDirection: 'row',
        gap: 12,
    },
    dealCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 12,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        elevation: 2,
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
    },
    dealCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    badgePill: {
        backgroundColor: '#6D28D9',
        paddingHorizontal: 7,
        paddingVertical: 2.5,
        borderRadius: 6,
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 9,
        fontWeight: '700',
    },
    dealImage: {
        width: '100%',
        height: 105,
        marginVertical: 8,
    },
    dealContent: {
        marginTop: 2,
    },
    dealProductName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0F172A',
    },
    dealProductVariant: {
        fontSize: 11,
        color: '#64748B',
        marginBottom: 4,
    },
    dealProductPrice: {
        fontSize: 15,
        fontWeight: '800',
        color: '#0F172A',
    },
    emiPill: {
        alignSelf: 'flex-start',
        backgroundColor: '#F5F3FF',
        paddingHorizontal: 7,
        paddingVertical: 3.5,
        borderRadius: 6,
        marginTop: 6,
    },
    emiPillText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#6D28D9',
    },
    noCostEmiText: {
        fontSize: 10,
        color: '#6D28D9',
        marginTop: 2,
        fontWeight: '500',
    },

    // Promo Banner
    promoBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F3E8FF',
        borderRadius: 16,
        padding: 16,
        marginTop: 20,
    },
    promoTextGroup: {
        flex: 1,
    },
    promoTitle: {
        fontSize: 15,
        fontWeight: '800',
        color: '#2A0845',
    },
    promoSubtitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#4C1D95',
    },
    promoButton: {
        backgroundColor: '#6D28D9',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 12,
    },
    promoButtonText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
    },

    // Blank Placeholders
    blankContainer: {
        height: 320,
        justifyContent: 'center',
        alignItems: 'center',
    },
    blankTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
    },
    blankSubtitle: {
        fontSize: 13,
        color: '#94A3B8',
        marginTop: 4,
    },
});