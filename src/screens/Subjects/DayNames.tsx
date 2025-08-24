import { View, Text, Platform, ScrollView } from 'react-native'
import React from 'react'
import { vs, s } from 'react-native-size-matters';
import { useScale } from '../../hooks/useScale';
import translations from '../../../translations';
import { store } from '../../store/store';

const DayNames = () => {

    const dayNames = [translations[store.language].понедельник, translations[store.language].вторник, translations[store.language].среда, translations[store.language].четверг, translations[store.language].пятница];
    const { s, vs } = useScale();

    return (
        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ flexDirection: 'row' }}>
            {dayNames?.map((item, index) => (
                <Text
                    key={index}
                    style={{
                        width: Platform.isPad? vs(220) : vs(220),
                        fontSize: Platform.isPad? vs(14) : s(14),
                        fontWeight: '400',
                        borderColor: '#000',
                        textAlign: 'center',
                        paddingVertical: Platform.isPad? vs(14) : s(14),
                        
                    }}
                >
                    {item}
                </Text>
            ))}
        </ScrollView>
    )
}

export default DayNames;