import { View, Text, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import VideoScreen from './VideoScreen'
import { useScale } from '../../hooks/useScale'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import translations from '../../../translations'
import { store } from '../../store/store'

const GamePreview = ({ name, topic, id, tasksId, preGame }) => {

    const { s, vs } = useScale()
    const navigation = useNavigation()

    const themeLabel = store.labels?.тема || translations[store.language]?.тема
    const numberOfTasksLabel = store.labels?.numberOfTasks || translations[store.language]?.numberOfTasks
    const startPlayingLabel = store.labels?.startPlaying || translations[store.language]?.startPlaying

    return (
        <View style={{ borderWidth: 2, borderColor: '#EFEEFC', height: 'auto', gap: vs(30), borderRadius: 20, alignItems: 'center', padding: vs(15), backgroundColor: 'white', justifyContent: 'space-between'}}>
            
            <VideoScreen url={preGame?.video?.url} />

            <View style={{ height: 'auto', width: '100%', gap: Platform.isPad? vs(8) : s(8) }}>
                <Text style={{ color: 'grey', fontWeight: 'bold' }}>{name}</Text>
                <Text style={{ color: 'black', fontWeight: '600', fontSize: vs(18) }}>{themeLabel}: {topic}</Text>
                <View style={{ height: vs(30), flexDirection: 'row', alignItems: 'center', gap: s(5) }}>
                    <Ionicons name='help-circle' color={'purple'} size={vs(30)} />
                    <Text style={{ color: 'black', fontWeight: '600', fontSize: vs(14) }}>
                        {numberOfTasksLabel}: {preGame?.tests_count}
                    </Text>
                </View>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Game', {name, topic, id, tasksId})} style={{ width: '100%', height: vs(60), backgroundColor: '#30AB02', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'white', fontSize: vs(20), fontWeight: '800' }}>{startPlayingLabel}</Text>
            </TouchableOpacity>

        </View>
    )
}

export default GamePreview
