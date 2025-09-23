import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useScale } from '../../hooks/useScale'
import translations from '../../../translations'
import { store } from '../../store/store'
import { format } from 'date-fns';
import { ru, uz } from 'date-fns/locale';

const MonthTopics = ({ days, name, changeTopic, id }) => {
      
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();

    if (store.access === 2 || store.access === 4) {
        if (month < 8) {
            year -= 1;
        }
        month = 8;
    }

    const locale = store.language === 'ru' ? ru : uz;

    const monthName = format(new Date(year, month), 'LLLL', { locale });
    const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    const { s, vs, isTablet } = useScale();

    return (
        <View style={{ borderWidth: 2, borderColor: '#EFEEFC', height: vs(360), borderRadius: 20, padding: vs(15), backgroundColor: 'white', justifyContent: 'space-between', marginBottom: vs(40), width: 'auto'}}>
            
            <Text style={{ color: 'black', fontSize: vs(16), fontWeight: '600' }}>{store.labels?.allTopicsOn || translations[store.language].всетемына} {capitalizedMonth}</Text>

            <View style={{ width: '100%', height: vs(280) }}>
                
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: vs(15) }} style={{flex: 1}}>
                    {days?.map((topic, index) => {
                        return (
                            <TouchableOpacity onPress={() => changeTopic(topic?.id)} key={index} style={{backgroundColor: id === topic?.id ? '#6A5AE0' : 'white', borderWidth: 2, width: '100%', borderColor: '#EFEEFC', borderRadius: 20, height: 'auto', padding: vs(15), rowGap: vs(15), justifyContent: 'space-between'}}>
                                
                                <Image source={require('../../screens/Catalog/staticAssets/static3.jpg')} style={{width: isTablet? vs(40) : s(40), height: vs(40), borderRadius: 10}}/>
                                
                                <View style={{width: '100%', height: 'auto', flexDirection: 'row', alignItems: 'center'}}>
                                    
                                    <View style={{ height: 'auto', rowGap: vs(5), width: '95%'}}>
                                        
                                        <Text style={{ fontSize: isTablet? vs(16) : vs(14), color: id === topic?.id ? 'white' : 'black', fontWeight: '600', lineHeight: vs(20)}}>{topic?.theme}</Text>
                                        
                                        <Text style={{ fontSize: isTablet? vs(14) : vs(12), color: id === topic?.id ? 'white' : 'grey', fontWeight: '500'}}>{name} * {topic?.tests_count} тестов</Text>
                                   
                                    </View>

                                    <Ionicons name='chevron-forward' color={id === topic?.id ? 'white' : '#6A5AE0'} size={20}/>
                                
                                </View>

                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>

            </View>
            
        </View>
    )
}

export default MonthTopics