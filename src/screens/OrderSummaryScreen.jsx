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
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function OrderSummaryScreen({ route, navigation }) {
  const { product } = route.params || {};

  const totalPrice   = product?.totalPrice || 99900;
  const monthlyCost  = product?.monthlyCost || 8325;
  const tenureMonths = product?.selectedTenure?.months || 12;

  const [agreed, setAgreed] = useState(true);

  const handleConfirmOrder = () => {
    navigation.navigate('OrderSuccess', {
      orderId: '1FI-' + Math.floor(100000 + Math.random() * 900000),
      product,
      totalPrice,
      monthlyCost,
      selectedTenure: tenureMonths,
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
          <Text style={styles.navTitle}>Order & Pledge Summary</Text>
          <View style={{ width: 36 }} />
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ─── PROGRESS TRACKER ─── */}
        <View style={styles.progressRow}>
          {['Details', 'EMI Plan', 'Pledge & Summary'].map((step, i) => (
            <View key={step} style={styles.stepItem}>
              <View style={[styles.stepDot, i <= 2 && styles.activeStepDot]}>
                <Text style={[styles.stepNum, i <= 2 && styles.activeStepNum]}>
                  {i + 1}
                </Text>
              </View>
              <Text style={[styles.stepLabel, i <= 2 && styles.activeStepLabel]}>
                {step}
              </Text>
            </View>
          ))}
        </View>

        {/* ─── DELIVERY ADDRESS ─── */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Feather name="map-pin" size={16} color="#3C10E8" />
              <Text style={styles.cardHeaderTitle}>Delivery Address</Text>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.editText}>Change</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.addressName}>Rahul Sharma • +91 98765 43210</Text>
          <Text style={styles.addressBody}>
            Flat 402, 1Fi Heights, 100ft Road, Indiranagar,{'\n'}Bengaluru, Karnataka - 560038
          </Text>
          <View style={styles.deliveryBadge}>
            <Feather name="truck" size={12} color="#16A34A" />
            <Text style={styles.deliveryBadgeText}>Guaranteed Express 48-Hour Delivery</Text>
          </View>
        </View>

        {/* ─── ORDER DETAILS ─── */}
        <View style={styles.card}>
          <Text style={styles.cardHeaderTitle}>Order Details</Text>
          <View style={styles.orderProductRow}>
            <Image
              source={{ uri: product?.image }}
              style={styles.thumbImg}
              resizeMode="contain"
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.brandText}>{product?.brand}</Text>
              <Text style={styles.productTitle} numberOfLines={1}>
                {product?.name}
              </Text>
              <Text style={styles.variantText}>
                {product?.selectedColor?.name} • {product?.selectedSpec?.name}
              </Text>
              <Text style={styles.productPriceText}>
                ₹{totalPrice.toLocaleString('en-IN')}
              </Text>
            </View>
          </View>
        </View>

        {/* ─── SELECTED EMI PLAN ─── */}
        <View style={styles.card}>
          <Text style={styles.cardHeaderTitle}>Selected EMI Plan</Text>
          <View style={styles.emiDetailRow}>
            <View>
              <Text style={styles.emiPlanTitle}>{tenureMonths} Months No-Cost EMI</Text>
              <Text style={styles.emiPlanSub}>0% Annual Interest Rate</Text>
            </View>
            <Text style={styles.monthlyValText}>
              ₹{monthlyCost.toLocaleString('en-IN')}/mo
            </Text>
          </View>
        </View>

        {/* ─── LIEN PLEDGE CARD ─── */}
        <LinearGradient
          colors={['#3C10E8', '#4E1DF0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.pledgeCard}
        >
          <View style={styles.pledgeHeader}>
            <MaterialCommunityIcons name="shield-check" size={26} color="#FFFFFF" />
            <View style={{ flex: 1 }}>
              <Text style={styles.pledgeTitle}>1Fi Portfolio Lien Pledge</Text>
              <Text style={styles.pledgeSub}>Backed by your Mutual Funds</Text>
            </View>
          </View>

          <View style={styles.pledgeStatsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Available MF Balance</Text>
              <Text style={styles.statVal}>₹4,85,000</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Lien Lock Amount</Text>
              <Text style={styles.statValHighlight}>
                ₹{totalPrice.toLocaleString('en-IN')}
              </Text>
            </View>
          </View>

          <Text style={styles.pledgeNote}>
            ✦ Your mutual fund holdings stay invested & keep earning market returns.
            You can un-pledge anytime upon completing EMI payments.
          </Text>
        </LinearGradient>

        {/* ─── CONSENT CHECKBOX ─── */}
        <TouchableOpacity
          style={styles.termsRow}
          onPress={() => setAgreed(!agreed)}
          activeOpacity={0.8}
        >
          <Ionicons
            name={agreed ? 'checkbox' : 'square-outline'}
            size={22}
            color={agreed ? '#3C10E8' : '#94A3B8'}
          />
          <Text style={styles.termsText}>
            I confirm the pledge of ₹{totalPrice.toLocaleString('en-IN')} in mutual
            funds and authorize 1Fi to debit ₹{monthlyCost.toLocaleString('en-IN')}/mo
            via E-NACH.
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ─── BOTTOM STICKY CTA ─── */}
      <View style={styles.bottomBar}>
        <View style={{ flex: 1 }}>
          <Text style={styles.bottomLabel}>Total Loan Amount</Text>
          <Text style={styles.bottomEmi}>₹{totalPrice.toLocaleString('en-IN')}</Text>
        </View>

        <TouchableOpacity
          style={[styles.ctaBtn, !agreed && styles.disabledCtaBtn]}
          onPress={handleConfirmOrder}
          disabled={!agreed}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={agreed ? ['#3C10E8', '#6D28D9'] : ['#94A3B8', '#CBD5E1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaGradient}
          >
            <Text style={styles.ctaText}>Confirm & Pledge MF</Text>
            <Feather name="check-circle" size={18} color="#FFFFFF" />
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

  progressRow: {
    flexDirection: 'row', justifyContent: 'space-around',
    backgroundColor: '#FFFFFF', paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: '#E8ECF4',
  },
  stepItem: { alignItems: 'center', gap: 4 },
  stepDot: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: '#E2E8F0', alignItems: 'center', justifyContent: 'center',
  },
  activeStepDot: { backgroundColor: '#3C10E8' },
  stepNum: { fontSize: 11, fontWeight: '800', color: '#64748B' },
  activeStepNum: { color: '#FFFFFF' },
  stepLabel: { fontSize: 10, color: '#64748B', fontWeight: '600' },
  activeStepLabel: { color: '#3C10E8', fontWeight: '800' },

  card: {
    backgroundColor: '#FFFFFF', marginHorizontal: 16, marginTop: 14,
    padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#E8ECF4',
  },
  cardHeaderRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 8,
  },
  cardHeaderTitle: { fontSize: 14, fontWeight: '800', color: '#0F172A' },
  editText: { fontSize: 12, color: '#3C10E8', fontWeight: '700' },
  addressName: { fontSize: 13, fontWeight: '700', color: '#0F172A', marginTop: 4 },
  addressBody: { fontSize: 12, color: '#475569', lineHeight: 16, marginTop: 2 },
  deliveryBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#DCFCE7', paddingHorizontal: 8, paddingVertical: 4,
    borderRadius: 6, alignSelf: 'flex-start', marginTop: 10,
  },
  deliveryBadgeText: { fontSize: 10, fontWeight: '700', color: '#166534' },
  orderProductRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 10 },
  thumbImg: { width: 64, height: 64 },
  brandText: { fontSize: 10, fontWeight: '800', color: '#3C10E8', textTransform: 'uppercase' },
  productTitle: { fontSize: 14, fontWeight: '800', color: '#0F172A' },
  variantText: { fontSize: 11, color: '#64748B', marginTop: 2 },
  productPriceText: { fontSize: 14, fontWeight: '800', color: '#0F172A', marginTop: 2 },
  emiDetailRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginTop: 8,
  },
  emiPlanTitle: { fontSize: 13, fontWeight: '700', color: '#0F172A' },
  emiPlanSub: { fontSize: 11, color: '#16A34A', fontWeight: '600', marginTop: 2 },
  monthlyValText: { fontSize: 16, fontWeight: '900', color: '#3C10E8' },

  pledgeCard: { marginHorizontal: 16, marginTop: 14, padding: 16, borderRadius: 18 },
  pledgeHeader: { flexDirection: 'row', gap: 12, alignItems: 'center', marginBottom: 14 },
  pledgeTitle: { fontSize: 15, fontWeight: '800', color: '#FFFFFF' },
  pledgeSub: { fontSize: 11, color: '#E0E7FF' },
  pledgeStatsRow: {
    flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.12)',
    padding: 12, borderRadius: 12, alignItems: 'center',
  },
  statBox: { flex: 1, alignItems: 'center' },
  statDivider: { width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.25)' },
  statLabel: { fontSize: 10, color: '#E0E7FF', marginBottom: 2 },
  statVal: { fontSize: 14, fontWeight: '800', color: '#FFFFFF' },
  statValHighlight: { fontSize: 15, fontWeight: '900', color: '#FDE047' },
  pledgeNote: { fontSize: 11, color: '#E0E7FF', lineHeight: 15, marginTop: 12 },

  termsRow: {
    flexDirection: 'row', marginHorizontal: 16, marginTop: 16,
    alignItems: 'flex-start', gap: 10,
  },
  termsText: { flex: 1, fontSize: 11, color: '#475569', lineHeight: 16 },

  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#FFFFFF', paddingHorizontal: 20, paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 28 : 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderTopWidth: 1, borderTopColor: '#F1F4FA',
  },
  bottomLabel: { fontSize: 10, color: '#64748B', fontWeight: '600', textTransform: 'uppercase' },
  bottomEmi: { fontSize: 18, fontWeight: '900', color: '#3C10E8' },
  ctaBtn: { borderRadius: 24, overflow: 'hidden' },
  disabledCtaBtn: { opacity: 0.6 },
  ctaGradient: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 22, paddingVertical: 12, gap: 8,
  },
  ctaText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
});
