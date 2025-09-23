import { View, Text } from 'react-native'
import React from 'react'
import { useScale } from '../../../../hooks/useScale';
import { store } from '../../../../store/store';

const Header = () => {

    const { s, vs, isTablet } = useScale()
    
    const isPad = isTablet;

    const labels = store.labels || {};

    const conditionsLetters = [
        labels.cannotDo?.[0] || 'Н',
        labels.sometimes?.[0] || 'И',
        labels.often?.[0] || 'Ч',
        labels.canDo?.[0] || 'У',
    ];

    return (
        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                    
            <Text style={{ fontSize: isPad ? vs(18) : vs(16), width: '3%', textAlign: 'center' }}>№</Text>

            <Text style={{ fontSize: isPad ? vs(18) : vs(16), width: '55%', textAlign: 'center'}}>
                {labels.expectedDevelopmentalOutcome || 'Ожидаемый результат развития'}
            </Text>
            
            <View style={{ width: '40%', alignItems: 'center', rowGap: vs(20) }}>

                <Text style={{ fontSize: isPad ? vs(18) : vs(16) }}>{labels.observed || 'Наблюдается'}</Text>

                <View style={{ flexDirection: 'row', height: 'auto', width: '100%', justifyContent: 'space-between' }}>
                    {conditionsLetters.map((letter, index) => (
                        <Text key={index} style={{ width: '25%', textAlign: 'center', fontSize: isPad ? vs(20) : vs(18) }}>
                            {letter}
                        </Text>
                    ))}
                </View>

            </View>

        </View>
    )
}

export default Header