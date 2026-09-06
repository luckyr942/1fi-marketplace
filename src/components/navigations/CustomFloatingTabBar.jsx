import React from 'react';
import {
    View,
    StyleSheet,
    Platform,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import TabBarItem from './TabBarItem';
import { TAB_CONFIG } from './../../navigator/tabConfig';

export default function CustomFloatingTabBar({
    state,
    descriptors,
    navigation,
}) {
    const insets = useSafeAreaInsets();

    // Keep the floating bar above the iPhone home indicator.
    const bottom =
        Platform.OS === 'ios'
            ? Math.max(insets.bottom, 12)
            : 12;

    return (
        <View
            pointerEvents="box-none"
            style={[
                styles.wrapper,
                {
                    bottom,
                },
            ]}
        >
            <View style={styles.tabBar}>
                {state.routes.map((route, index) => {
                    const config = TAB_CONFIG.find(
                        (tab) => tab.name === route.name
                    );

                    // Don't render a route that doesn't have config.
                    if (!config) {
                        return null;
                    }

                    const focused = state.index === index;

                    const { options } = descriptors[route.key];

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (
                            !focused &&
                            !event.defaultPrevented
                        ) {
                            navigation.navigate(route.name);
                        } else if (
                            focused &&
                            options?.tabBarButton
                        ) {
                            // Optional behavior for future customization.
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <TabBarItem
                            key={route.key}
                            config={config}
                            focused={focused}
                            onPress={onPress}
                            onLongPress={onLongPress}
                        />
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        left: 0,
        right: 0,

        paddingHorizontal: 18,

        alignItems: 'center',
    },

    tabBar: {
        width: '100%',
        height: 76,

        flexDirection: 'row',
        alignItems: 'center',

        backgroundColor: '#FFFFFF',

        borderRadius: 38,

        borderWidth: 1,
        borderColor: '#F1F5F9',

        // iOS shadow
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.12,
        shadowRadius: 15,

        // Android shadow
        elevation: 8,
    },
});