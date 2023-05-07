import React from "react";
import { View, Text } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialIcons"

const ToastNotification = (prop) => {
    const { data, background } = prop;
    console.log('message-prop', data)
    return (
        <Animated.View
            entering={FadeInUp}
            exiting={FadeOutUp}
            style={{
                height:100,
                marginLeft: 10,
                backgroundColor: background,
                width: '100%',
                position: 'absolute',
                borderRadius: 5,
                zIndex: 1000000,
                padding: 20,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                shadowColor: '#003049',
                shadowOpacity: 0.4,
                shadowRadius: 2,
                shadowOffset: { width: 0, height: 1 },
                elevation: 2,
            }}
        >
            <Icon name="info" size={30} color="#F6F4F4" />
            <View>
                <Text style={{
                    color: '#F6F4F4',
                    fontWeight: 'bold',
                    marginLeft: 10,
                    fontSize: 16,
                }}>Thông báo</Text>
                <Text style={{
                    color: '#F6F4F4',
                    fontWeight: '500',
                    marginLeft: 10,
                    fontSize: 14,
                }}>{data}</Text>
            </View>
        </Animated.View>
    )
}

export default ToastNotification;