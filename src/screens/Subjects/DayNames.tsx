import { View, Text, Platform, ScrollView } from 'react-native'
import React from 'react'
import { vs, s } from 'react-native-size-matters';
import { useScale } from '../../hooks/useScale';

const DayNames = () => {

    const dayNames = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];
    const { s, vs } = useScale();

    return (
        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ flexDirection: 'row' }}>
            {dayNames.map((item, index) => (
                <Text
                    key={index}
                    style={{
                        width: Platform.isPad? vs(200) : s(200),
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