import { View, Text, ImageBackground, Platform, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useScale } from '../hooks/useScale'
import Animated, { LinearTransition } from 'react-native-reanimated';


const FreeActivityScreen = () => {

    const { s, vs } = useScale();
    const [selectedIndex, setSelectedIndex] = useState<number | null>(0)
    

    const activities = [
        {   
            name: 'Раскраски', 
            pic: require('../screens/FreeActivity/staticAssets/static1.png'), 
            items: [{}, {}, {}]
        },
        {
            name: '3D Модели', 
            pic: require('../screens/FreeActivity/staticAssets/static2.png'), 
            items: [{}, {}, {}]
        },
        {
            name: 'Режим дня', 
            pic: require('../screens/FreeActivity/staticAssets/static3.png'), 
            items: [{}, {}, {}],
        }
    ]

    return (
        <Animated.ScrollView layout={LinearTransition.duration(1000)} style={{flex: 1, backgroundColor: 'white'}}>
            <ImageBackground style={{ flex: 1, padding: Platform.isPad ? vs(20) : vs(20), justifyContent: 'center'}} source={require('../../assets/aveduBackground.png')}>
                <Text style={{color: 'black', fontSize: vs(22), fontWeight: '700', marginVertical: vs(20)}}>Свободная деятельность</Text>
                <View style={{flexWrap: 'wrap', gap: vs(20), width: '100%'}}>
                    {activities.map((activity, index) => {
                        const isSelected = selectedIndex === index
                        return (
                            <TouchableOpacity onPress={() => setSelectedIndex(index)} activeOpacity={0.8} key={index} style={{width: '100%', height: vs(120), borderRadius: vs(16), gap: s(20), backgroundColor: isSelected ? '#6A5AE0' : '#EFEEFC', flexDirection: 'row', alignItems: 'center', paddingHorizontal: s(20)}}>
                                <Image source={activity?.pic} style={{width: s(65), height: vs(65), backgroundColor: 'white', borderRadius: s(20)}}/>
                                <Text style={{fontSize: vs(20), fontWeight: '700', color: isSelected ? 'white' : '#6A5AE0'}}>{activity?.name}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>

                <View style={{width: '100%', backgroundColor: 'white', height: 'auto', marginTop: vs(20), borderRadius: vs(20), paddingVertical: vs(40), paddingHorizontal: s(20), marginBottom: vs(70), gap: s(40)}}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize: vs(16), fontWeight: '600'}}>{activities[selectedIndex]?.name}</Text>
                    <View style={{flexWrap: 'wrap', gap: vs(20), height: 'auto', width: '100%'}}>
                        {activities[selectedIndex]?.items.map((item, index) => {
                            return (
                                <View key={index} style={{borderWidth: 2, borderColor: '#EFEEFC', borderRadius: 30, width: '100%', height: vs(190), padding: s(10), alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Image style={{width: s(100), height: vs(100)}} source={require('../screens/FreeActivity/staticAssets/guyAvedu.png')}/>
                                    <View style={{width: '100%', height: vs(50), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <Text style={{fontWeight: '600', fontSize: vs(15)}}>Раскраска "Мальчик"</Text>
                                        <TouchableOpacity style={{width: s(75), height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#EFEEFC', borderRadius: 12}}>
                                            <Text style={{color: '#6A5AE0', fontWeight: '700', fontSize: vs(12)}}>Скачать</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </View>
            </ImageBackground>
        </Animated.ScrollView>
    )
}

export default FreeActivityScreen;