import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import translations from '../../../translations';
import { useScale } from '../../hooks/useScale';
import { store } from '../../store/store';
import { useNavigation } from '@react-navigation/native';

const Back = () => {

    const { vs, s, isTablet } = useScale();

    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 'auto', height: 'auto', backgroundColor: 'white', borderWidth: 2, justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-start', flexDirection: 'row', borderColor: '#EFEEFC', borderRadius: vs(10), gap: vs(5), padding: vs(10) }}>
                    
            <Ionicons name='chevron-back' color={'#6A5ADE'} size={isTablet ? s(10) : vs(18)} />
            
            <Text style={{ fontWeight: '600', color: '#6A5ADE', fontSize: isTablet ? s(7) : vs(16)}}>{store.labels?.back || translations[store.language].назад}</Text>
        
        </TouchableOpacity>
    )
}

export default Back;