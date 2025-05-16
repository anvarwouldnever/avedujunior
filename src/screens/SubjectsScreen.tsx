import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const SubjectsScreen = () => {

    const navigation = useNavigation()

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text>SubjectsScreen</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SubjectsScreen;