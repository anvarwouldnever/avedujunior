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
        <View style={{ width: '100%', height: vs(250), justifyContent: 'center', alignItems: 'center',  gap: vs(5) }}>
            <Text style={{ fontSize: vs(20) }}>
                <Text style={{ fontWeight: 'bold' }}>
                    {capitalizedMonth}
                </Text>{' '}
                {today.getFullYear()}
            </Text>
            <Image style={{width: Platform.isPad? vs(150) : s(140), height: vs(140), resizeMode: 'contain'}} source={require('../../../assets/subjectsCar.png')}/>
            <TouchableOpacity style={{width: s(180), height: vs(40), backgroundColor: '#8ac46a', borderRadius: 40, alignItems: 'center', flexDirection: 'row', gap: s(6), justifyContent: 'center'}}>
                <Ionicons name='star' color={'yellow'} size={24}/>
                <Text style={{fontSize: vs(15), color: 'white', fontWeight: '600'}}>Пройденные темы</Text>
            </TouchableOpacity>
        </View> 
    )
}

export default Header