import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

export default function MarketplaceSkeleton() {
  return (
    <View style={styles.grid}>
      {[1, 2, 3, 4].map((key) => (
        <View key={key} style={styles.card}>
          <View style={styles.imgPlaceholder} />
          <View style={styles.lineLong} />
          <View style={styles.lineShort} />
          <View style={styles.pricePill} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
    marginTop: 8,
  },
  card: {
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
  imgPlaceholder: {
    width: '100%',
    height: 90,
    backgroundColor: '#E2E8F0',
    borderRadius: 12,
    marginBottom: 10,
    opacity: 0.6,
  },
  lineLong: {
    width: '85%',
    height: 12,
    backgroundColor: '#E2E8F0',
    borderRadius: 6,
    marginBottom: 6,
    opacity: 0.6,
  },
  lineShort: {
    width: '50%',
    height: 10,
    backgroundColor: '#E2E8F0',
    borderRadius: 5,
    marginBottom: 10,
    opacity: 0.5,
  },
  pricePill: {
    width: '60%',
    height: 20,
    backgroundColor: '#E2E8F0',
    borderRadius: 6,
    opacity: 0.6,
  },
});
