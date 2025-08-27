import { View, Text, ImageBackground, Platform, ScrollView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useScale } from '../hooks/useScale';
import { observer } from 'mobx-react-lite';
import { bgAssets } from '../components/BgAssets';
import { store } from '../store/store';
import translations from '../../translations';
import Slider from '../navigation/Slider/Slider';
import SliderContent from '../navigation/Slider/SliderContent';
import Students from './OurGroup/Students';
import { getStudents } from './OurGroup/hooks/getStudents';
import NotFoundKid from '../components/NotFoundKid';

const OurGroupScreen = () => {

    const { s, vs } = useScale()

    const { students, loading, error } = getStudents()

    return (
        <ImageBackground style={{ flex: 1, justifyContent: 'center'}} source={store?.backgroundImage?.image?.url ? { uri: store.backgroundImage.image.url } : bgAssets[1]}>
            
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ rowGap: vs(20) }} style={{flex: 1, padding: vs(20)}}>
                
                <View style={{ height: 'auto', width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{color: 'black', fontSize: Platform.isPad? vs(22) : vs(20), fontWeight: '700'}}>{translations[store.language].группа} "{store?.group}"</Text>
                
                    {store.juridical && <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                    
                        <Ionicons name='key-outline' size={vs(16)} color={'purple'}/>
                        
                        <Text style={{color: 'black', fontSize: Platform.isPad? vs(14) : vs(12), fontWeight: '400'}}>
                            {translations[store.language].вы} воспитатель
                        </Text>

                    </View>}
                </View>

                <View style={{width: '100%', backgroundColor: 'white', height: 'auto', borderRadius: vs(20), padding: vs(20), gap: vs(20), marginBottom: vs(40), borderWidth: 1, borderColor: '#e2cef2'}}>
                    
                    <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize: Platform.isPad? vs(18) : vs(16), fontWeight: '600'}}>{translations[store.language].списокдетей}</Text>
                    
                    <View style={{width: '100%', backgroundColor: '#EFEEFC', height: vs(2), borderRadius: 20}}/>
                    
                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: students?.length > 0? 0 : vs(40) }}>
                        
                        { students?.length <= 0 ?
                            <NotFoundKid text={'Ничего не найдено'} />
                        :
                            <Students students={students} />
                        }

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