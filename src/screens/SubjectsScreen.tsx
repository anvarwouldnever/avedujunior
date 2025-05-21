import { View, Text, ScrollView, Platform, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useScale } from '../hooks/useScale'
import { Ionicons } from '@expo/vector-icons';
import Header from './Subjects/Header';
import DayNames from './Subjects/DayNames';
import Calendar from './Subjects/Calendar';

const SubjectsScreen = () => {
    const { s, vs } = useScale();

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
            <ImageBackground style={{padding: Platform.isPad ? vs(20) : s(20)}} source={require('../../assets/aveduBackground.png')}>
                <View style={{ width: '100%', height: 'auto', backgroundColor: 'white', borderRadius: 20, padding: Platform.isPad ? vs(10) : s(10),}}>
                    <Header />
                    <DayNames />
                    <Calendar />
                </View>
            </ImageBackground>
        </ScrollView>
    );
}

export default SubjectsScreen;
