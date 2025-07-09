import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useScale } from '../../hooks/useScale';

const GameNumberList = ({ setChosenGame, chosenGame, games }) => {

    const { s, vs } = useScale()
    
    return (
        <View style={{width: '15%', borderWidth: 2, borderColor: '#EFEEFC', backgroundColor: 'white', borderRadius: 20, padding: s(5) }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: s(8) }}>
                {games?.map((game, index) => {
                    return (
                        <TouchableOpacity onPress={() => setChosenGame(index + 1)} style={{width: '100%', borderWidth: 2, height: s(35), backgroundColor: chosenGame === index + 1? "#6A5AE0" : game?.passed === 1? "#6DDC44" : "white", borderColor: chosenGame === index + 1? '#553EFB' : game?.passed === 1? "#30AB02" : '#EFEEFC', borderRadius: 10, alignItems: 'center', justifyContent: 'center'}} key={index}>
                            <Text style={{fontWeight: '600', fontSize: s(12), color: chosenGame === index + 1 || game?.passed === 1? 'white' : 'black'}}>{index + 1}</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default GameNumberList;