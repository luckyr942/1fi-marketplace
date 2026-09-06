import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { colors } from '../../theme/theme';

export default function TabBarItem({ config, focused, onPress, onLongPress }) {
    const Icon = config.Icon;
    const iconName = focused ? config.activeIcon : config.inactiveIcon;
    const activeColor = colors.primary || '#6D28D9';
    const inactiveColor = colors.textMuted || '#94A3B8';
    const color = focused ? activeColor : inactiveColor;

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.container}
        >
            <View style={styles.iconWrapper}>
                {/* Active Top Purple Line */}
                {focused && <View style={styles.activeIndicator} />}
                <Icon name={iconName} size={22} color={color} />
            </View>
            <Text style={[styles.label, { color }, focused && styles.focusedLabel]}>
                {config.label}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    iconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    activeIndicator: {
        position: 'absolute',
        top: -12,
        width: 20,
        height: 3,
        backgroundColor: colors.primary || '#6D28D9',
        borderRadius: 2,
    },
    label: {
        fontSize: 11,
        fontWeight: '600',
        marginTop: 3,
    },
    focusedLabel: {
        fontWeight: '700',
    },
});
