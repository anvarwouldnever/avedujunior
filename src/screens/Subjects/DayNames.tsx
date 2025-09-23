import { View, Text, Platform, ScrollView } from 'react-native'
import React from 'react'
import { vs, s } from 'react-native-size-matters';
import { useScale } from '../../hooks/useScale';
import translations from '../../../translations';
import { store } from '../../store/store';

const DayNames = () => {

    const { s, vs, isTablet } = useScale();

    // label с fallback
    const label = (key: string, fallbackKey: string) => store.labels?.[key] || translations[store?.language]?.[fallbackKey];

    const dayNames = [
        label('monday', 'понедельник'), 
        label('tuesday', 'вторник'), 
        label('wednesday', 'среда'), 
        label('thursday', 'четверг'), 
        label('friday', 'пятница')
    ];

    return (
        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ flexDirection: 'row' }}>
            {dayNames?.map((item, index) => (
                <Text
                    key={index}
                    style={{
                        width: isTablet? vs(220) : vs(220),
                        fontSize: isTablet? vs(14) : s(14),
                        fontWeight: '400',
                        borderColor: '#000',
                        textAlign: 'center',
                        paddingVertical: isTablet? vs(14) : s(14),
                    }}
                >
                    {item}
                </Text>
            ))}
        </ScrollView>
    )
}

export default DayNames;
