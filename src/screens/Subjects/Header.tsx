import { View, Text, Image } from 'react-native'
import React from 'react'
import { useScale } from '../../hooks/useScale';
import { store } from '../../store/store';
import CompletedTasks from '../../components/CompletedTasks';

const Header = () => {

    const { s, vs, isTablet } = useScale()

    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();

    if (store.access === 2 || store.access === 4) {
        if (month < 8) { // если ещё не сентябрь
            year -= 1;
        }
        month = 8; // сентябрь
    }

    const language = store?.language || 'ru'; // 'ru' или 'uz'

    const monthName = new Date(year, month).toLocaleString(
        `${language}-${language.toUpperCase()}`, 
        { month: 'long' }
    );
    const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    return (
        <View style={{ width: '100%', height: isTablet? vs(250) : s(250), justifyContent: 'center', alignItems: 'center',  gap: vs(5) }}>
            
            <Text style={{ fontSize: isTablet? vs(20) : s(20) }}>
                <Text style={{ fontWeight: 'bold' }}>
                    {capitalizedMonth}
                </Text>{' '}
                {year}
            </Text>
            
            <Image style={{width: isTablet? vs(150) : s(140), height: isTablet? vs(140) : s(140), resizeMode: 'contain'}} source={require('../../../assets/subjectsCar.png')}/>
            
            <CompletedTasks />

        </View> 
    )
}

export default Header