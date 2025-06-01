import { View, Text, Platform, TouchableOpacity, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import { useScale } from '../../hooks/useScale'

const ActivityItems = ({ activities, selectedIndex }) => {

    const { s, vs } = useScale()

    const { width } = useWindowDimensions()
    const amount = Math.floor(width / 371.65)
    const moreThanOne = width >= 744
    const itemWidth = moreThanOne? (width - vs(92)) / amount : width - vs(80)

    return (
        <View style={{width: '100%', backgroundColor: 'white', height: 'auto', marginTop: vs(20), borderRadius: vs(20), paddingVertical: vs(40), paddingHorizontal: Platform.isPad? vs(20) : s(20), marginBottom: vs(70), gap: Platform.isPad? vs(40) : s(40)}}>
            <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize: Platform.isPad? vs(16) : s(16), fontWeight: '600'}}>{activities[selectedIndex]?.name}</Text>
            <View style={{flexWrap: 'wrap', height: 'auto', width: '100%', flexDirection: 'row', gap: vs(12)}}>
                {activities[selectedIndex]?.items.map((item, index) => {
                    return (
                        <View key={index} style={{borderWidth: 2, borderColor: '#EFEEFC', borderRadius: 30, width: itemWidth, height: Platform.isPad? vs(190) : s(190), padding: s(10), alignItems: 'center', justifyContent: 'space-between'}}>
                            <Image style={{width: '70%', height: '70%', resizeMode: 'contain'}} source={require('../../screens/FreeActivity/staticAssets/guyAvedu.png')}/>
                            <View style={{width: '100%', height: Platform.isPad? vs(50) : s(50), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text numberOfLines={5} ellipsizeMode='tail' style={{fontWeight: '600', fontSize: Platform.isPad? vs(12) : s(12), maxWidth: '60%'}}>Раскраска "Мальчик"</Text>
                                <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#EFEEFC', borderRadius: 12}}>
                                    <Text style={{color: '#6A5AE0', fontWeight: '700', margin: Platform.isPad? vs(10) : s(15), fontSize: Platform.isPad? vs(12) : s(12)}}>Скачать</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

export default ActivityItems