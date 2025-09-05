import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import translations from '../../translations'
import { store } from '../store/store'
import { useScale } from '../hooks/useScale'
import { useNavigation } from '@react-navigation/native'

const CompletedTasks = () => {

    const { s, vs, isTablet } = useScale()

    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => navigation.navigate('CompletedTasks')} style={{width: 'auto', height: vs(50), backgroundColor: '#8ac46a', borderRadius: 40, alignItems: 'center', flexDirection: 'row', gap: vs(10), paddingHorizontal: vs(12), justifyContent: 'center'}}>
            
            <Ionicons name='star' color={'yellow'} size={vs(24)}/>
            
            <Text style={{fontSize: isTablet ? vs(18) : vs(16), color: 'white', fontWeight: '600'}}>{translations[store.language].пройденныетемы}</Text>

        </TouchableOpacity>
    )
}

export default CompletedTasks