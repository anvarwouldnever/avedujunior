import { View, Text, Platform } from 'react-native'
import React from 'react'
import { useScale } from '../../../../hooks/useScale';

const Header = () => {

    const { s, vs } = useScale()
    
    const isPad = Platform.isPad;

    return (
        <View style={{ flexDirection: 'row', paddingHorizontal: vs(5), width: '85%', alignItems: 'center', justifyContent: 'space-between' }}>
                    
            <Text style={{ fontSize: isPad ? vs(18) : vs(16), width: '2%', textAlign: 'center', }}>№</Text>

            <Text style={{ fontSize: isPad ? vs(18) : vs(16), width: '55%', textAlign: 'center',}}>Ожидаемый результат развития</Text>
            
            <View style={{ width: '20%', alignItems: 'center', rowGap: vs(20), }}>

                <Text style={{ fontSize: isPad ? vs(18) : vs(16) }}>Наблюдается</Text>

                <View style={{ flexDirection: 'row', height: 'auto', width: '100%', justifyContent: 'space-between' }}>

                    <Text style={{ width: '25%', textAlign: 'center', fontSize: isPad ? vs(20) : vs(18) }}>Н</Text>

                    <Text style={{ width: '25%', textAlign: 'center', fontSize: isPad ? vs(20) : vs(18) }}>И</Text>

                    <Text style={{ width: '25%', textAlign: 'center', fontSize: isPad ? vs(20) : vs(18) }}>Ч</Text>

                    <Text style={{ width: '25%', textAlign: 'center', fontSize: isPad ? vs(20) : vs(18) }}>У</Text>

                </View>

            </View>

            <Text style={{ fontSize: isPad ? vs(18) : vs(16), width: '20%', textAlign: 'center',}}>Комментарий педагога</Text>

        </View>
    )
}

export default Header