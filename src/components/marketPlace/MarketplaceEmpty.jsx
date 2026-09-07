import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function MarketplaceEmpty({ searchQuery, onClearSearch }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Feather name="search" size={32} color="#6D28D9" />
      </View>
      <Text style={styles.title}>No Products Found</Text>
      <Text style={styles.subtitle}>
        We couldn't find any products matching "{searchQuery}". Try searching for MacBooks, Smartphones, or Electric Scooters.
      </Text>
      {onClearSearch && (
        <TouchableOpacity style={styles.btn} onPress={onClearSearch} activeOpacity={0.8}>
          <Text style={styles.btnText}>Clear Search & View All</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F3EEFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: '#3C10E8',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
