import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useScale } from '../../../hooks/useScale'
import { store } from '../../../store/store'

const Tables = () => {

    const { vs, isTablet } = useScale()
    const isPad = isTablet;

    const tables = [
        { id: 1, title: `${store.labels?.childDevelopmentMap} 0-1 год` },
        { id: 2, title: `${store.labels?.childDevelopmentMap} 1-2 год` },
        { id: 3, title: `${store.labels?.childDevelopmentMap} 2-3 год` },
        { id: 4, title: `${store.labels?.childDevelopmentMap} 3-4 год` },
        { id: 5, title: `${store.labels?.childDevelopmentMap} 4-5 год` },
        { id: 6, title: `${store.labels?.childDevelopmentMap} 5-6 год` },
        { id: 7, title: `${store.labels?.childDevelopmentMap} 6-7 год` },
    ]

    return (
        <View style={{ width: '100%', height: 'auto', alignItems: 'center', flexDirection: isPad ? 'row' : 'column', justifyContent: 'space-between', flexWrap: isPad ? 'wrap' : 'nowrap', rowGap: vs(15) }}>
            
            {tables.map(item => (
                <TouchableOpacity key={item.id} style={{ backgroundColor: '#6A5AE0', flexDirection: isPad ? 'row' : 'column', width: isPad ? '32%' : '100%', padding: vs(14), borderRadius: vs(16), justifyContent: 'space-between', rowGap: vs(10) }}>
                    
                    <Text style={{ fontSize: isPad ? vs(18) : vs(16), color: 'white', width: isPad ? '55%' : '100%', fontWeight: '500', lineHeight: vs(26) }}>
                        {item?.title}
                    </Text>

                    <TouchableOpacity style={{ padding: vs(10), borderRadius: vs(16), justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', width: '46%' }}>
                        <Text adjustsFontSizeToFit style={{ fontSize: isPad ? vs(16) : vs(14), color: '#6A5AE0', fontWeight: '600', textAlign: 'center' }}>{store.labels?.downloadTable}</Text>
                    </TouchableOpacity>

                </TouchableOpacity>
            ))}

        </View>
    )
}

export default Tables;
