import { View, ImageBackground} from 'react-native'
import React, { useCallback } from 'react'
import { useScale } from '../hooks/useScale'
import { bgAssets } from '../components/BgAssets'
import { store } from '../store/store'
import { observer } from 'mobx-react-lite'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import * as ScreenOrientation from 'expo-screen-orientation'
import GameNumberList from './Game/GameNumberList'
import GameView from './Game/GameView'


const GameScreen = ({ route }) => {    

    const { s, vs } = useScale()

    useFocusEffect(
        useCallback(() => {
            async function changeScreenOrientation() {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
            }
            changeScreenOrientation();
        }, [])
    );

    return (
        <ImageBackground resizeMode='cover' style={{ flex: 1, justifyContent: 'center' }} source={bgAssets[store.backgroundImage] ?? bgAssets[1]}>
            <View style={{flex: 1, justifyContent: 'space-between', paddingVertical: vs(30), paddingHorizontal: vs(100), flexDirection: 'row'}}>
                <GameView />
                <GameNumberList />
            </View>
        </ImageBackground>
    )
}

export default observer(GameScreen);

