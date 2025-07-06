import { View, Text, Platform, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useScale } from '../../hooks/useScale'


const Activities = ({ activity, setActivity }) => {

    const { s, vs } = useScale()

    const activities = [
        {   
            id: 1, 
            name: 'Раскраски', 
            pic: require('../../screens/FreeActivity/staticAssets/static1.png'), 
        },
        {
            id: 2,
            name: '3D Модели', 
            pic: require('../../screens/FreeActivity/staticAssets/static2.png'), 
        },
        {
            id: 3,
            name: 'Режим дня', 
            pic: require('../../screens/FreeActivity/staticAssets/static3.png'), 
        }
    ]

    return (
        <View style={{flexWrap: 'wrap', gap: vs(20), width: '100%'}}>
            {activities?.map((act, index) => {
                const isSelected = activity === act.id;
                return (
                    <TouchableOpacity onPress={() => setActivity(act.id)} activeOpacity={0.8} key={index} style={{width: '100%', height: Platform.isPad? vs(100) : s(100), borderRadius: vs(16), gap: Platform.isPad? vs(20) : s(20), backgroundColor: isSelected ? '#6A5AE0' : '#EFEEFC', flexDirection: 'row', alignItems: 'center', paddingHorizontal: Platform.isPad? vs(20) : s(20)}}>
                        <Image source={act?.pic} style={{width: s(65), height: Platform.isPad? vs(65) : s(65), backgroundColor: 'white', borderRadius: vs(20), resizeMode: 'contain'}}/>
                        <Text style={{fontSize: Platform.isPad? vs(20) : s(20), fontWeight: '700', color: isSelected ? 'white' : '#6A5AE0'}}>{act?.name}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default Activities;