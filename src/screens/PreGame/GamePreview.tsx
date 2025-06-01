import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import VideoScreen from './VideoScreen'
import { useScale } from '../../hooks/useScale'
import { Ionicons } from '@expo/vector-icons'

const GamePreview = () => {

    const { s, vs } = useScale()

    return (
        <View style={{ borderWidth: 2, borderColor: '#EFEEFC', height: 'auto', gap: vs(30), borderRadius: 20, alignItems: 'center', paddingHorizontal: vs(10), paddingVertical: vs(15), backgroundColor: 'white', justifyContent: 'space-between'}}>
            <VideoScreen />

            <View style={{ height: vs(90), width: '100%', justifyContent: 'space-between' }}>
                <Text style={{ color: 'grey', fontWeight: 'bold' }}>Аппликация</Text>
                <Text style={{ color: 'black', fontWeight: '600', fontSize: vs(18) }}>Тема: Благоустроенная махалля</Text>
                <View style={{ height: vs(30), flexDirection: 'row', alignItems: 'center', gap: s(5) }}>
                    <Ionicons name='help-circle' color={'purple'} size={vs(30)} />
                    <Text style={{ color: 'black', fontWeight: '600', fontSize: vs(14) }}>Количество заданий: 5</Text>
                </View>
            </View>

            <TouchableOpacity style={{ width: '100%', height: vs(60), backgroundColor: '#30AB02', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'white', fontSize: vs(20), fontWeight: '800' }}>Начать играть</Text>
            </TouchableOpacity>
        </View>
    )
}

export default GamePreview