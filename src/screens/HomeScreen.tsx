import { View, Text, ScrollView, ImageBackground } from 'react-native'
import React from 'react'
import { useScale } from '../hooks/useScale'
import MiniCalendar from './Home/MiniCalendar'
import MenuGirlContainer from './Home/MenuGirlContainer'
import TodayMaterialsCard from './Home/TodayMaterials/TodayMaterialsCard'
import SubjectsGrid from './Home/SubjectsGrid/SubjectsGrid'
import { observer } from 'mobx-react-lite'
import { bgAssets } from '../components/BgAssets'
import { store } from '../store/store'
import useLock from '../hooks/useLock'
import translations from '../../translations'
import Slider from '../navigation/Slider/Slider'
import SliderContent from '../navigation/Slider/SliderContent'
import { getAccount } from './Profile/hooks/getAccount'
import { getLabels } from './Home/hooks/getLabels'

const HomeScreen = () => {

    const { s, vs, isTablet } = useScale();

    useLock();

    getAccount();
    getLabels()

    return (
        <ImageBackground resizeMode='cover' style={{ flex: 1 }} source={store?.backgroundImage?.image?.url ? { uri: store.backgroundImage.image.url } : bgAssets[1]}>
            
            <ScrollView contentContainerStyle={{ rowGap: vs(20), padding: vs(20) }} showsVerticalScrollIndicator={false} bounces={true} style={{ flex: 1 }}>
                
                <Text style={{color: 'black', fontSize: isTablet ? vs(24) : vs(22), fontWeight: '700'}}>{translations[store.language].главная}</Text>
                
                <MenuGirlContainer />
                
                { store.juridical && <Text style={{color: 'black', fontSize: isTablet ? vs(24) : vs(22), fontWeight: '700'}}>{translations[store.language].доскапедагога}</Text>}

                {   
                    store.juridical 
                && 
                    <View style={{flexDirection: isTablet ? 'row' : 'column', justifyContent: 'space-between'}}>
                        
                        <MiniCalendar />

                        <TodayMaterialsCard />

                    </View>
                }
                
                <Text style={{color: 'black', fontSize: isTablet ? vs(24) : vs(22), fontWeight: '700'}}>{translations[store.language].предметы}</Text>
                
                <SubjectsGrid />

            </ScrollView>

            <Slider>
                <SliderContent />
            </Slider>
            
        </ImageBackground>
    )
}

export default observer(HomeScreen);