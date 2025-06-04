import { View, Text, ImageBackground, ScrollView, Platform, TouchableOpacity, SafeAreaView, Image, InteractionManager } from 'react-native'
import React, { useCallback, useState, useRef } from 'react'
import { useScale } from '../hooks/useScale'
import { bgAssets } from '../components/BgAssets'
import { store } from '../store/store'
import { observer } from 'mobx-react-lite'
import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import * as ScreenOrientation from 'expo-screen-orientation'
import GameNumberList from './Game/GameNumberList'
import ObjectMatchingGame from './Game/ObjectMatchingGame'
import Svg, { Line, Path } from 'react-native-svg';
import Animated, { useAnimatedProps, useSharedValue } from 'react-native-reanimated';

const AnimatedLine = Animated.createAnimatedComponent(Line);

const GameScreen = ({ route }) => {

    const NameAndTopic = () => {
        return (
            <View style={{ gap: s(7) }}>
                <Text style={{ color: 'grey', fontWeight: 'bold' }}>{route?.params?.name}</Text>
                <Text style={{ color: 'black', fontWeight: '600', fontSize: vs(18)}}>Тема: {route?.params?.topic}</Text>
            </View>
        )
    }

    const navigation = useNavigation()

    const lineStartX = useSharedValue(0);
    const lineStartY = useSharedValue(0);
    const lineEndX = useSharedValue(0);
    const lineEndY = useSharedValue(0);
    const [lines, setLines] = useState([]);

    const Lines = () => {
        const arrowLength = 10; // длина стрелки
    
        const getArrowLines = (x1, y1, x2, y2) => {
            const dx = x2 - x1;
            const dy = y2 - y1;
            const angle = Math.atan2(dy, dx);
    
            const angle1 = angle - Math.PI / 6;
            const angle2 = angle + Math.PI / 6;
    
            const arrow1 = {
                x1: x2,
                y1: y2,
                x2: x2 - arrowLength * Math.cos(angle1),
                y2: y2 - arrowLength * Math.sin(angle1),
            };
    
            const arrow2 = {
                x1: x2,
                y1: y2,
                x2: x2 - arrowLength * Math.cos(angle2),
                y2: y2 - arrowLength * Math.sin(angle2),
            };
    
            return [arrow1, arrow2];
        };
    
        return (
            <Svg
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                }}
            >
                {lines.map((line, index) => {
                    const [arrow1, arrow2] = getArrowLines(line.x1, line.y1, line.x2, line.y2);
    
                    return (
                        <React.Fragment key={index}>
                            <Line
                                x1={line.x1}
                                y1={line.y1}
                                x2={line.x2}
                                y2={line.y2}
                                stroke={line.color || "#504297"}
                                strokeWidth={2}
                            />
                            <Line
                                x1={arrow1.x1}
                                y1={arrow1.y1}
                                x2={arrow1.x2}
                                y2={arrow1.y2}
                                stroke={line.color || "#504297"}
                                strokeWidth={2}
                            />
                            <Line
                                x1={arrow2.x1}
                                y1={arrow2.y1}
                                x2={arrow2.x2}
                                y2={arrow2.y2}
                                stroke={line.color || "#504297"}
                                strokeWidth={2}
                            />
                        </React.Fragment>
                    );
                })}
            </Svg>
        );
    };    

    const DrawingLine = () => {
        const arrowLength = 10; // длина стрелки
    
        const animatedArrow1 = useAnimatedProps(() => {
            const dx = lineEndX.value - lineStartX.value;
            const dy = lineEndY.value - lineStartY.value;
            const angle = Math.atan2(dy, dx);
            const arrowAngle1 = angle - Math.PI / 6; // -30 градусов
    
            return {
                x1: lineEndX.value,
                y1: lineEndY.value,
                x2: lineEndX.value - arrowLength * Math.cos(arrowAngle1),
                y2: lineEndY.value - arrowLength * Math.sin(arrowAngle1),
            };
        });
    
        const animatedArrow2 = useAnimatedProps(() => {
            const dx = lineEndX.value - lineStartX.value;
            const dy = lineEndY.value - lineStartY.value;
            const angle = Math.atan2(dy, dx);
            const arrowAngle2 = angle + Math.PI / 6; // +30 градусов
    
            return {
                x1: lineEndX.value,
                y1: lineEndY.value,
                x2: lineEndX.value - arrowLength * Math.cos(arrowAngle2),
                y2: lineEndY.value - arrowLength * Math.sin(arrowAngle2),
            };
        });
    
        return (
            <Svg
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                }}
            >
                <AnimatedLine animatedProps={animatedProps} stroke="#504297" strokeWidth="2" />
                <AnimatedLine animatedProps={animatedArrow1} stroke="#504297" strokeWidth="2" />
                <AnimatedLine animatedProps={animatedArrow2} stroke="#504297" strokeWidth="2" />
            </Svg>
        );
    };

    const animatedProps = useAnimatedProps(() => ({
        x1: lineStartX.value,
        y1: lineStartY.value,
        x2: lineEndX.value,
        y2: lineEndY.value,
    }));
    
    const BackupView = () => {
        return (
            <View style={{width: '82%', height: '100%', borderWidth: 2, borderColor: '#EFEEFC', backgroundColor: 'white', padding: s(5), borderRadius: 20, gap: vs(25), justifyContent: 'space-between'}}>   
                
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999, pointerEvents: 'none' }}>
                    <DrawingLine />
                    <Lines />
                </View>
                
                <View style={{flexDirection: 'row', justifyContent: 'space-between', height: '12%'}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '65%', justifyContent: 'space-between', gap: s(5) }}>
                        <View style={{ backgroundColor: '#B390EF', width: s(15), height: s(15), borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>  
                            <Ionicons name='volume-high' color={'white'} size={s(10)} />
                        </View>
                        <Text adjustsFontSizeToFit style={{ fontSize: Platform.isPad? vs(6) : s(6), fontWeight: '600', width: '90%'}}>Отметьте, кто сидит во втором вагончике справа</Text>
                    </View>

                    <TouchableOpacity onPress={() => navigation.goBack()} style={{width: '15%', borderWidth: 2, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderColor: '#EFEEFC', borderRadius: 10}}>
                        <Ionicons name='chevron-back' color={'#6A5ADE'} size={s(10)} />
                        <Text style={{ fontWeight: '600', color: '#6A5ADE' }}>Назад</Text>
                    </TouchableOpacity>
                </View>
                    
                <ObjectMatchingGame lineEndX={lineEndX} lineEndY={lineEndY} lineStartX={lineStartX} lineStartY={lineStartY} setLines={setLines}/>

                <View style={{ height: vs(75), width: '60%', alignSelf: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <TouchableOpacity style={{ width: '15%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF40572B', borderRadius: 10 }}>
                        <Ionicons name='chevron-back' color={'red'} size={20}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setLines([])} style={{width: '60%', backgroundColor: '#EFF8FF', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: '#2097EF', fontWeight: '600'}}>Проверить ответ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: '15%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0EAF0021', borderRadius: 10 }}>
                        <Ionicons name='chevron-forward' color={'green'} size={20}/>
                    </TouchableOpacity>
                </View>
                
            </View>
        )
    }

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
                <BackupView />
                <GameNumberList />
            </View>
        </ImageBackground>
    )
}

export default observer(GameScreen);

