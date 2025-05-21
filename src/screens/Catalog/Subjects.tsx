import { View, Text, TouchableOpacity, Image, useWindowDimensions, Platform } from 'react-native'
import React from 'react'
import { useScale } from '../../hooks/useScale'

const Subjects = ({ selectedIndex, setSelectedIndex, materials }) => {

    const { s, vs } = useScale()

    const { width } = useWindowDimensions()
    const moreThanOne = width >= 738
    const subjectWidth = moreThanOne? (width - vs(55)) / 2 : width - vs(40)

    return (
        <View style={{width: '100%', height: 'auto', gap: vs(15), flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between'}}>
            {materials.map((material, index) => {
                const isSelected = selectedIndex === index
                return (
                    <TouchableOpacity activeOpacity={0.8} onPress={() => setSelectedIndex(index)} key={index} style={{width: subjectWidth, height: vs(80), borderRadius: 20, backgroundColor: isSelected ? '#6A5AE0' : '#EFEEFC', padding: vs(25), alignItems: 'center', flexDirection: 'row', gap: s(15)}}>
                        <Image source={material.icon} style={{width: Platform.isPad? vs(35) : s(35), height: vs(35), borderRadius: 10}}/>
                        <View style={{height: vs(35), width: '80%', justifyContent: 'space-between'}}>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={{fontWeight: '600', fontSize: vs(14), color: isSelected ? 'white' : '#6A5AE0', width: '90%'}}>{material.title}</Text>
                            <Text style={{fontWeight: '400', fontSize: vs(12), color: isSelected ? 'white' : '#6A5AE0'}}>{material.topicsAmount}</Text>
                        </View>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default Subjects;