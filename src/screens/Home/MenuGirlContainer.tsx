import { View, Text, Platform, useWindowDimensions } from 'react-native'
import React from 'react'
import { useScale } from '../../hooks/useScale';
import { store } from '../../store/store';
import { observer } from 'mobx-react-lite';
import { Image } from 'expo-image';

const MenuGirlContainer = () => {

    const { s, vs, isTablet } = useScale();
    const { width } = useWindowDimensions();

    const imageWidth = isTablet  ? vs(150) : s(150);
    const padding = vs(40);

    const availableWidth = width - padding - imageWidth;
    const isInline = availableWidth >= imageWidth * 1.5;

    return (
        <View style={{width: '100%', height: 'auto', borderRadius: vs(30), backgroundColor: '#cc3184', padding: vs(20)}}>
            <View style={{flexDirection: isInline ? 'row' : 'column', alignItems: isInline ? 'center' : 'flex-start', gap: s(15)}}>
                <Image transition={300} style={{ borderRadius: vs(30), width: imageWidth, height: isTablet ? vs(150) : s(150), resizeMode: 'contain', margin: -vs(10)}} source={store.pfp?.second_image?.url? { uri: store?.pfp?.second_image.url } : undefined} contentFit='contain' />
                <View style={{flexShrink: 1, gap: isTablet ? vs(10) : s(10)}}>
                    <Text style={{fontSize: isTablet ? vs(20) : s(18), color: 'white', fontWeight: '600', lineHeight: isTablet ? vs(22) : s(22), marginBottom: vs(5)}}>Добро пожаловать, {store.juridical ? store?.group : store?.name}!</Text>
                    <Text style={{fontSize: isTablet ? vs(18) : s(16), color: 'white', fontWeight: '400', lineHeight: isTablet ? vs(22) : s(22)}}>Не забудьте проверить своё расписание занятий на завтра! Все ли задания вы сделали?</Text>
                </View>
            </View>
        </View>
    )
}

export default observer(MenuGirlContainer);