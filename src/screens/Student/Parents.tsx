import { View, Text, Platform } from 'react-native'
import React from 'react'
import { useScale } from '../../hooks/useScale';
import NotFoundKid from '../../components/NotFoundKid';

const Parents = () => {

    const { s, vs } = useScale()

    const isPad = Platform.isPad

    return (
        <View style={{ width: '100%', height: 'auto', rowGap: vs(15), flexWrap: isPad ? 'nowrap' : 'nowrap', flexDirection: isPad ? 'column' : 'column', justifyContent: 'space-between', alignItems: 'center' }}>
            
            <NotFoundKid text={'Тут пока что пусто'} />

        </View>
    )
}

export default Parents