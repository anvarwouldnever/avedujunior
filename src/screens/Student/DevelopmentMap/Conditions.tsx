import { View, Text, Platform, ScrollView } from 'react-native'
import React from 'react'
import { useScale } from '../../../hooks/useScale';

const Conditions = () => {
    
    const { vs } = useScale();

    const isPad = Platform.isPad;

    const conditions = [
        { key: 'notAble', label: 'Не умеет' },
        { key: 'sometimes', label: 'Иногда' },
        { key: 'often', label: 'Часто' },
        { key: 'able', label: 'Умеет' },
    ];

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ columnGap: vs(14) }} style={{ flexDirection: 'row', width: 'auto', height: 'auto' }}>
            
            {conditions.map(cond => (
                <View key={cond.key} style={{ flexDirection: 'row', alignItems: 'center', columnGap: vs(8), width: 'auto', height: 'auto' }}>
                    
                    <View style={{ width: vs(20), height: vs(20), backgroundColor: '#6A5AE0', borderRadius: vs(3) }} />

                    <Text style={{ fontSize: isPad ? vs(16) : vs(14), fontWeight: '400' }}>
                        {cond.label}
                    </Text>
                    
                </View>
            ))}

        </ScrollView>
    )
}

export default Conditions
