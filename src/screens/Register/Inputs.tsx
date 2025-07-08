import { View, Text, TextInput, Platform } from 'react-native'
import React from 'react'
import { useScale } from '../../hooks/useScale'

const Inputs = ({ setSurname, setName, setFathersName, setBirthdate, setErrorMessage, setHomeAddress, errorMessage }) => {

    const { s, vs } = useScale()

    return (
        <View style={{width: '100%', height: 'auto', gap: vs(15)}}>
            <View style={{gap: vs(10), width: '100%'}}>
                <Text style={{ fontSize: Platform.isPad? vs(12) : s(12) }}>Фамилия</Text>
                <TextInput 
                    style={{ backgroundColor: 'white', width: '100%', height: Platform.isPad? vs(40) : s(40), borderRadius: 15, paddingHorizontal: 20, fontSize: Platform.isPad? vs(12) : s(12), borderColor: errorMessage? '#EB265D' : 'white', borderWidth: 2 }}
                    placeholder={`Фамилия`}
                    onChangeText={(text) => setSurname(text)}
                    autoCorrect={false}
                    onFocus={() => setErrorMessage(prev => (prev != null ? null : prev))}
                />
            </View>

            <View style={{gap: vs(10), width: '100%'}}>
                <Text style={{ fontSize: Platform.isPad? vs(12) : s(12) }}>Имя</Text>
                <TextInput 
                    style={{ backgroundColor: 'white', width: '100%', height: Platform.isPad? vs(40) : s(40), borderRadius: 15, paddingHorizontal: 20, fontSize: Platform.isPad? vs(12) : s(12), borderColor: errorMessage? '#EB265D' : 'white', borderWidth: 2 }}
                    placeholder={`Имя`}
                    onChangeText={(text) => setName(text)}
                    autoCorrect={false}
                    onFocus={() => setErrorMessage(prev => (prev != null ? null : prev))}
                />
            </View>

            <View style={{gap: vs(10), width: '100%'}}>
                <Text style={{ fontSize: Platform.isPad? vs(12) : s(12) }}>Отчество</Text>
                <TextInput 
                    style={{ backgroundColor: 'white', width: '100%', height: Platform.isPad? vs(40) : s(40), borderRadius: 15, paddingHorizontal: 20, fontSize: Platform.isPad? vs(12) : s(12), borderColor: errorMessage? '#EB265D' : 'white', borderWidth: 2 }}
                    placeholder={`Отчество`}
                    onChangeText={(text) => setFathersName(text)}
                    autoCorrect={false}
                    onFocus={() => setErrorMessage(prev => (prev != null ? null : prev))}
                /> 
            </View>

            <View style={{gap: vs(10), width: '100%'}}>
                <Text style={{ fontSize: Platform.isPad? vs(12) : s(12) }}>Дата рождения</Text>
                <TextInput 
                    style={{ backgroundColor: 'white', width: '100%', height: Platform.isPad? vs(40) : s(40), borderRadius: 15, paddingHorizontal: 20, fontSize: Platform.isPad? vs(12) : s(12), borderColor: errorMessage? '#EB265D' : 'white', borderWidth: 2 }}
                    placeholder={`дд.мм.гггг`}
                    onChangeText={(text) => setBirthdate(text)}
                    autoCorrect={false}
                    onFocus={() => setErrorMessage(prev => (prev != null ? null : prev))}
                /> 
            </View>

            <View style={{gap: vs(10), width: '100%'}}>
                <Text style={{ fontSize: Platform.isPad? vs(12) : s(12) }}>Домашний адрес</Text>
                <TextInput 
                    style={{ backgroundColor: 'white', width: '100%', height: Platform.isPad? vs(40) : s(40), borderRadius: 15, paddingHorizontal: 20, fontSize: Platform.isPad? vs(12) : s(12), borderColor: errorMessage? '#EB265D' : 'white', borderWidth: 2 }}
                    placeholder={`Домашний адрес`}
                    onChangeText={(text) => setHomeAddress(text)}
                    autoCorrect={false}
                    onFocus={() => setErrorMessage(prev => (prev != null ? null : prev))}
                /> 
            </View>
        </View>
    )
}

export default Inputs;