import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useScale } from '../../hooks/useScale';
import { Ionicons } from '@expo/vector-icons';

const GameNumberList = ({ setChosenGame, chosenGame, games }) => {

    const { s, vs } = useScale()

    const [atTop, setAtTop] = useState<boolean>(true);
    const [atBottom, setAtBottom] = useState<boolean>(false);
    const [scrollable, setScrollable] = useState<boolean>(false);
    const [containerHeight, setContainerHeight] = useState<number>(0);

    const handleScroll = (event: { nativeEvent: { contentOffset: any; layoutMeasurement: any; contentSize: any; }; }) => {
        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;

        setScrollable(contentSize.height > layoutMeasurement.height);

        if (contentOffset.y <= 1) {
            setAtTop(true);
            setAtBottom(false);
        } 
        else if (contentOffset.y + layoutMeasurement.height >= contentSize.height - 1) {
            setAtBottom(true);
            setAtTop(false);
        } 
        else {
            setAtTop(false);
            setAtBottom(false);
        }
    };
    
    return (
        <View style={{width: '15%', borderWidth: 2, borderColor: '#EFEEFC', backgroundColor: 'white', borderRadius: 20, padding: s(5) }}>
            
            <ScrollView onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)} onContentSizeChange={(contentWidth, contentHeight) => {setScrollable(contentHeight > containerHeight)}} onScroll={handleScroll} scrollEventThrottle={16} showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: s(8) }}>
                {games?.map((game: any, index: number) => {
                    return (
                        <TouchableOpacity onPress={() => setChosenGame(index + 1)} style={{width: '100%', borderWidth: 2, height: s(35), backgroundColor: chosenGame === index + 1? "#6A5AE0" : game?.passed === 1? "#6DDC44" : "white", borderColor: chosenGame === index + 1? '#553EFB' : game?.passed === 1? "#30AB02" : '#EFEEFC', borderRadius: 10, alignItems: 'center', justifyContent: 'center'}} key={index}>
                            <Text style={{fontWeight: '600', fontSize: s(12), color: chosenGame === index + 1 || game?.passed === 1? 'white' : 'black'}}>{index + 1}</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>

            {scrollable && atTop && (
                <Ionicons style={{ position: 'absolute', bottom: 0, alignSelf: 'center' }} name='chevron-down' size={vs(30)} color={'#6A5AE0'}/>
            )}

            {scrollable && atBottom && (
                <Ionicons style={{ position: 'absolute', top: 0, alignSelf: 'center' }} name='chevron-up' size={vs(30)} color={'#6A5AE0'} />
            )}

        </View>
    )
}

export default GameNumberList;