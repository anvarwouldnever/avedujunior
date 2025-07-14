import { View, Text, ScrollView, ImageBackground, Platform } from 'react-native'
import React, { useCallback } from 'react'
import { useScale } from '../hooks/useScale'
import MiniCalendar from './Home/MiniCalendar'
import MenuGirlContainer from './Home/MenuGirlContainer'
import TodayMaterialsCard from './Home/TodayMaterialsCard'
import SubjectsGrid from './Home/SubjectsGrid/SubjectsGrid'
import { observer } from 'mobx-react-lite'
import { bgAssets } from '../components/BgAssets'
import { store } from '../store/store'
import useLock from '../hooks/useLock'

const HomeScreen = () => {
    const { s, vs } = useScale();

    useLock()

    return (
        <ImageBackground resizeMode='cover' style={{ flex: 1 }} source={store?.backgroundImage?.image?.url ? { uri: store.backgroundImage.image.url } : bgAssets[1]}>
            <ScrollView bounces={true} style={{ flex: 1, padding: Platform.isPad? vs(20) : s(20)}}>
                <Text style={{color: 'black', fontSize: Platform.isPad? vs(22) : s(22), fontWeight: '700', marginTop: Platform.isPad? vs(20) : s(20), marginBottom: Platform.isPad? vs(20) : s(20)}}>Главная</Text>
                <MenuGirlContainer />

                
                <Text style={{color: 'black', fontSize: Platform.isPad? vs(22) : s(22), fontWeight: '700', marginTop: vs(35), marginBottom: vs(25)}}>Доска педагога</Text>
                
                <View style={{flexDirection: Platform.isPad? 'row' : 'column', justifyContent: 'space-between'}}>
                    <MiniCalendar />

                    <TodayMaterialsCard />
                </View>

                <Text style={{color: 'black', fontSize: Platform.isPad? vs(22) : s(22), fontWeight: '700', marginTop: vs(35), marginBottom: vs(25)}}>Предметы</Text>
                <SubjectsGrid />
            </ScrollView>
        </ImageBackground>
    )
}

export default observer(HomeScreen);