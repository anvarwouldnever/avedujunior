import { View, Text, Platform, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useScale } from '../../hooks/useScale';

const Header = () => {

    const today = new Date();
    const monthName = today.toLocaleString('ru-RU', { month: 'long' });
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
            <TouchableOpacity style={{width: s(180), height: Platform.isPad? vs(40) : s(40), backgroundColor: '#8ac46a', borderRadius: 40, alignItems: 'center', flexDirection: 'row', gap: s(6), justifyContent: 'center'}}>
                <Ionicons name='star' color={'yellow'} size={vs(24)}/>
                <Text style={{fontSize: vs(15), color: 'white', fontWeight: '600'}}>Пройденные темы</Text>
            </TouchableOpacity>
        </View> 
    )
}

export default Header