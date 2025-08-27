import { View, Text, Platform, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useScale } from '../../hooks/useScale'
import translations from '../../../translations'
import { store } from '../../store/store'


const Activities = ({ activity, setActivity }) => {

    const { s, vs } = useScale()

    const activities = [
        {   
            id: 1, 
            name: translations[store.language].раскраски, 
            pic: require('../../screens/FreeActivity/staticAssets/static1.png'), 
        },
        {
            id: 2,
            name: `3D ${translations[store.language].модели}`, 
            pic: require('../../screens/FreeActivity/staticAssets/static2.png'), 
        },
        {
            id: 3,
            name: translations[store.language].режимдня, 
            pic: require('../../screens/FreeActivity/staticAssets/static3.png'), 
        }
    ]

    return (
        <View style={{flexWrap: 'wrap', rowGap: vs(20), width: '100%', flexDirection: Platform.isPad ? 'row' : 'column', justifyContent: 'space-between'}}>
            {activities?.map((act, index) => {
                const isSelected = activity === act?.id;
                return (
                    <TouchableOpacity onPress={() => setActivity(act.id)} activeOpacity={0.8} key={index} style={{width: Platform.isPad ? '32%' : '100%', borderRadius: vs(16), gap: Platform.isPad? vs(20) : s(20), backgroundColor: isSelected ? '#6A5AE0' : '#EFEEFC', flexDirection: 'row', alignItems: 'center', padding: vs(20)}}>
                        <Image source={act?.pic} style={{width: Platform.isPad? vs(100) : vs(65), height: Platform.isPad? vs(100) : vs(65), backgroundColor: 'white', borderRadius: vs(20), resizeMode: 'contain'}}/>
                        <Text style={{fontSize: Platform.isPad? vs(20) : s(20), fontWeight: '700', color: isSelected ? 'white' : '#6A5AE0'}}>{act?.name}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default Activities;