import { View, Text, Platform, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useScale } from '../../../hooks/useScale';
import Header from './Map/Header';
import { Ionicons } from '@expo/vector-icons';

const Map = () => {

    const { s, vs } = useScale()

    const isPad = Platform.isPad;

    const [selectedButtons, setSelectedButtons] = useState({});

    const map = [
        {
            domain: 'Физическое развитие и формирование здорового образа жизни',
            domains: [
                {
                    subdomain: 'Подобласть. Крупная моторика',
                    fields: [
                        {
                            field: 'поднимает голову и грудь'
                        },
                        {
                            field: 'сидит без поддержки'
                        },
                        {
                            field: 'ищет ножки и тянет их ко рту'
                        },
                        {
                            field: 'ползает в различных направлениях'
                        },
                        {
                            field: 'передвигается на четвереньках'
                        },
                    ]
                },
                {
                    subdomain: 'Подобласть. Мелкая моторика',
                    fields: [
                        {
                            field: 'поднимает голову и грудь'
                        },
                        {
                            field: 'сидит без поддержки'
                        },
                        {
                            field: 'ищет ножки и тянет их ко рту'
                        },
                        {
                            field: 'ползает в различных направлениях'
                        },
                        {
                            field: 'передвигается на четвереньках'
                        },
                    ]
                },

            ]
        },
        {
            domain: 'Социально-эмоциональное развитие',
            domains: [
                {
                    subdomain: 'Подобласть. Крупная моторика',
                    fields: [
                        {
                            field: 'поднимает голову и грудь'
                        },
                        {
                            field: 'сидит без поддержки'
                        },
                        {
                            field: 'ищет ножки и тянет их ко рту'
                        },
                        {
                            field: 'ползает в различных направлениях'
                        },
                        {
                            field: 'передвигается на четвереньках'
                        },
                    ]
                },
                {
                    subdomain: 'Подобласть. Мелкая моторика',
                    fields: [
                        {
                            field: 'поднимает голову и грудь'
                        },
                        {
                            field: 'сидит без поддержки'
                        },
                        {
                            field: 'ищет ножки и тянет их ко рту'
                        },
                        {
                            field: 'ползает в различных направлениях'
                        },
                        {
                            field: 'передвигается на четвереньках'
                        },
                    ]
                },

            ]
        }
    ]

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ width: vs(1135), height: 'auto', flexDirection: 'column', rowGap: vs(5), paddingVertical: vs(5) }} style={{ backgroundColor: '#F5F5F5' }}>
            
            <Header />

            <View style={{ width: '100%', height: 'auto' }}>
                
                {map.map((item, domainIndex) => {
                    const domainNumber = domainIndex + 1;

                    return (
                        <View style={{ height: 'auto', width: '100%' }} key={domainIndex}>
                            
                            <View style={{ paddingHorizontal: vs(10), flexDirection: 'row', backgroundColor: '#271B8F', paddingVertical: vs(5), height: 'auto' }}>

                                <Text style={{ width: '3%', fontSize: isPad ? vs(18) : vs(16), textAlign: 'left', color: 'white', fontWeight: '600' }}>{domainNumber}</Text>

                                <Text style={{  width: '55%', fontSize: isPad ? vs(18) : vs(16), textAlign: 'left', color: 'white', fontWeight: '600'  }}>{item?.domain}</Text>

                            </View>

                            <View style={{ height: 'auto', width: '100%' }}>
                                {item?.domains?.map(( item, subDomainIndex) => {
                                    const number = subDomainIndex + 1;

                                    return (
                                        <View style={{ height: 'auto', width: '100%' }} key={subDomainIndex}>
                                            
                                            <View style={{ paddingHorizontal: vs(10), flexDirection: 'row', backgroundColor: '#858494', paddingVertical: vs(5), height: 'auto' }}>
                                                
                                                <Text style={{ width: '3%', fontSize: isPad ? vs(18) : vs(16), textAlign: 'left', color: 'white', fontWeight: '600' }}>{domainNumber}.{number}.</Text>

                                                <Text style={{  width: '55%', fontSize: isPad ? vs(18) : vs(16), textAlign: 'left', color: 'white', fontWeight: '600'  }}>{item?.subdomain}</Text>

                                            </View>

                                            <View style={{ width: '100%', height: 'auto' }}>
                                                {item?.fields.map((fieldItem, fieldIndex) => {
                                                    const number = fieldIndex + 1;

                                                    return (
                                                        <View key={fieldIndex} style={{ paddingHorizontal: vs(10), width: '100%', borderBottomWidth: 1, flexDirection: 'row', backgroundColor: 'white', height: 'auto', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            
                                                            <Text style={{ width: '3%', fontSize: isPad ? vs(18) : vs(16), textAlign: 'left', color: 'black', fontWeight: '400' }}>{number}.</Text>
                                                            
                                                            <Text style={{ width: '55%', fontSize: isPad ? vs(18) : vs(16), textAlign: 'left', color: 'black', fontWeight: '400' }}>{fieldItem?.field}</Text>

                                                
                                                            <View style={{ flexDirection: 'row', width: '20%' }}>
                                                                {Array(4).fill(0).map((_, btnIndex) => {
                                                                    const key = `${domainIndex}-${subDomainIndex}-${fieldIndex}-${btnIndex}`;
                                                                    const isSelected = selectedButtons[key];

                                                                    return (
                                                                        <TouchableOpacity
                                                                            
                                                                            key={btnIndex}
                                                                            style={{
                                                                                width: '25%',
                                                                                height: vs(50),
                                                                                borderRightWidth: btnIndex === 3 ? 1 : 1,
                                                                                borderBottomWidth: 0,
                                                                                borderLeftWidth: btnIndex === 0 ? 1 : 0,
                                                                                justifyContent: 'center',
                                                                                alignItems: 'center',
                                                                                backgroundColor: isSelected ? '#DDEEFF' : ''
                                                                                
                                                                            }}
                                                                            onPress={() => setSelectedButtons(prev => ({ ...prev, [key]: !prev[key] }))}
                                                                        >
                                                                            {isSelected && <Ionicons name="checkmark" size={vs(24)} color="black" />}
                                                                        </TouchableOpacity>
                                                                    )
                                                                })}
                                                            </View>

                                                            <TextInput style={{ fontSize: isPad ? vs(18) : vs(16), width: '20%', textAlign: 'left'}} />
                                                        </View>
                                                    )
                                                })}
                                            </View>

                                        </View>
                                        
                                    )
                                })}
                            </View>

                        </View>
                    )
                })}

            </View>

        </ScrollView>
    )
}

export default Map;