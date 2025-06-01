import { View, Text, ImageBackground, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useScale } from '../hooks/useScale'
import Animated, { LinearTransition } from 'react-native-reanimated';
import Activities from './FreeActivity/Activities';
import ActivityItems from './FreeActivity/ActivityItems';
import { observer } from 'mobx-react-lite';
import { bgAssets } from '../components/BgAssets';
import { store } from '../store/store';

const FreeActivityScreen = () => {

    const { vs } = useScale();
    const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
    
    const activities = [
        {   
            name: 'Раскраски', 
            pic: require('../screens/FreeActivity/staticAssets/static1.png'), 
            items: [{}, {}, {}, {}, {}]
        },
        {
            name: '3D Модели', 
            pic: require('../screens/FreeActivity/staticAssets/static2.png'), 
            items: [{}, {}, {}, {}, {}]
        },
        {
            name: 'Режим дня', 
            pic: require('../screens/FreeActivity/staticAssets/static3.png'), 
            items: [{}, {}, {}, {}, {}],
        }
    ]

    return (
        <ImageBackground style={{ flex: 1, justifyContent: 'center'}} source={bgAssets[store.backgroundImage] ?? bgAssets[1]}>
            <ScrollView style={{flex: 1, padding: vs(20)}}>
                <Text style={{color: 'black', fontSize: vs(22), fontWeight: '700', marginVertical: vs(20)}}>Свободная деятельность</Text>
                <Activities selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} activities={activities}/>

                <ActivityItems selectedIndex={selectedIndex} activities={activities}/>
            </ScrollView>
        </ImageBackground>
    )
}

export default observer(FreeActivityScreen);