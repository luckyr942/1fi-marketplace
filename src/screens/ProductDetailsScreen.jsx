import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params || {};

  // ── Pull per-product variant data from the data layer ──────────────
  const colorOptions = product?.variants?.colors || [
    { id: 'default', name: 'Standard', hex: '#3B82F6' },
  ];
  const specOptions = product?.variants?.specs || [
    { id: 'base', name: 'Base', priceAdd: 0 },
  ];
  const specLabel = product?.variants?.specLabel || 'Option';

  // ── Component state ────────────────────────────────────────────────
  const basePrice = product?.price || 99900;
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [selectedSpec, setSelectedSpec] = useState(specOptions[0]);
  const [isSaved, setIsSaved] = useState(false);

  // Recalculate price whenever spec changes
  const totalPrice = basePrice + selectedSpec.priceAdd;
  const monthlyEmi = Math.round(totalPrice / 12);

  // ── Navigate to EMI selection ──────────────────────────────────────
  const handleProceedEMI = () => {
    navigation.navigate('EMISelect', {
      product: {
        ...product,
        selectedColor,
        selectedSpec,
        totalPrice,
        monthlyEmi,
      },
    });
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* ─── TOP NAV BAR ─── */}
      <SafeAreaView style={styles.safeHeader}>
        <View style={styles.navBar}>
          <TouchableOpacity
            style={styles.circleBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={22} color="#0F172A" />
          </TouchableOpacity>

          <Text style={styles.navTitle} numberOfLines={1}>
            {product?.brand || 'Product Details'}
          </Text>

          <TouchableOpacity
            style={styles.circleBtn}
            onPress={() => setIsSaved(!isSaved)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isSaved ? 'heart' : 'heart-outline'}
              size={20}
              color={isSaved ? '#EF4444' : '#0F172A'}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ─── HERO IMAGE ─── */}
        <View style={styles.imageCard}>
          <View style={styles.badgeRow}>
            <View style={styles.tagBadge}>
              <Text style={styles.tagBadgeText}>{product?.tag || 'Bestseller'}</Text>
            </View>
            <View style={styles.mfBadge}>
              <Text style={styles.mfBadgeText}>✦ 1Fi Mutual Fund EMI</Text>
            </View>
          </View>
          <Image
            source={{ uri: product?.image }}
            style={styles.productImg}
            resizeMode="contain"
          />
        </View>

        {/* ─── TITLE & PRICE ─── */}
        <View style={styles.section}>
          <Text style={styles.brandText}>{product?.brand}</Text>
          <Text style={styles.titleText}>{product?.name}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.priceText}>
              ₹{totalPrice.toLocaleString('en-IN')}
            </Text>
            <View style={styles.emiHighlightPill}>
              <Text style={styles.emiHighlightText}>
                ₹{monthlyEmi.toLocaleString('en-IN')}/mo (0% EMI)
              </Text>
            </View>
          </View>

          {product?.description ? (
            <Text style={styles.descText}>{product.description}</Text>
          ) : null}
        </View>

        {/* ─── VARIANT 1: COLOR / TYPE SELECTOR ─── */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeaderTitle}>
            Select Colour:{' '}
            <Text style={styles.activeVariantText}>{selectedColor.name}</Text>
          </Text>
          <View style={styles.colorRow}>
            {colorOptions.map((col) => {
              const isActive = selectedColor.id === col.id;
              return (
                <TouchableOpacity
                  key={col.id}
                  onPress={() => setSelectedColor(col)}
                  style={[styles.colorChip, isActive && styles.activeColorChip]}
                  activeOpacity={0.8}
                >
                  <View style={[styles.colorDot, { backgroundColor: col.hex }]} />
                  <Text style={[styles.colorName, isActive && styles.activeColorName]}>
                    {col.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ─── VARIANT 2: SPEC SELECTOR (contextual label) ─── */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeaderTitle}>
            Select {specLabel}:{' '}
            <Text style={styles.activeVariantText}>{selectedSpec.name}</Text>
          </Text>
          <View style={styles.specGrid}>
            {specOptions.map((sp) => {
              const isActive = selectedSpec.id === sp.id;
              return (
                <TouchableOpacity
                  key={sp.id}
                  onPress={() => setSelectedSpec(sp)}
                  style={[styles.specCard, isActive && styles.activeSpecCard]}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.specName, isActive && styles.activeSpecName]}>
                    {sp.name}
                  </Text>
                  <Text style={[styles.specAdd, isActive && styles.activeSpecAdd]}>
                    {sp.priceAdd === 0
                      ? 'Standard'
                      : '+₹' + sp.priceAdd.toLocaleString('en-IN')}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ─── MUTUAL FUND BENEFIT BANNER ─── */}
        <LinearGradient
          colors={['#F3EEFB', '#EEF2FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.mfInfoBox}
        >
          <View style={styles.mfInfoRow}>
            <MaterialCommunityIcons name="shield-check" size={24} color="#3C10E8" />
            <View style={styles.mfInfoCopy}>
              <Text style={styles.mfInfoTitle}>Backed by Mutual Funds</Text>
              <Text style={styles.mfInfoDesc}>
                Pledge your mutual fund portfolio to get 0% Interest No-Cost EMI.
                No credit card or CIBIL score required.
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* ─── KEY HIGHLIGHTS ─── */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeaderTitle}>Product Highlights</Text>
          {[
            { icon: 'zap', title: 'Instant Approval', desc: 'Pre-approved limit against mutual funds' },
            { icon: 'truck', title: 'Free Express Delivery', desc: 'Delivered to your doorstep within 48 hours' },
            { icon: 'refresh-cw', title: '0% Interest No-Cost EMI', desc: 'Zero extra hidden charges or processing fee' },
            { icon: 'trending-up', title: 'Investments Keep Growing', desc: 'Your mutual fund units remain invested & gain returns' },
          ].map((item, idx) => (
            <View key={idx} style={styles.highlightRow}>
              <View style={styles.highlightIconWrap}>
                <Feather name={item.icon} size={16} color="#3C10E8" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.highlightTitle}>{item.title}</Text>
                <Text style={styles.highlightDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* ─── BOTTOM STICKY CTA ─── */}
      <View style={styles.bottomBar}>
        <View style={styles.priceSummary}>
          <Text style={styles.bottomLabel}>Starting from</Text>
          <Text style={styles.bottomEmi}>
            ₹{monthlyEmi.toLocaleString('en-IN')}
            <Text style={styles.bottomEmiSub}>/month</Text>
          </Text>
        </View>

        <TouchableOpacity
          style={styles.ctaBtn}
          onPress={handleProceedEMI}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={['#3C10E8', '#6D28D9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaGradient}
          >
            <Text style={styles.ctaText}>Choose EMI Plan</Text>
            <Feather name="arrow-right" size={18} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8F9FD' },

  safeHeader: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F4FA',
  },
  navBar: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  circleBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center', justifyContent: 'center',
  },
  navTitle: { fontSize: 15, fontWeight: '800', color: '#0F172A' },

  scrollContent: { paddingBottom: 110 },

  // Hero image area
  imageCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  badgeRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tagBadge: {
    backgroundColor: '#3C10E8',
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: 6,
  },
  tagBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800' },
  mfBadge: {
    backgroundColor: '#F3EEFB',
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: 6,
  },
  mfBadgeText: { color: '#3C10E8', fontSize: 10, fontWeight: '800' },
  productImg: { width: '100%', height: 220 },

  // Title + price section
  section: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20, paddingVertical: 16,
    marginBottom: 12,
  },
  brandText: {
    fontSize: 12, fontWeight: '700', color: '#3C10E8',
    textTransform: 'uppercase', letterSpacing: 0.5,
  },
  titleText: {
    fontSize: 20, fontWeight: '800', color: '#0F172A',
    marginVertical: 4,
  },
  descText: {
    fontSize: 12, color: '#64748B', lineHeight: 17, marginTop: 6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  priceText: { fontSize: 22, fontWeight: '900', color: '#0F172A' },
  emiHighlightPill: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: 8,
  },
  emiHighlightText: { fontSize: 12, fontWeight: '800', color: '#3C10E8' },

  // Variant section cards
  sectionCard: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20, paddingVertical: 16,
    marginBottom: 12,
  },
  sectionHeaderTitle: {
    fontSize: 14, fontWeight: '800', color: '#0F172A', marginBottom: 12,
  },
  activeVariantText: { color: '#3C10E8', fontWeight: '700' },

  // Colour chips
  colorRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  colorChip: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5, borderColor: '#E2E8F0',
    paddingHorizontal: 12, paddingVertical: 8,
    borderRadius: 20, gap: 8,
  },
  activeColorChip: { borderColor: '#3C10E8', backgroundColor: '#F3EEFB' },
  colorDot: { width: 14, height: 14, borderRadius: 7 },
  colorName: { fontSize: 12, fontWeight: '600', color: '#475569' },
  activeColorName: { color: '#3C10E8', fontWeight: '800' },

  // Spec cards (Storage / Motor / Duration etc.)
  specGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  specCard: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5, borderColor: '#E2E8F0',
    padding: 12, borderRadius: 14,
  },
  activeSpecCard: { borderColor: '#3C10E8', backgroundColor: '#F3EEFB' },
  specName: { fontSize: 14, fontWeight: '800', color: '#0F172A' },
  activeSpecName: { color: '#3C10E8' },
  specAdd: { fontSize: 11, color: '#64748B', marginTop: 2, fontWeight: '600' },
  activeSpecAdd: { color: '#6D28D9' },

  // MF info banner
  mfInfoBox: {
    marginHorizontal: 16, padding: 16,
    borderRadius: 16, marginBottom: 12,
  },
  mfInfoRow: { flexDirection: 'row', gap: 12 },
  mfInfoCopy: { flex: 1 },
  mfInfoTitle: { fontSize: 14, fontWeight: '800', color: '#3C10E8', marginBottom: 2 },
  mfInfoDesc: { fontSize: 12, color: '#475569', lineHeight: 16 },

  // Highlights
  highlightRow: {
    flexDirection: 'row', alignItems: 'center',
    gap: 12, marginVertical: 8,
  },
  highlightIconWrap: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: '#F3EEFB',
    alignItems: 'center', justifyContent: 'center',
  },
  highlightTitle: { fontSize: 13, fontWeight: '700', color: '#0F172A' },
  highlightDesc: { fontSize: 11, color: '#64748B', marginTop: 1 },

  // Bottom CTA bar
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20, paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 28 : 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderTopWidth: 1, borderTopColor: '#F1F4FA',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.08, shadowRadius: 6,
      },
      android: { elevation: 8 },
    }),
  },
  priceSummary: { flex: 1 },
  bottomLabel: {
    fontSize: 10, color: '#64748B',
    fontWeight: '600', textTransform: 'uppercase',
  },
  bottomEmi: { fontSize: 18, fontWeight: '900', color: '#3C10E8' },
  bottomEmiSub: { fontSize: 11, fontWeight: '600', color: '#64748B' },
  ctaBtn: { borderRadius: 24, overflow: 'hidden' },
  ctaGradient: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 22, paddingVertical: 12, gap: 8,
  },
  ctaText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
});
