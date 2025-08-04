import { View, Text, ScrollView, TouchableOpacity, Image, Platform } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useScale } from '../../hooks/useScale'
import translations from '../../../translations'
import { store } from '../../store/store'
import { format } from 'date-fns';
import { ru, enUS, uz } from 'date-fns/locale';

const MonthTopics = ({ days, name, changeTopic, id }) => {
      
    const currentMonth = format(new Date(), 'LLLL', { locale: store.language === 'ru' ? ru : uz });
    const capitalizedMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);

    const { s, vs } = useScale();

    return (
        <View style={{ borderWidth: 2, borderColor: '#EFEEFC', height: vs(360), borderRadius: 20, padding: vs(15), backgroundColor: 'white', justifyContent: 'space-between', marginBottom: 100}}>
            <Text style={{ color: 'black', fontSize: vs(16), fontWeight: '600' }}>{translations[store.language].всетемына} {capitalizedMonth}</Text>

            <View style={{ width: '100%', height: vs(280) }}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: vs(15) }} style={{flex: 1}}>
                    {days?.map((topic, index) => {
                        return (
                            <TouchableOpacity onPress={() => changeTopic(topic?.id)} key={index} style={{backgroundColor: id === topic?.id ? '#6A5AE0' : 'white', borderWidth: 2, width: '100%', borderColor: '#EFEEFC', borderRadius: 20, height: vs(130), padding: vs(15), justifyContent: 'space-between'}}>
                                <Image source={require('../../screens/Catalog/staticAssets/static3.jpg')} style={{width: Platform.isPad? vs(40) : s(40), height: vs(40), borderRadius: 10}}/>
                                <View style={{width: '100%', height: vs(40), justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={{justifyContent: 'space-between', height: '100%'}}>
                                        <Text style={{ fontSize: vs(14), fontWeight: '600', color: id === topic?.id ? 'white' : 'black' }}>{topic?.theme}</Text>
                                        <Text style={{ fontSize: vs(12), color: id === topic?.id ? 'white' : 'grey'}}>{name} * {topic?.tests_count} тестов</Text>
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