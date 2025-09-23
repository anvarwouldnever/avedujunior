import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useScale } from '../../../hooks/useScale';
import { store } from '../../../store/store';

const Conditions = () => {
    
    const { vs, isTablet } = useScale();

    const isPad = isTablet;

    const conditions = [
        { key: 'notAble', label: store.labels?.cannotDo },
        { key: 'sometimes', label: store.labels?.sometimes },
        { key: 'often', label: store.labels?.often },
        { key: 'able', label: store.labels?.canDo },
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
