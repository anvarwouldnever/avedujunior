import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { useScale } from '../../../hooks/useScale';
import translations from '../../../../translations';
import { store } from '../../../store/store';

const Header = ({ playingIndex, setPlayingIndex, isPlaying, play, audio, question, stop }) => {

    const { s, vs, isTablet } = useScale()

    const navigation = useNavigation();

    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between', minHeight: s(20), maxHeight: s(35), alignItems: 'center' }}>
                    
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%', justifyContent: 'space-between', gap: s(5), height: '100%' }}>
                
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
                
                <Text ellipsizeMode='tail' numberOfLines={isTablet ? 5 : 3} style={{ fontSize: s(6), fontWeight: '600', width: '90%'}}>{question}</Text>
            
            </View>

            <TouchableOpacity onPress={() => navigation.goBack()} style={{width: '15%', borderWidth: 2, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderColor: '#EFEEFC', borderRadius: 10, gap: vs(5), height: '100%', maxHeight: s(20)}}>
                
                <Ionicons name='chevron-back' color={'#6A5ADE'} size={s(10)} />
                
                <Text style={{ fontWeight: '600', color: '#6A5ADE', fontSize: isTablet? vs(20) : s(7)}}>{store.labels?.back || translations[store.language].назад}</Text>
            
            </TouchableOpacity>

        </View>
    )
}

export default Header;