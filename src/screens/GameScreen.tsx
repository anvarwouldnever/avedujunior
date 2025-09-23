import { View, ImageBackground} from 'react-native'
import React, { useCallback, useState, useEffect, useRef } from 'react'
import { useScale } from '../hooks/useScale'
import { bgAssets } from '../components/BgAssets'
import { store } from '../store/store'
import { observer } from 'mobx-react-lite'
import { useFocusEffect } from '@react-navigation/native'
import * as ScreenOrientation from 'expo-screen-orientation'
import GameNumberList from './Game/GameNumberList'
import GameView from './Game/GameView'
import { useGames } from './Game/hooks/getGames';
import FullImage from './Game/FullImage'

const GameScreen = ({ route }) => {    

    const id = route?.params?.id;
    const name = route?.params?.name;
    const tasksId = route?.params?.tasksId;

    const { games, error, loading, markGameAsPassed } = useGames(id);

    const { s, vs, isTablet } = useScale();
    const [chosenGame, setChosenGame] = useState<number>(1);
    const [fullImage, setFullImage] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string>(null);

    const hasSetChosenGame = useRef(false);

    useFocusEffect(
        useCallback(() => {
            async function changeScreenOrientation() {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
            }
            changeScreenOrientation();
        }, [])
    );

    useEffect(() => {
        if (!hasSetChosenGame.current && games.length > 0) {
            const firstUnpassedIndex = games.findIndex(game => game?.passed !== 1);
            setChosenGame(firstUnpassedIndex !== -1 ? firstUnpassedIndex + 1 : -1);
            hasSetChosenGame.current = true;
        }
    }, [games]);

    return (
        <ImageBackground resizeMode='cover' style={{ flex: 1, justifyContent: 'center' }} source={store?.backgroundImage?.image?.url ? { uri: store.backgroundImage.image.url } : bgAssets[1]}>
            
            <View style={{flex: 1, justifyContent: 'space-between', paddingVertical: isTablet ? vs(20) : s(7), paddingLeft: isTablet ? s(10) : s(20), paddingRight: s(10), flexDirection: 'row'}}>
                
                <GameView name={name} tasksId={tasksId} games={games} markGameAsPassed={markGameAsPassed} chosenGame={chosenGame} setChosenGame={setChosenGame} game={games[chosenGame - 1]} setFullImage={setFullImage} setSelectedImage={setSelectedImage}/>
                
                <GameNumberList games={games} setChosenGame={setChosenGame} chosenGame={chosenGame}/>
                
                <FullImage selectedImage={selectedImage} setFullImage={setFullImage} fullImage={fullImage} />

            </View>

        </ImageBackground>
    )
}

export default observer(GameScreen);

