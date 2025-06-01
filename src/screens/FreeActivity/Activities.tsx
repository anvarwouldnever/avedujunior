import { View, Text, Platform, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useScale } from '../../hooks/useScale'


const Activities = ({ activities, selectedIndex, setSelectedIndex }) => {

    const { s, vs } = useScale()

    return (
        <View style={{flexWrap: 'wrap', gap: vs(20), width: '100%'}}>
            {activities.map((activity, index) => {
                const isSelected = selectedIndex === index
                return (
                    <TouchableOpacity onPress={() => setSelectedIndex(index)} activeOpacity={0.8} key={index} style={{width: '100%', height: Platform.isPad? vs(100) : s(100), borderRadius: vs(16), gap: Platform.isPad? vs(20) : s(20), backgroundColor: isSelected ? '#6A5AE0' : '#EFEEFC', flexDirection: 'row', alignItems: 'center', paddingHorizontal: Platform.isPad? vs(20) : s(20)}}>
                        <Image source={activity?.pic} style={{width: s(65), height: Platform.isPad? vs(65) : s(65), backgroundColor: 'white', borderRadius: vs(20), resizeMode: 'contain'}}/>
                        <Text style={{fontSize: Platform.isPad? vs(20) : s(20), fontWeight: '700', color: isSelected ? 'white' : '#6A5AE0'}}>{activity?.name}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default Activities