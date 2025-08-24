import { View, Text, ImageBackground, Platform, ScrollView } from 'react-native'
import React from 'react'
import Animated, { LinearTransition } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useScale } from '../hooks/useScale';
import { observer } from 'mobx-react-lite';
import { bgAssets } from '../components/BgAssets';
import { store } from '../store/store';
import translations from '../../translations';
import Slider from '../navigation/Slider/Slider';
import SliderContent from '../navigation/Slider/SliderContent';
import LottieView from 'lottie-react-native';

const OurGroupScreen = () => {

    const { s, vs } = useScale()

    return (
        <ImageBackground style={{ flex: 1, justifyContent: 'center'}} source={store?.backgroundImage?.image?.url ? { uri: store.backgroundImage.image.url } : bgAssets[1]}>
            
            <ScrollView style={{flex: 1, padding: vs(20)}}>
                
                <Text style={{color: 'black', fontSize: Platform.isPad? vs(22) : s(22), fontWeight: '700', marginVertical: vs(20)}}>{translations[store.language].группа} "Демо (3)"</Text>
                
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                    
                    <Ionicons name='key-outline' size={vs(16)} color={'purple'}/>
                    
                    <Text style={{color: 'black', fontSize: Platform.isPad? vs(12) : s(12), fontWeight: '400'}}>
                        {translations[store.language].вы} воспитатель
                    </Text>

                </View>

                <View style={{width: '100%', backgroundColor: 'white', height: 'auto', marginTop: vs(20), borderRadius: vs(20), paddingVertical: vs(40), paddingHorizontal: vs(20), gap: vs(20), marginBottom: vs(100)}}>
                    
                    <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize: Platform.isPad? vs(16) : s(16), fontWeight: '600'}}>{translations[store.language].списокдетей}</Text>
                    
                    <View style={{width: '100%', backgroundColor: '#EFEEFC', height: vs(2), borderRadius: 20}}/>
                    
                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: vs(40) }}>
                        
                        <LottieView 
                            autoPlay
                            source={require('../../lotties/aveduKid.json')}
                            style={{ width: vs(200), height: vs(200), alignSelf: 'center' }}
                            loop
                        />

                        <Text style={{ fontSize: Platform.isPad? vs(16) : vs(16), fontWeight: '600', alignSelf: 'center' }}>Ничего не найдено</Text>
                    
                    </View>

                </View>

            </ScrollView>

            <Slider>
                <SliderContent />
            </Slider>
            
        </ImageBackground>
    )
}

export default observer(OurGroupScreen);