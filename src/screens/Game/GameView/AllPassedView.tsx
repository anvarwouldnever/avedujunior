import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useScale } from '../../../hooks/useScale'
import { useNavigation } from '@react-navigation/native'
import translations from '../../../../translations'
import { store } from '../../../store/store'

const AllPassedView = ({ tasksId, name }) => {

    const { s, vs } = useScale();

    const navigation = useNavigation();

    return (
        <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center', gap: s(10) }}>

            <Ionicons name="checkmark-circle" size={s(30)} color="green" />

            <Text style={{ fontSize: s(10), fontWeight: '600', color: '#000000' }}>{translations[store.language].заданиевыполнено}</Text>

            <TouchableOpacity onPress={() => tasksId ? navigation.reset({ index: 0, routes: [{ name: 'TasksList', params: { id: tasksId, name: name } }]}) : navigation.goBack()} style={{ backgroundColor: '#6A5AE0', borderRadius: 20, width: '40%', height: s(20), justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: s(7), fontWeight: '600' }}>{translations[store.language].ещебольшеигр}</Text>
            </TouchableOpacity>

        </View>
    )
}

export default AllPassedView;