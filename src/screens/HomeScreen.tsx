import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, ImageBackground, Platform } from 'react-native'
import React from 'react'
import { useScale } from '../hooks/useScale'
import MiniCalendar from './Home/MiniCalendar'
import MenuGirlContainer from './Home/MenuGirlContainer'
import TodayMaterialsCard from './Home/TodayMaterialsCard'
import SubjectsGrid from './Home/SubjectsGrid'

const HomeScreen = () => {
    const { s, vs } = useScale();

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
            <ScrollView bounces={true} style={{height: 'auto', width: '100%'}}>
                <ImageBackground source={require('../../assets/aveduBackground.png')} style={{height: 'auto', padding: Platform.isPad? vs(20) : s(20)}}>
                  <Text style={{color: 'black', fontSize: vs(22), fontWeight: '700', marginTop: vs(20), marginBottom: vs(20)}}>Главная</Text>
                  <MenuGirlContainer />

                  <Text style={{color: 'black', fontSize: vs(22), fontWeight: '700', marginTop: vs(35), marginBottom: vs(25)}}>Доска педагога</Text>
                  <MiniCalendar />

                  <TodayMaterialsCard />

                  <Text style={{color: 'black', fontSize: vs(22), fontWeight: '700', marginTop: vs(35), marginBottom: vs(25)}}>Предметы</Text>
                  <SubjectsGrid />
                </ImageBackground>
            </ScrollView>
        </View>
    )
}

export default HomeScreen;