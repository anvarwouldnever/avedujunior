import { View, Text, Platform, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useScale } from '../../hooks/useScale';
import translations from '../../../translations';
import { store } from '../../store/store';
import CompletedTasks from '../../components/CompletedTasks';

const Header = () => {

    const today = new Date();
    const language = store?.language || 'ru'; // 'ru' или 'uz'

    const monthName = today.toLocaleString(`${language}-${language.toUpperCase()}`, { month: 'long' });
    const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    const { s, vs } = useScale()

    return (
        <View style={{ width: '100%', height: Platform.isPad? vs(250) : s(250), justifyContent: 'center', alignItems: 'center',  gap: vs(5) }}>
            
            <Text style={{ fontSize: Platform.isPad? vs(20) : s(20) }}>
                <Text style={{ fontWeight: 'bold' }}>
                    {capitalizedMonth}
                </Text>{' '}
                {today.getFullYear()}
            </Text>
            
            <Image style={{width: Platform.isPad? vs(150) : s(140), height: Platform.isPad? vs(140) : s(140), resizeMode: 'contain'}} source={require('../../../assets/subjectsCar.png')}/>
            
            <CompletedTasks />

        </View> 
    )
}

export default Header