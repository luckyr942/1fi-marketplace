import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function OrderSuccessScreen({ route, navigation }) {
  const {
    orderId = '1FI-892419',
    product,
    totalPrice = 99900,
    monthlyCost = 8325,
    selectedTenure = 12,
  } = route.params || {};

  const handleGoDues = () => {
    navigation.popToTop();
    navigation.navigate('EMI Dues');
  };

  const handleGoMarketplace = () => {
    navigation.popToTop();
    navigation.navigate('Shop');
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#2700B8" translucent />

      <LinearGradient
        colors={['#2700B8', '#3C10E8', '#4E1DF0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroHeader}
      >
        <SafeAreaView edges={['top']}>
          <View style={styles.headerContent}>
            <View style={styles.successIconCircle}>
              <Ionicons name="checkmark-circle" size={64} color="#22C55E" />
            </View>
            <Text style={styles.heroTitle}>Pledge Approved!</Text>
            <Text style={styles.heroSub}>
              Your Order #{orderId} has been placed.{'\n'}
              Mutual Fund lien established successfully.
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ─── SUMMARY CARD ─── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Order & Lien Details</Text>

          <View style={styles.productRow}>
            <Image
              source={{ uri: product?.image }}
              style={styles.thumbImg}
              resizeMode="contain"
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.brandText}>{product?.brand || 'Brand'}</Text>
              <Text style={styles.productName} numberOfLines={1}>
                {product?.name || 'Product'}
              </Text>
              <Text style={styles.variantText}>
                {product?.selectedColor?.name} • {product?.selectedSpec?.name}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Order Number</Text>
            <Text style={styles.valBold}>#{orderId}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total Product Amount</Text>
            <Text style={styles.val}>₹{totalPrice.toLocaleString('en-IN')}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Monthly EMI</Text>
            <Text style={styles.valHighlight}>
              ₹{monthlyCost.toLocaleString('en-IN')}/mo ({selectedTenure} Mos)
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>First E-NACH Debit</Text>
            <Text style={styles.val}>5th of Next Month</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Estimated Delivery</Text>
            <Text style={styles.valGreen}>Within 48 Hours</Text>
          </View>
        </View>

        {/* ─── INFO NOTICE ─── */}
        <View style={styles.noticeBox}>
          <MaterialCommunityIcons name="information-outline" size={20} color="#3C10E8" />
          <Text style={styles.noticeText}>
            Your mutual fund units are safely locked under lien. They continue to
            generate returns for you in your portfolio!
          </Text>
        </View>

        {/* ─── ACTION BUTTONS ─── */}
        <View style={styles.btnCol}>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={handleGoDues}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={['#3C10E8', '#6D28D9']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.btnGradient}
            >
              <Text style={styles.primaryBtnText}>Track Order in EMI Dues</Text>
              <Feather name="arrow-right" size={18} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={handleGoMarketplace}
            activeOpacity={0.7}
          >
            <Text style={styles.secondaryBtnText}>Back to 1Fi Marketplace</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8F9FD' },
  heroHeader: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 36, alignItems: 'center' },
  headerContent: { alignItems: 'center' },
  successIconCircle: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  heroTitle: { fontSize: 22, fontWeight: '900', color: '#FFFFFF' },
  heroSub: {
    fontSize: 12, color: '#E0E7FF', textAlign: 'center',
    marginTop: 6, lineHeight: 18, paddingHorizontal: 20,
  },
  scrollContent: { paddingBottom: 40 },
  card: {
    backgroundColor: '#FFFFFF', marginHorizontal: 16, marginTop: -20,
    padding: 20, borderRadius: 20, borderWidth: 1, borderColor: '#E8ECF4',
  },
  cardTitle: { fontSize: 15, fontWeight: '800', color: '#0F172A', marginBottom: 12 },
  productRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  thumbImg: { width: 54, height: 54 },
  brandText: { fontSize: 10, fontWeight: '800', color: '#3C10E8', textTransform: 'uppercase' },
  productName: { fontSize: 14, fontWeight: '800', color: '#0F172A' },
  variantText: { fontSize: 11, color: '#64748B', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#F1F4FA', marginVertical: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 6 },
  label: { fontSize: 12, color: '#64748B' },
  val: { fontSize: 12, color: '#0F172A', fontWeight: '600' },
  valBold: { fontSize: 12, fontWeight: '800', color: '#0F172A' },
  valHighlight: { fontSize: 12, fontWeight: '800', color: '#3C10E8' },
  valGreen: { fontSize: 12, fontWeight: '800', color: '#16A34A' },
  noticeBox: {
    flexDirection: 'row', backgroundColor: '#F3EEFB', marginHorizontal: 16,
    marginTop: 16, padding: 14, borderRadius: 14, gap: 10, alignItems: 'center',
  },
  noticeText: { flex: 1, fontSize: 11, color: '#475569', lineHeight: 16 },
  btnCol: { marginHorizontal: 16, marginTop: 24, gap: 12 },
  primaryBtn: { borderRadius: 24, overflow: 'hidden' },
  btnGradient: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 14, gap: 8,
  },
  primaryBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  secondaryBtn: { alignItems: 'center', paddingVertical: 12 },
  secondaryBtnText: { fontSize: 13, fontWeight: '700', color: '#64748B' },
});
