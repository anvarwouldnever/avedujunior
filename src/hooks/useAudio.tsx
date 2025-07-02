import { useEffect, useRef, useState } from 'react';
import { Audio } from 'expo-av';

export const useAudio = () => {
    const soundRef = useRef<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const play = async (uri: string) => {
        try {
            if (soundRef.current) {
                await soundRef.current.unloadAsync();
                soundRef.current = null;
            }

            const { sound } = await Audio.Sound.createAsync(
                { uri },
                { shouldPlay: true }
            );

            soundRef.current = sound;
            setIsPlaying(true);

            sound.setOnPlaybackStatusUpdate((status) => {
                if (!status.isPlaying && status.didJustFinish) {
                    setIsPlaying(false);
                }
            });
        } catch (error) {
            console.warn('Ошибка воспроизведения аудио:', error);
        }
    };

    const stop = async () => {
        if (soundRef.current) {
            await soundRef.current.stopAsync();
            await soundRef.current.unloadAsync();
            soundRef.current = null;
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        return () => {
            if (soundRef.current) {
                soundRef.current.unloadAsync();
            }
        };
    }, []);

    return { play, stop, isPlaying };
};