import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useScale } from '../../hooks/useScale';

const GameNumberList = () => {

    const [chosenNumber, setChosenNumber] = useState(1);
    const { s, vs } = useScale()
    
    return (
        <View style={{width: '15%', borderWidth: 2, borderColor: '#EFEEFC', backgroundColor: 'white', borderRadius: 20, padding: s(5) }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: s(5) }}>
                {[1, 2, 3, 4, 5, 6, 7].map((number, index) => {
                    return (
                        <TouchableOpacity onPress={() => setChosenNumber(number)} style={{width: '100%', borderWidth: 2, height: vs(150), backgroundColor: chosenNumber === number? "#6A5AE0" : "white", borderColor: chosenNumber === number? '#553EFB' : '#EFEEFC', borderRadius: 10, alignItems: 'center', justifyContent: 'center'}} key={index}>
                            <Text style={{fontWeight: '600', fontSize: s(12), color: chosenNumber === number? 'white' : 'black'}}>{number}</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default GameNumberList;