import { View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import React from 'react';
import { useScale } from '../../hooks/useScale';
import * as Linking from 'expo-linking';
import translations from '../../../translations';
import { store } from '../../store/store';

const ActivityItems = ({ activities, activity }) => {

    const { s, vs, isTablet } = useScale()

    const { width } = useWindowDimensions()
    const gap = vs(12);
    const padding = isTablet ? vs(40) : s(40);
    const containerWidth = width - padding * 2;

    const amount = isTablet ? 3 : Math.floor((containerWidth + gap) / (371.65 + gap));
    const totalGap = gap * (amount - 1);
    const itemWidth = (containerWidth - totalGap) / amount;

    const openPdf = (url) => {
        if (url) {
            Linking.openURL(url);
        } else {
            console.warn('URL пустой или недоступен');
        }
    };

    const getActivityName = (id: number | null) => {
        switch (id) {
            case 1: return translations[store.language].раскраски;
            case 2: return `3D ${translations[store.language].модели}`;
            case 3: return translations[store.language].режимдня;
            default: return 'Не выбрано';
        }
    };

    return (
        <View style={{width: '100%', backgroundColor: 'white', height: 'auto', marginTop: vs(20), borderRadius: vs(20), paddingVertical: vs(40), paddingHorizontal: isTablet? vs(20) : s(20), marginBottom: vs(70), gap: isTablet? vs(40) : s(40)}}>
            <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize: isTablet? vs(20) : vs(18), fontWeight: '600'}}>{getActivityName(activity)}</Text>
            <View style={{flexWrap: 'wrap', height: 'auto', width: '100%', flexDirection: 'row', gap: vs(12)}}>
                {activities?.map((item, index) => {
                    return (
                        <View key={index} style={{borderWidth: 2, borderColor: '#EFEEFC', borderRadius: 30, width: itemWidth, height: isTablet? vs(220) : vs(190), padding: vs(15), alignItems: 'center', justifyContent: 'space-between'}}>
                            
                            <Image style={{width: '70%', height: '70%', resizeMode: 'contain'}} source={{ uri: item?.image?.url }}/>
                            
                            <View style={{width: '100%', height: isTablet? vs(50) : s(50), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                
                                <Text numberOfLines={5} ellipsizeMode='tail' style={{fontWeight: '600', fontSize: isTablet? vs(14) : vs(12), maxWidth: '60%'}}>{item?.name}</Text>
                                
                                <TouchableOpacity onPress={() => openPdf(item?.file)} style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#EFEEFC', borderRadius: 12}}>
                                    <Text style={{color: '#6A5AE0', fontWeight: '700', margin: vs(12), fontSize: isTablet? vs(14) : vs(12)}}>{translations[store.language].скачать}</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    )
                })}
            </View>
        </View>
    )
}

export default ActivityItems;