import { View, Text, Image, Platform, useWindowDimensions } from 'react-native'
import React from 'react'
import { useScale } from '../../hooks/useScale';
import { store } from '../../store/store';
import { observer } from 'mobx-react-lite';

const MenuGirlContainer = () => {

    const { s, vs } = useScale();
    const { width } = useWindowDimensions();

    const imageWidth = Platform.isPad ? vs(150) : s(150);
    const padding = vs(40);

    const availableWidth = width - padding - imageWidth;
    const isInline = availableWidth >= imageWidth * 1.5;

    return (
        <View style={{width: '100%', height: 'auto', borderRadius: vs(30), backgroundColor: '#cc3184', padding: vs(20)}}>
            <View style={{flexDirection: isInline ? 'row' : 'column', alignItems: isInline ? 'center' : 'flex-start', gap: Platform.isPad? vs(15) : s(15)}}>
                <Image style={{backgroundColor: 'white', borderRadius: vs(30), width: imageWidth, height: Platform.isPad? vs(150) : s(150), resizeMode: 'contain'}} source={store.pfp?.second_image?.url? { uri: store.pfp.second_image.url } : require('../../../assets/aveduMenuGirl.png')} />
                <View style={{flexShrink: 1, gap: Platform.isPad? vs(10) : s(10)}}>
                    <Text style={{fontSize: Platform.isPad? vs(18) : s(18), color: 'white', fontWeight: '600', lineHeight: Platform.isPad? vs(22) : s(22), marginBottom: vs(5)}}>Добро пожаловать, Группа: Демо (3)!</Text>
                    <Text style={{fontSize: Platform.isPad? vs(16) : s(16), color: 'white', fontWeight: '400', lineHeight: Platform.isPad? vs(22) : s(22)}}>Не забудьте проверить своё расписание занятий на завтра! Все ли задания вы сделали?</Text>
                </View>
            </View>
        </View>
    )
}

export default observer(MenuGirlContainer);