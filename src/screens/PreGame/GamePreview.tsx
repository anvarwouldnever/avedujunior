import { View, Text, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import VideoScreen from './VideoScreen'
import { useScale } from '../../hooks/useScale'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { getPreGame } from './hooks/getPreGame'

const GamePreview = ({ name, topic, id, tasksId }) => {

    const { s, vs } = useScale()
    const navigation = useNavigation()

    const { preGame, error, loading } = getPreGame(id)

    return (
        <View style={{ borderWidth: 2, borderColor: '#EFEEFC', height: 'auto', gap: vs(30), borderRadius: 20, alignItems: 'center', paddingHorizontal: vs(10), paddingVertical: vs(15), backgroundColor: 'white', justifyContent: 'space-between'}}>
            <VideoScreen url={preGame?.video?.url} />

            <View style={{ height: 'auto', width: '100%', gap: Platform.isPad? vs(8) : s(8) }}>
                <Text style={{ color: 'grey', fontWeight: 'bold' }}>{name}</Text>
                <Text style={{ color: 'black', fontWeight: '600', fontSize: vs(18) }}>Тема: {topic}</Text>
                <View style={{ height: vs(30), flexDirection: 'row', alignItems: 'center', gap: s(5) }}>
                    <Ionicons name='help-circle' color={'purple'} size={vs(30)} />
                    <Text style={{ color: 'black', fontWeight: '600', fontSize: vs(14) }}>Количество заданий: {preGame?.tests_count}</Text>
                </View>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Game', {name, topic, id, tasksId})} style={{ width: '100%', height: vs(60), backgroundColor: '#30AB02', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'white', fontSize: vs(20), fontWeight: '800' }}>Начать играть</Text>
            </TouchableOpacity>
        </View>
    )
}

export default GamePreview;