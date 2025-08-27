import { View, Text, Platform, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useScale } from '../../../hooks/useScale';
import { Ionicons } from '@expo/vector-icons';
import Header from './Map/Header';

const Map = () => {

    const { s, vs } = useScale()
    const isPad = Platform.isPad;
    const [selectedButtons, setSelectedButtons] = useState({});

    const map = [
        {
            domain: 'Физическое развитие и формирование здорового образа жизни',
            fields: [
                { field: 'поднимает голову и грудь' },
                { field: 'сидит без поддержки' },
                { field: 'ищет ножки и тянет их ко рту' },
                { field: 'ползает в различных направлениях' },
                { field: 'передвигается на четвереньках' },
            ]
        },
        {
            domain: 'Социально-эмоциональное развитие',
            fields: [
                { field: 'поднимает голову и грудь' },
                { field: 'сидит без поддержки' },
                { field: 'ищет ножки и тянет их ко рту' },
                { field: 'ползает в различных направлениях' },
                { field: 'передвигается на четвереньках' },
            ]
        }
    ]

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ width: vs(1135), flexDirection: 'column', rowGap: vs(5), paddingVertical: vs(5) }} style={{ backgroundColor: '#F5F5F5' }}>
            
            <Header />

            <View style={{ width: '100%' }}>
                {map.map((item, domainIndex) => (
                    <View key={domainIndex} style={{ width: '100%' }}>
                    
                        <View style={{ flexDirection: 'row', backgroundColor: '#271B8F', paddingVertical: vs(5) }}>
                        
                            <Text style={{ width: '3%', fontSize: isPad ? vs(18) : vs(16), color: 'white', fontWeight: '600', textAlign: 'center' }}>{domainIndex + 1}</Text>

                            <Text style={{ width: '55%', fontSize: isPad ? vs(18) : vs(16), color: 'white', fontWeight: '600' }}>{item?.domain}</Text>

                        </View>

                    
                        <View style={{ width: '100%', backgroundColor: 'white' }}>

                            {item.fields.map((fieldItem, fieldIndex) => {

                                const keyPrefix = `${domainIndex}-${fieldIndex}`;

                                return (
                                    <View key={fieldIndex} style={{ width: '100%', borderBottomWidth: 1, flexDirection: 'row', backgroundColor: 'white', justifyContent: 'space-between', alignItems: 'center' }}>
                                        
                                        <Text style={{ width: '3%',fontSize: isPad ? vs(18) : vs(16), color: 'black', fontWeight: '400', textAlign: 'center' }}>{fieldIndex + 1}.</Text>

                                        <Text style={{ width: '55%', fontSize: isPad ? vs(18) : vs(16), color: 'black', fontWeight: '400' }}>{fieldItem.field}</Text>
                                        
                                        <View style={{ flexDirection: 'row', width: '40%' }}>

                                            {Array(4).fill(0).map((_, btnIndex) => {

                                                const key = `${keyPrefix}-${btnIndex}`;
                                                const isSelected = selectedButtons[key];

                                                return (
                                                    <TouchableOpacity key={btnIndex} style={{ width: '25%', height: vs(50), borderRightWidth: 1, borderLeftWidth: btnIndex === 0 ? 1 : 0, justifyContent: 'center', alignItems: 'center', backgroundColor: isSelected ? '#DDEEFF' : '' }} onPress={() => setSelectedButtons(prev => ({ ...prev, [key]: !prev[key] }))}>
                                                        {isSelected && <Ionicons name="checkmark" size={vs(24)} color="black" />}
                                                    </TouchableOpacity>
                                                );
                                            })}

                                        </View>

                                    </View>
                                );
                            })}
                            
                        </View>

                    </View>
                ))}
            </View>

        </ScrollView>

    );
};

export default Map;
