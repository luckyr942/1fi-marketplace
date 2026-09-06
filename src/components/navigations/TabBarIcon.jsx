import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function TabBarIcon({
    focused,
    IconComponent,
    activeIcon,
    inactiveIcon,
    color,
    size = 24,
}) {
    const Icon = IconComponent;

    const iconName = focused
        ? activeIcon
        : inactiveIcon;

    if (!Icon) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Icon
                name={iconName}
                size={size}
                color={color}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});