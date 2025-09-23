import React, { useEffect, useState } from 'react';
import { Platform, Text, View } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { useScale } from '../../../hooks/useScale';
import LottieView from 'lottie-react-native';
import { store } from '../../../store/store';
import { useAudio } from '../../../hooks/useAudio';

interface AnimatedPopUpProps {
    popUp: boolean;
    passed: number;
    setPopUp: (val: boolean) => void;
    gameType: number;
    answers: Array<any>;
    chosenOptions: Array<any>;
}

const AnimatedPopUp: React.FC<AnimatedPopUpProps> = ({ popUp, passed, setPopUp, gameType, answers, chosenOptions }) => {

    const { s, vs, isTablet } = useScale();
    const [text, setText] = useState('');

    const opacity = useSharedValue(0);
    const translateY = useSharedValue(20);

    const { play } = useAudio();

    const failurePhrases = [
        store?.labels?.tryAgain,
        store?.labels?.tryAgainYouCanDoIt,
        store?.labels?.thinkAgain,
        store?.labels?.youveComeALongWayDontGiveUp,
        store?.labels?.nothingIsImpossibleTryAgain,
    ];

    const successPhrases = [
        store?.labels?.success,
        store?.labels?.excellent,
        store?.labels?.great,
        store?.labels?.wellDone,
        store?.labels?.wellDone,
        store?.labels?.justWhatIsNeeded,
        store?.labels?.fantastic,
        store?.labels?.perfect,
        store?.labels?.yourSuccessesAreVisible,
        store?.labels?.thisIsYourVictory,
        store?.labels?.youDidIt,
        store?.labels?.youAreOnTheRightTrack,
        store?.labels?.youAreOnTheCorrectPath,
        store?.labels?.wonderful,
        store?.labels?.congratulationsOnSuccess,
        store?.labels?.quickLearner,
        store?.labels?.wellDoneYouSucceeded,
        store?.labels?.excellentResult,
    ];

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (popUp) {

            passed === 1 ? play(require('../../../../assets/correct.mp3')) : play(require('../../../../assets/wrong.mp3'));

            let message: string | undefined;
            
            if (passed === 1) {
                const randomIndex = Math.floor(Math.random() * successPhrases.length);
                message = successPhrases[randomIndex];
            } else if (!chosenOptions?.length) {
                message = 'Укажите ответ';
            } else if (gameType === 1 || gameType === 2) {
                if (chosenOptions.length === 0) {
                    message = 'Укажите ответ';
                } else if (chosenOptions.length < answers.length) {
                    message = 'Укажите все ответы';
                }
            } else if (gameType === 3 && chosenOptions.length !== 4) {
                message = 'Укажите все ответы';
            } else if (gameType === 6) {
                if (chosenOptions.length !== 4) {
                    message = 'Укажите все ответы';
                } else {
                    const allImgsNull = chosenOptions.every(el => el.img === null);
                    if (allImgsNull) {
                        message = 'Укажите ответ';
                    } else {
                        const hasAllKeys = chosenOptions.every(el => {
                            const match = el.key?.match(/\d+$/);
                            return match && !isNaN(parseInt(match[0], 10));
                        });
                        if (!hasAllKeys) {
                            message = 'Укажите все ответы';
                        }
                    }
                }
            }
            
            if (!message) {
                const randomIndex = Math.floor(Math.random() * failurePhrases.length);
                message = failurePhrases[randomIndex];
            }
            
            setText(message);      

            opacity.value = withTiming(1, { duration: 500 });
            translateY.value = withTiming(0, { duration: 300 });

            timeout = setTimeout(() => {
                setPopUp(false);
            }, 1500);
        }

        return () => clearTimeout(timeout)
    }, [popUp]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));

    if (!popUp && opacity.value === 0) return null;

    return (
        <View pointerEvents="none" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', zIndex: 1000 }}>
            
            {passed === 1 && 
                <LottieView
                    autoPlay
                    loop={false}
                    source={require('../../../../lotties/congratul.json')}
                    style={{
                        position: 'absolute',
                        alignSelf: 'center',
                        width: vs(800),
                        height: vs(800),
                    }}
                />
            }
            
            <Animated.View
                style={[{
                    alignSelf: 'center',
                    position: 'absolute',
                    backgroundColor: passed === 1 ? 'green' : '#FFD600',
                    borderRadius: 15,
                    padding: vs(40),
                    justifyContent: 'center',
                    alignItems: 'center',
                }, animatedStyle]}
            >
                <Text style={{ fontSize: isTablet ? s(8) : s(7), color: 'white', fontWeight: '800', textAlign: 'center' }}>{text}</Text>
            </Animated.View>
        
        </View>
    );
};

export default AnimatedPopUp;
