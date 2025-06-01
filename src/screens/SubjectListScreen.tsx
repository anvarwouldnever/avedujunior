import { View, Text, ImageBackground, ScrollView } from 'react-native'
import React from 'react'
import Animated, { LinearTransition } from 'react-native-reanimated'
import { useScale } from '../hooks/useScale'
import ProgressBorder from '../components/ProgressBorder'
import { useNavigation } from '@react-navigation/native'
import { bgAssets } from '../components/BgAssets'
import { store } from '../store/store'
import { observer } from 'mobx-react-lite'
import SubjectList from './SubjectList/SubjectList'

const SubjectListScreen = ({ route }) => {

    const { s, vs } = useScale()

    return (
        <ImageBackground resizeMode='cover' style={{ flex: 1, justifyContent: 'center' }} source={bgAssets[store.backgroundImage] ?? bgAssets[1]}>
            <ScrollView style={{flex: 1, padding: vs(20)}}>
                <Text style={{color: 'black', fontSize: vs(22), fontWeight: '700', marginVertical: vs(20)}}>Предмет: {route?.params?.name}</Text>
                <SubjectList route={route}/>
            </ScrollView>
        </ImageBackground>
    )
}

export default observer(SubjectListScreen);