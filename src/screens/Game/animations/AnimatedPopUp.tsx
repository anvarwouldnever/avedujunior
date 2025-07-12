import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, FadeOut } from 'react-native-reanimated';
import { useScale } from '../../../hooks/useScale';

interface AnimatedPopUpProps {
    popUp: boolean;
    passed: number;
    setPopUp: (val: boolean) => void;
}

const AnimatedPopUp: React.FC<AnimatedPopUpProps> = ({ popUp, passed, setPopUp }) => {
    const { s } = useScale();
    const [text, setText] = useState('');

    const opacity = useSharedValue(0);
    const translateY = useSharedValue(20);

    const failurePhrases = [
        'Нет ничего невозможного. Сделай еще одну попытку',
        'Давай попробуем еще раз',
        'Ты уже прошел большой путь. Не сдавайся. Попробуй еще раз',
        'Попробуй еще раз и у тебя получится',
    ];

    const successPhrases = [
        'У тебя получилось!',
        'Превосходно!',
        'Молодец!',
        'Фантастика!',
        'Это твоя победа!',
        'Поздравляю тебя с успехом!',
        'Ты на верном пути!',
    ];

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (popUp) {
            const phrases = passed === 1 ? successPhrases : failurePhrases;
            const randomIndex = Math.floor(Math.random() * phrases.length);
            setText(phrases[randomIndex]);

            opacity.value = withTiming(1, { duration: 500 });
            translateY.value = withTiming(0, { duration: 300 });

            timeout = setTimeout(() => {
                setPopUp(false);
            }, 1500);
        }

        return () => clearTimeout(timeout);
    }, [popUp, passed]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));

    if (!popUp && opacity.value === 0) return null;

    return (
        <Animated.View
            exiting={FadeOut.duration(300)}
            style={[{
                position: 'absolute',
                alignSelf: 'center',
                backgroundColor: passed === 1 ? 'green' : '#FFD600',
                borderRadius: 15,
                paddingHorizontal: 15,
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
            }, animatedStyle]}
        >
            <Text style={{ fontSize: s(7), color: 'white', fontWeight: '800', textAlign: 'center' }}>{text}</Text>
        </Animated.View>
    );
};

export default AnimatedPopUp;
