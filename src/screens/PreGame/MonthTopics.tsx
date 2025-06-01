import { View, Text, ScrollView, TouchableOpacity, Image, Platform } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useScale } from '../../hooks/useScale'

const MonthTopics = () => {

    const { s, vs } = useScale()

    const topics = [{}, {}, {}, {}, {}, {}]

    return (
        <View style={{ borderWidth: 2, borderColor: '#EFEEFC', height: vs(360), borderRadius: 20, padding: vs(15), backgroundColor: 'white', justifyContent: 'space-between', marginBottom: 100}}>
            <Text style={{ color: 'black', fontSize: vs(16), fontWeight: '600' }}>Все темы на май</Text>

            <View style={{ width: '100%', height: vs(280) }}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: vs(15) }} style={{flex: 1}}>
                    {topics.map((topic, index) => {
                        return (
                            <TouchableOpacity key={index} style={{borderWidth: 2, width: '100%', borderColor: '#EFEEFC', borderRadius: 20, height: vs(130), padding: vs(15), justifyContent: 'space-between'}}>
                                <Image source={require('../../screens/Catalog/staticAssets/static3.jpg')} style={{width: Platform.isPad? vs(40) : s(40), height: vs(40), borderRadius: 10}}/>
                                <View style={{width: '100%', height: vs(40), justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={{justifyContent: 'space-between', height: '100%'}}>
                                        <Text style={{ fontSize: vs(14), fontWeight: '600', color: 'black' }}>Дом моей мечты</Text>
                                        <Text style={{ fontSize: vs(12), color: 'grey'}}>Рисование * 7 тестов</Text>
                                    </View>

                                    <Ionicons name='chevron-forward' color={'purple'} size={20}/>
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