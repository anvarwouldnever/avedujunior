import { View, Text, Platform, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import ObjectMatchingGame from './ObjectMatching/ObjectMatchingGame'
import LinesAndDrawingParent from './ObjectMatching/LinesAndDrawingParent'
import { useScale } from '../../hooks/useScale'
import { useNavigation } from '@react-navigation/native'
import Animated, { useSharedValue } from 'react-native-reanimated'
import DragAndDropGame from './DragAndDrop/DragAndDropGame'
import SimpleGame from './SimpleGame/SimpleGame'
import WithImageGame from './WithImageGame/WithImageGame'
import { useAudio } from '../../hooks/useAudio'
import { AnswerCorrect } from '../../api/methods/answer/correct'
import { AnswerWrong } from '../../api/methods/answer/wrong'
import AnimatedPopUp from './animations/AnimatedPopUp'
import AllPassedView from './GameView/AllPassedView'

const GameView = ({ setFullImage, setSelectedImage, game, setChosenGame, chosenGame, markGameAsPassed, games, tasksId, name}) => {

    const { s, vs } = useScale()
    const { play, stop, isPlaying } = useAudio();

    const navigation = useNavigation();

    const [popUp, setPopUp] = useState<boolean>(false);
    const [playingIndex, setPlayingIndex] = useState<number | null>(null);
    const [chosenOptions, setChosenOptions] = useState<Array<string>>([]);

    const lineStartX = useSharedValue(0);
    const lineStartY = useSharedValue(0);
    const lineEndX = useSharedValue(0);
    const lineEndY = useSharedValue(0);
    const [lines, setLines] = useState([]);

    const question = game?.question?.question;
    const content = game?.question?.options;
    const audio = game?.question?.question_audio;
    const questionImage = game?.question?.question_image;
    const passed = game?.passed;
    const answers = game?.answer;

    useEffect(() => {
        setPopUp(false);
        setChosenOptions([]);
        setLines([]);
        setPlayingIndex(null);
        stop();
    }, [chosenGame]);

    const checkAnswer = async (a: any[], b: any[], gameType: number) => {
        const gameId = game?.id;
        if (!gameId) return;
    
        const handleCorrect = async () => {
            const answer = await AnswerCorrect(gameId);
            console.log(answer?.status);
            const nextUnpassedIndex = await markGameAsPassed(gameId);
            setPopUp(true)

            if (nextUnpassedIndex !== -1) {
                setTimeout(() => {
                    setChosenGame(nextUnpassedIndex + 1);
                }, 2000);
            } else {
                setTimeout(() => {
                    setChosenGame(-1);
                }, 2000);
            }
        };
    
        const handleWrong = async () => {
            const answer = await AnswerWrong(gameId);
            console.log(answer?.status);
            setPopUp(true)
        };
    
        if (gameType === 6) {
            if (a.length !== 4) return setPopUp(true);
    
            const hasAllKeys = a.every(el => {
                const match = el.key?.match(/\d+$/);
                return match && !isNaN(parseInt(match[0], 10));
            });
            if (!hasAllKeys) return setPopUp(true);
    
            const correct = a.every(el => {
                const match = el.key?.match(/\d+$/);
                const keyNumber = match ? parseInt(match[0], 10) : NaN;
                return el.index === keyNumber;
            });
    
            console.log(correct);
            return correct ? await handleCorrect() : await handleWrong();
        }
    
        if (gameType === 3) {
            const isAnswer = chosenOptions.length === 4;
            if (!isAnswer) return setPopUp(true);
    
            const correct = chosenOptions.every(({ fromKey, toKey }) => fromKey === toKey);
            console.log(correct);
            return correct ? await handleCorrect() : await handleWrong();
        }
    
        if (gameType === 1 || gameType === 2) {
            if (a?.length !== b?.length) return setPopUp(true);
    
            const sortedA = [...a].sort();
            const sortedB = [...b].sort();
            const correct = sortedA.every((val, index) => val === sortedB[index]);

            if (correct) {
                await handleCorrect();
                setChosenOptions([]);
            } else {
                await handleWrong();
            }
    
            return;
        }
    };
    
    return (
        <View style={{width: '82%', height: '100%', borderWidth: 2, borderColor: '#EFEEFC', backgroundColor: 'white', padding: vs(25), borderRadius: 20, gap: s(5), justifyContent: 'space-between'}}>   
            {chosenGame !== -1 && 
                <View style={{flexDirection: 'row', justifyContent: 'space-between', height: s(20)}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '75%', justifyContent: 'space-between', gap: s(5), height: s(23) }}>
                        <View style={{ backgroundColor: '#B390EF', width: s(15), height: s(15), borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>  
                            <Ionicons onPress={() => { 
                                if (playingIndex === 21) { 
                                    stop(); 
                                    setPlayingIndex(null);
                                } else {
                                    play(audio);
                                    setPlayingIndex(21);
                                } 
                            }} name={isPlaying && playingIndex === 21? 'pause' : 'volume-high'} color={'white'} size={s(10)}/>
                        </View>
                        <Text adjustsFontSizeToFit style={{ fontSize: Platform.isPad? vs(20) : s(6), fontWeight: '600', width: '90%'}}>{question}</Text>
                    </View>

                    <TouchableOpacity onPress={() => navigation.goBack()} style={{width: '15%', borderWidth: 2, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderColor: '#EFEEFC', borderRadius: 10, gap: vs(5)}}>
                        <Ionicons name='chevron-back' color={'#6A5ADE'} size={s(10)} />
                        <Text style={{ fontWeight: '600', color: '#6A5ADE', fontSize: Platform.isPad? vs(20) : s(7)}}>Назад</Text>
                    </TouchableOpacity>
                </View>
            }
            
            {
                chosenGame === -1 ? 
                    <AllPassedView tasksId={tasksId} name={name} />
                : 
                    game?.type === 3 ? 
                        <>
                            <LinesAndDrawingParent passed={passed} lineEndX={lineEndX} lineEndY={lineEndY} lineStartX={lineStartX} lineStartY={lineStartY} lines={lines} />
                            <ObjectMatchingGame playingIndex={playingIndex} setPlayingIndex={setPlayingIndex} play={play} stop={stop} isPlaying={isPlaying} answers={answers} passed={passed} setChosenOptions={setChosenOptions} content={content} setFullImage={setFullImage} setSelectedImage={setSelectedImage} lineEndX={lineEndX} lineEndY={lineEndY} lineStartX={lineStartX} lineStartY={lineStartY} setLines={setLines}/>
                        </>
                    : 
                    game?.type === 6 ? 
                        <DragAndDropGame answers={answers} passed={passed} setChosenOptions={setChosenOptions} key={chosenGame} playingIndex={playingIndex} setPlayingIndex={setPlayingIndex} play={play} stop={stop} isPlaying={isPlaying} content={content} setFullImage={setFullImage} setSelectedImage={setSelectedImage} />
                    :
                    (game?.type === 1 && !questionImage) || (game?.type === 2 && !questionImage) ?
                        <SimpleGame answers={answers} passed={passed} content={content} chosenOptions={chosenOptions} setChosenOptions={setChosenOptions} gameType={game?.type} playingIndex={playingIndex} setPlayingIndex={setPlayingIndex} play={play} stop={stop} isPlaying={isPlaying} setFullImage={setFullImage} setSelectedImage={setSelectedImage} /> 
                    :
                    (game?.type === 1 && questionImage) || (game?.type === 2 && questionImage) ? (
                        <WithImageGame answers={answers} passed={passed} questionImage={questionImage} content={content} chosenOptions={chosenOptions} setChosenOptions={setChosenOptions} gameType={game?.type} playingIndex={playingIndex} setPlayingIndex={setPlayingIndex} play={play} stop={stop} isPlaying={isPlaying} setFullImage={setFullImage} setSelectedImage={setSelectedImage} />)   
                    : 
                        null
            }
            
            {   
                popUp 
            &&   
                <AnimatedPopUp setPopUp={setPopUp} popUp={popUp} passed={passed}/>
            }

            {chosenGame !== -1 && 
                <View style={{ height: s(20), width: '60%', alignSelf: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => { if (chosenGame > 1) {setChosenGame(chosenGame - 1)} else { setChosenGame(games.length) }}} style={{ width: '15%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF40572B', borderRadius: 10 }}>
                        <Ionicons name='chevron-back' color={'red'} size={20}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={passed === 1 ? () => {return} : () => checkAnswer(chosenOptions, answers, game?.type)} style={{width: '60%', backgroundColor: passed === 1? "lightgrey" : '#EFF8FF', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: passed === 1? "#0C092A" : '#2097EF', fontWeight: '600', fontSize: Platform.isPad? vs(20) : s(6)}}>Ответить</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { if (chosenGame < games.length) {setChosenGame(chosenGame + 1)} else {setChosenGame(1)}}} style={{ width: '15%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0EAF0021', borderRadius: 10 }}>
                        <Ionicons name='chevron-forward' color={'green'} size={20}/>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

export default GameView;