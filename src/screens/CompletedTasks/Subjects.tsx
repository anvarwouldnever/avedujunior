import { View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import { useScale } from '../../hooks/useScale'

const Subjects = ({ selectedId, setSelectedId, subjects }) => {

    const { s, vs, isTablet } = useScale()

    const { width } = useWindowDimensions()
    const moreThanOne = width >= 738

    const gap = vs(5);
    const padding = isTablet ? vs(40) : vs(20);
    const containerWidth = width - padding * 2;

    const columns = isTablet ? 3 : 2;
    const totalGap = gap * (columns - 1);

    const subjectWidth = isTablet? (containerWidth - totalGap) / columns : moreThanOne? (width - vs(55)) / 2 : width - vs(40)
    
    return (
        <View style={{width: '100%', height: 'auto', columnGap: gap, rowGap: vs(20), flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between'}}>
            {subjects?.map((subject, index) => {
                
                const isSelected = selectedId === index;
                
                return (
                    <TouchableOpacity activeOpacity={0.8} onPress={() => setSelectedId(index)} key={index} style={{width: subjectWidth, height: isTablet? vs(80) : s(80), borderRadius: 20, backgroundColor: isSelected ? '#6A5AE0' : '#EFEEFC', padding: vs(25), alignItems: 'center', flexDirection: 'row', gap: vs(15)}}>
                        
                        <Image source={{ uri: subject?.image?.url }} style={{width: isTablet? vs(35) : s(35), height: isTablet? vs(35) : s(35), borderRadius: 10, backgroundColor: 'white'}}/>
                        
                        <View style={{height: '100%', width: '80%', justifyContent: 'center',rowGap: vs(5)}}>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={{fontWeight: '600', fontSize: isTablet? vs(14) : vs(14), color: isSelected ? 'white' : '#6A5AE0', width: '90%'}}>{subject?.name}</Text>
                            <Text style={{fontWeight: '400', fontSize: isTablet? vs(12) : vs(12), color: isSelected ? 'white' : '#6A5AE0'}}>{subject?.days_counts} темы</Text>
                        </View>
                        
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default Subjects;