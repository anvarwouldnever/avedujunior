import { View, Text, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import ObjectMatchingGame from './ObjectMatching/ObjectMatchingGame'
import LinesAndDrawingParent from './ObjectMatching/LinesAndDrawingParent'
import { useScale } from '../../hooks/useScale'
import { useNavigation } from '@react-navigation/native'
import { useSharedValue } from 'react-native-reanimated'

const GameView = () => {

    const { s, vs } = useScale()

    const navigation = useNavigation()

    const lineStartX = useSharedValue(0);
    const lineStartY = useSharedValue(0);
    const lineEndX = useSharedValue(0);
    const lineEndY = useSharedValue(0);
    const [lines, setLines] = useState([]);

    return (
        <View style={{width: '82%', height: '100%', borderWidth: 2, borderColor: '#EFEEFC', backgroundColor: 'white', padding: s(5), borderRadius: 20, gap: vs(25), justifyContent: 'space-between'}}>   
            
            <View style={{flexDirection: 'row', justifyContent: 'space-between', height: '12%'}}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '65%', justifyContent: 'space-between', gap: s(5) }}>
                    <View style={{ backgroundColor: '#B390EF', width: s(15), height: s(15), borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>  
                        <Ionicons name='volume-high' color={'white'} size={s(10)} />
                    </View>
                    <Text adjustsFontSizeToFit style={{ fontSize: Platform.isPad? vs(6) : s(6), fontWeight: '600', width: '90%'}}>Отметьте, кто сидит во втором вагончике справа</Text>
                </View>

                <TouchableOpacity onPress={() => navigation.goBack()} style={{width: '15%', borderWidth: 2, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderColor: '#EFEEFC', borderRadius: 10}}>
                    <Ionicons name='chevron-back' color={'#6A5ADE'} size={s(10)} />
                    <Text style={{ fontWeight: '600', color: '#6A5ADE' }}>Назад</Text>
                </TouchableOpacity>
            </View>
                
            <LinesAndDrawingParent lineEndX={lineEndX} lineEndY={lineEndY} lineStartX={lineStartX} lineStartY={lineStartY} lines={lines} />
            <ObjectMatchingGame lineEndX={lineEndX} lineEndY={lineEndY} lineStartX={lineStartX} lineStartY={lineStartY} setLines={setLines}/>

            <View style={{ height: vs(75), width: '60%', alignSelf: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                <TouchableOpacity style={{ width: '15%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF40572B', borderRadius: 10 }}>
                    <Ionicons name='chevron-back' color={'red'} size={20}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setLines([])} style={{width: '60%', backgroundColor: '#EFF8FF', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#2097EF', fontWeight: '600'}}>Проверить ответ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '15%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0EAF0021', borderRadius: 10 }}>
                    <Ionicons name='chevron-forward' color={'green'} size={20}/>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}

export default GameView;