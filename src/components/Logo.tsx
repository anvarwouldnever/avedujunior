import { View, Text, Image } from 'react-native'
import React from 'react'
import logo from '../../assets/aveduLogo.jpg'

const Logo = () => {
    return <Image source={logo} style={{width: 100, height: 60, resizeMode: 'contain', marginLeft: 15}}/>
}

export default Logo;