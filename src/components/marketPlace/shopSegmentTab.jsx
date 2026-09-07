import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

const TABS = [
    { key: 'topBrands', label: 'Top Brands' },
    { key: 'nearbyStores', label: 'Nearby Stores' },
    { key: 'marketplace', label: '1Fi Marketplace' },
];

export default function ShopSegmentTabs({ activeTab, onTabChange }) {
    return (
        <View style={styles.outerCapsule}>
            {TABS.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                    <TouchableOpacity
                        key={tab.key}
                        activeOpacity={0.8}
                        onPress={() => onTabChange(tab.key)}
                        style={[styles.tabButton, isActive && styles.activePillCard]}
                    >
                        <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                            {tab.label}
                        </Text>
                        {/* Active Bottom Dash */}
                        {isActive && <View style={styles.activeDash} />}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    outerCapsule: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3EEFB', // Soft lavender-white capsule background
        borderRadius: 40,
        padding: 5,
        marginHorizontal: 16,
        borderWidth: 1.5,
        borderColor: '#ECE5F8',
        height: 58,
    },
    tabButton: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,
        position: 'relative',
    },
    activePillCard: {
        backgroundColor: '#FFFFFF',
        ...Platform.select({
            ios: {
                shadowColor: '#5B21B6',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 6,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    tabText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#64748B', // Inactive muted slate
    },
    activeTabText: {
        color: '#6D28D9', // Active vibrant purple
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
});