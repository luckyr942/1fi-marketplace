import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function EMIScreen({ route, navigation }) {
  const { product } = route.params || {};
  const totalPrice = product?.totalPrice || 99900;

  // Available EMI tenures
  const TENURES = [
    { months: 6,  tag: 'Short Tenure',  rec: false },
    { months: 12, tag: 'Recommended',   rec: true },
    { months: 18, tag: 'Popular',       rec: false },
    { months: 24, tag: 'Low EMI',       rec: false },
    { months: 36, tag: 'Flexible',      rec: false },
  ];

  const [selectedTenure, setSelectedTenure] = useState(TENURES[1]);
  const monthlyCost = Math.round(totalPrice / selectedTenure.months);

  const handleProceedSummary = () => {
    navigation.navigate('OrderSummary', {
      product: { ...product, selectedTenure, monthlyCost },
    });
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* ─── NAV BAR ─── */}
      <SafeAreaView style={styles.safeHeader}>
        <View style={styles.navBar}>
          <TouchableOpacity
            style={styles.circleBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={22} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.navTitle}>Select EMI Plan</Text>
          <View style={{ width: 36 }} />
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ─── MINI PRODUCT SUMMARY ─── */}
        <View style={styles.productSummaryCard}>
          <Image
            source={{ uri: product?.image }}
            style={styles.thumbImg}
            resizeMode="contain"
          />
          <View style={styles.summaryCopy}>
            <Text style={styles.brandText}>{product?.brand}</Text>
            <Text style={styles.productTitle} numberOfLines={1}>
              {product?.name}
            </Text>
            <Text style={styles.variantText}>
              {product?.selectedColor?.name} • {product?.selectedSpec?.name}
            </Text>
            <Text style={styles.totalPriceText}>
              ₹{totalPrice.toLocaleString('en-IN')}
            </Text>
          </View>
        </View>

        {/* ─── TENURE OPTIONS ─── */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Choose Loan Duration</Text>
          <Text style={styles.sectionSub}>
            All plans include 0% No-Cost EMI & instant MF approval
          </Text>

          <View style={styles.plansList}>
            {TENURES.map((item) => {
              const active = selectedTenure.months === item.months;
              const emiVal = Math.round(totalPrice / item.months);

              return (
                <TouchableOpacity
                  key={item.months}
                  onPress={() => setSelectedTenure(item)}
                  activeOpacity={0.85}
                  style={[styles.planCard, active && styles.activePlanCard]}
                >
                  <View style={styles.radioOuter}>
                    {active && <View style={styles.radioInner} />}
                  </View>

                  <View style={{ flex: 1 }}>
                    <View style={styles.planHeaderRow}>
                      <Text style={[styles.tenureTitle, active && styles.activeTenureTitle]}>
                        {item.months} Months Plan
                      </Text>
                      {item.rec && (
                        <View style={styles.recTag}>
                          <Text style={styles.recTagText}>RECOMMENDED</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.noCostBadge}>0% Interest No-Cost EMI</Text>
                  </View>

                  <View style={styles.emiAmountCol}>
                    <Text style={[styles.emiAmountText, active && styles.activeEmiAmountText]}>
                      ₹{emiVal.toLocaleString('en-IN')}
                    </Text>
                    <Text style={styles.perMonthText}>/month</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ─── LOAN BREAKDOWN ─── */}
        <View style={styles.breakdownCard}>
          <Text style={styles.breakdownTitle}>Loan & Pledge Summary</Text>

          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Product Amount</Text>
            <Text style={styles.tableVal}>₹{totalPrice.toLocaleString('en-IN')}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Tenure</Text>
            <Text style={styles.tableVal}>{selectedTenure.months} Months</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Annual Interest Rate</Text>
            <Text style={styles.tableValFree}>0% p.a. (No Cost)</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Processing Fee</Text>
            <Text style={styles.tableValFree}>₹0 (FREE)</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.tableRow}>
            <Text style={styles.tableLabelBold}>Mutual Fund Lien Lock</Text>
            <Text style={styles.tableValBold}>₹{totalPrice.toLocaleString('en-IN')}</Text>
          </View>
        </View>
      </ScrollView>

      {/* ─── BOTTOM STICKY CTA ─── */}
      <View style={styles.bottomBar}>
        <View style={{ flex: 1 }}>
          <Text style={styles.bottomLabel}>{selectedTenure.months} Months Plan</Text>
          <Text style={styles.bottomEmi}>
            ₹{monthlyCost.toLocaleString('en-IN')}
            <Text style={styles.bottomEmiSub}>/mo</Text>
          </Text>
        </View>

        <TouchableOpacity
          style={styles.ctaBtn}
          onPress={handleProceedSummary}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={['#3C10E8', '#6D28D9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaGradient}
          >
            <Text style={styles.ctaText}>Proceed to Order</Text>
            <Feather name="arrow-right" size={18} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8F9FD' },
  safeHeader: { backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F1F4FA' },
  navBar: {
    height: 52, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingHorizontal: 16,
  },
  circleBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center',
  },
  navTitle: { fontSize: 16, fontWeight: '800', color: '#0F172A' },
  scrollContent: { paddingBottom: 110 },

  productSummaryCard: {
    flexDirection: 'row', backgroundColor: '#FFFFFF', padding: 16,
    marginHorizontal: 16, marginTop: 16, borderRadius: 16,
    alignItems: 'center', gap: 14, borderWidth: 1, borderColor: '#E8ECF4',
  },
  thumbImg: { width: 70, height: 70 },
  summaryCopy: { flex: 1 },
  brandText: { fontSize: 10, fontWeight: '800', color: '#3C10E8', textTransform: 'uppercase' },
  productTitle: { fontSize: 14, fontWeight: '800', color: '#0F172A' },
  variantText: { fontSize: 11, color: '#64748B', marginTop: 2 },
  totalPriceText: { fontSize: 15, fontWeight: '900', color: '#0F172A', marginTop: 4 },

  section: { paddingHorizontal: 16, marginTop: 20 },
  sectionHeader: { fontSize: 16, fontWeight: '800', color: '#0F172A' },
  sectionSub: { fontSize: 12, color: '#64748B', marginTop: 2, marginBottom: 14 },
  plansList: { gap: 10 },
  planCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF',
    borderRadius: 16, padding: 16, borderWidth: 1.5, borderColor: '#E2E8F0', gap: 12,
  },
  activePlanCard: { borderColor: '#3C10E8', backgroundColor: '#F3EEFB' },
  radioOuter: {
    width: 20, height: 20, borderRadius: 10,
    borderWidth: 2, borderColor: '#94A3B8',
    alignItems: 'center', justifyContent: 'center',
  },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#3C10E8' },
  planHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  tenureTitle: { fontSize: 14, fontWeight: '800', color: '#0F172A' },
  activeTenureTitle: { color: '#3C10E8' },
  recTag: { backgroundColor: '#3C10E8', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  recTagText: { color: '#FFFFFF', fontSize: 8, fontWeight: '800' },
  noCostBadge: { fontSize: 11, color: '#16A34A', fontWeight: '700', marginTop: 2 },
  emiAmountCol: { alignItems: 'flex-end' },
  emiAmountText: { fontSize: 16, fontWeight: '900', color: '#0F172A' },
  activeEmiAmountText: { color: '#3C10E8' },
  perMonthText: { fontSize: 10, color: '#64748B' },

  breakdownCard: {
    backgroundColor: '#FFFFFF', marginHorizontal: 16, marginTop: 20,
    padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#E8ECF4',
  },
  breakdownTitle: { fontSize: 14, fontWeight: '800', color: '#0F172A', marginBottom: 12 },
  tableRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
  tableLabel: { fontSize: 12, color: '#64748B' },
  tableVal: { fontSize: 12, fontWeight: '700', color: '#0F172A' },
  tableValFree: { fontSize: 12, fontWeight: '700', color: '#16A34A' },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 10 },
  tableLabelBold: { fontSize: 13, fontWeight: '800', color: '#0F172A' },
  tableValBold: { fontSize: 14, fontWeight: '900', color: '#3C10E8' },

  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#FFFFFF', paddingHorizontal: 20, paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 28 : 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderTopWidth: 1, borderTopColor: '#F1F4FA',
  },
  bottomLabel: { fontSize: 10, color: '#64748B', fontWeight: '600', textTransform: 'uppercase' },
  bottomEmi: { fontSize: 18, fontWeight: '900', color: '#3C10E8' },
  bottomEmiSub: { fontSize: 11, fontWeight: '600', color: '#64748B' },
  ctaBtn: { borderRadius: 24, overflow: 'hidden' },
  ctaGradient: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 22, paddingVertical: 12, gap: 8,
  },
  ctaText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
});
