import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useScale } from '../../../hooks/useScale';
import Header from './Map/Header';
import { Ionicons } from '@expo/vector-icons';

const Map = ({ map }) => {

    const { s, vs, isTablet, windowWidth } = useScale()

    const isPad = isTablet;

    const [selectedButtons, setSelectedButtons] = useState({});

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ width: windowWidth - vs(80), height: 'auto', flexDirection: 'column', rowGap: vs(5), paddingVertical: vs(5) }} style={{ backgroundColor: '#F5F5F5' }}>
            
            <Header />

            {<View style={{ width: '100%', height: 'auto' }}>
                
                {map?.map((item, sectionIndex) => {
                    const sectionNumber = sectionIndex + 1;

                    return (
                        <View style={{ height: 'auto', width: '100%' }} key={sectionNumber}>
                            
                            <View style={{ paddingHorizontal: vs(10), flexDirection: 'row', backgroundColor: '#271B8F', paddingVertical: vs(5), height: 'auto' }}>

                                <Text style={{ width: '3%', fontSize: isPad ? vs(18) : vs(16), textAlign: 'left', color: 'white', fontWeight: '600' }}>{sectionNumber}</Text>

                                <Text style={{  width: '55%', fontSize: isPad ? vs(18) : vs(16), textAlign: 'left', color: 'white', fontWeight: '600'  }}>{item?.name}</Text>

                            </View>

                            <View style={{ height: 'auto', width: '100%' }}>
                                {item?.subsections?.map(( item, subsectionIndex) => {
                                    const number = subsectionIndex + 1;

                                    return (
                                        <View style={{ height: 'auto', width: '100%' }} key={subsectionIndex}>
                                            
                                            <View style={{ paddingHorizontal: vs(10), flexDirection: 'row', backgroundColor: '#858494', paddingVertical: vs(5), height: 'auto' }}>
                                                
                                                <Text style={{ width: '3%', fontSize: isPad ? vs(18) : vs(16), textAlign: 'left', color: 'white', fontWeight: '600' }}>{sectionNumber}.{number}.</Text>

                                                <Text style={{ width: '55%', fontSize: isPad ? vs(18) : vs(16), textAlign: 'left', color: 'white', fontWeight: '600'  }}>{item?.name}</Text>

                                            </View>

                                            <View style={{ width: '100%', height: 'auto' }}>
                                                {item?.properties?.map((fieldItem, fieldIndex) => {
                                                    const number = fieldIndex + 1;

                                                    return (
                                                        <View key={fieldIndex} style={{ paddingHorizontal: vs(10), width: '100%', minHeight: vs(50), borderBottomWidth: 1, flexDirection: 'row', backgroundColor: 'white', justifyContent: 'space-between', alignItems: 'stretch' }}>
                                                            
                                                            <Text style={{ width: '3%', fontSize: isPad ? vs(18) : vs(16), textAlign: 'left', color: 'black', fontWeight: '400', alignSelf: 'center' }}>{number}.</Text>
                                                            
                                                            <Text style={{ width: '55%', fontSize: isPad ? vs(18) : vs(16), textAlign: 'left', color: 'black', fontWeight: '400', alignSelf: 'center', marginVertical: vs(10)}}>{fieldItem?.name}</Text>
                                                
                                                            <View style={{ flexDirection: 'row', width: '20%', alignItems: 'stretch', justifyContent: 'center' }}>
                                                                {Array(4).fill(0).map((_, btnIndex) => {
                                                                    const key = `${sectionIndex}-${subsectionIndex}-${fieldIndex}`;
                                                                    const isSelected = selectedButtons[key] === btnIndex;

                                                                    return (
                                                                        <TouchableOpacity
                                                                            key={btnIndex}
                                                                            style={{
                                                                                width: '25%',
                                                                                flex: 1,
                                                                                borderRightWidth: btnIndex === 3 ? 1 : 1, borderBottomWidth: 0, borderLeftWidth: btnIndex === 0 ? 1 : 0,
                                                                                justifyContent: 'center',
                                                                                alignItems: 'center',
                                                                                backgroundColor: isSelected ? '#DDEEFF' : 'white',
                                                                            }}
                                                                            onPress={() =>
                                                                                setSelectedButtons(prev => ({
                                                                                    ...prev,
                                                                                    [key]: prev[key] === btnIndex ? null : btnIndex,
                                                                                }))
                                                                            }
                                                                        >
                                                                            {isSelected && <Ionicons name="checkmark" size={vs(24)} color="black" />}
                                                                        </TouchableOpacity>
                                                                    );
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

            </View>}

        </ScrollView>
    )
}

export default Map;