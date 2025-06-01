import { View, Text, ScrollView, Platform, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useScale } from '../hooks/useScale'
import { Ionicons } from '@expo/vector-icons';
import Header from './Subjects/Header';
import DayNames from './Subjects/DayNames';
import Calendar from './Subjects/Calendar';
import { bgAssets } from '../components/BgAssets';
import { store } from '../store/store';
import { observer } from 'mobx-react-lite';

const SubjectsScreen = () => {
    const { s, vs } = useScale();

    return (
        <ImageBackground style={{flex: 1}} source={bgAssets[store.backgroundImage] ?? bgAssets[1]}>
            <ScrollView style={{ flex: 1, padding: Platform.isPad ? vs(20) : s(20) }}>
                <View style={{ width: '100%', height: 'auto', backgroundColor: 'white', borderRadius: 20, padding: Platform.isPad ? vs(10) : s(10),}}>
                    <Header />
                    <DayNames />
                    <Calendar />
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

export default observer(SubjectsScreen);
