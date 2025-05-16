import { View, Text, Image, Platform, useWindowDimensions } from 'react-native'
import React from 'react'
import { useScale } from '../../hooks/useScale';

const MenuGirlContainer = () => {

    const { s, vs } = useScale();
    const { width } = useWindowDimensions();

    const imageWidth = Platform.isPad ? vs(150) : s(150);
    const padding = vs(40);

    const availableWidth = width - padding - imageWidth;
    const isInline = availableWidth >= imageWidth * 1.5;

    return (
        <View style={{width: '100%', height: 'auto', borderRadius: vs(30), backgroundColor: '#cc3184', padding: vs(20)}}>
            <View style={{flexDirection: isInline ? 'row' : 'column', alignItems: isInline ? 'center' : 'flex-start', gap: vs(15)}}>
                <Image style={{backgroundColor: 'white', borderRadius: vs(30), width: imageWidth, height: vs(150), resizeMode: 'contain'}} source={require('../../../assets/aveduMenuGirl.png')} />
                <View style={{flexShrink: 1, gap: vs(10)}}>
                    <Text style={{fontSize: vs(18), color: 'white', fontWeight: '600', lineHeight: vs(22), marginBottom: vs(5)}}>Добро пожаловать, Группа: Демо (3)!</Text>
                    <Text style={{fontSize: vs(16), color: 'white', fontWeight: '400', lineHeight: vs(22)}}>Не забудьте проверить своё расписание занятий на завтра! Все ли задания вы сделали?</Text>
                </View>
            </View>
        </View>
    )
}

export default MenuGirlContainer;