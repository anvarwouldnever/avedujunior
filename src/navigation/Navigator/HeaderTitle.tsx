import { View, Text, Platform } from 'react-native'
import React from 'react'
import { useScale } from '../../hooks/useScale';

const HeaderTitle = ({ value }) => {

    const { s, vs, isTablet, windowWidth } = useScale()

    return (
        <View style={{ position: Platform.OS === 'android' ? 'absolute' : 'relative', width: Platform.OS === 'android' ? windowWidth : 'auto', justifyContent: 'center', alignItems: 'center', left: 0}}>
            <Text style={{ fontSize: isTablet ? vs(20) : vs(14), fontWeight: '700', maxWidth: vs(120), color: '#6A5AE0', textAlign: 'center'}} numberOfLines={2} ellipsizeMode="tail">
                {value}
            </Text>
        </View>
    )
}
  
export default HeaderTitle