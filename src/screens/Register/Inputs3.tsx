import { View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useState } from 'react'
import translations from '../../../translations';
import { store } from '../../store/store';
import { useScale } from '../../hooks/useScale';
import { withTiming } from 'react-native-reanimated';
import PhoneAndCode from './Inputs3/PhoneAndCode';

const Inputs3 = ({ setErrorMessage, errorMessage, phone, setPhone, code, setCode, translateY, parentName, setParentName, parentSurname, setParentSurname, parentFathersName, setParentFathersName, parentWho, setParentWho, address, setAddress }) => {

    const { s, vs, isTablet } = useScale();

    const [isCodeCorrect, setIsCodeCorrect] = useState<boolean>(false)
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const [isCodeSent, setIsCodeSent] = useState<boolean>(false)

    return (
        <View style={{width: '100%', height: 'auto', gap: vs(15)}}>
            
            <View style={{gap: vs(10), width: '100%'}}>
                
                <Text style={{ fontSize: isTablet? vs(12) : s(12) }}>{ isCodeSent ? translations[store?.language]?.введитекод : translations[store?.language]?.введитеномер}</Text>
                
                <PhoneAndCode setisCodeCorrect={setIsCodeCorrect} isCodeSent={isCodeSent} setIsCodeSent={setIsCodeSent} code={code} setCode={setCode} phone={phone} setPhone={setPhone} setErrorMessage={setErrorMessage} isCodeCorrect={isCodeCorrect} errorMessage={errorMessage} />

                {errorMessage && <Text style={{ color: '#EB265D' }} >{errorMessage || ''}</Text>}

                { isCodeCorrect &&
                    <>
                        <View style={{gap: vs(10), width: '100%'}}>
                            
                            <Text style={{ fontSize: isTablet? vs(12) : s(12) }}>{translations[store?.language]?.фамилия}</Text>
                            
                            <TextInput 
                                style={{ backgroundColor: 'white', width: '100%', height: isTablet? vs(40) : s(40), borderRadius: 15, paddingHorizontal: 20, fontSize: isTablet? vs(12) : s(12), borderColor: errorMessage? '#EB265D' : 'white', borderWidth: 2 }}
                                placeholder={translations[store?.language]?.фамилия}
                                onChangeText={(text) => setParentSurname(text)}
                                autoCorrect={false}
                                onFocus={() => setErrorMessage(prev => (prev != null ? null : prev))}
                            />
                        </View>

                        <View style={{gap: vs(10), width: '100%'}}>
                            
                            <Text style={{ fontSize: isTablet? vs(12) : s(12) }}>{translations[store?.language]?.имя}</Text>
                            
                            <TextInput 
                                style={{ backgroundColor: 'white', width: '100%', height: isTablet? vs(40) : s(40), borderRadius: 15, paddingHorizontal: 20, fontSize: isTablet? vs(12) : s(12), borderColor: errorMessage? '#EB265D' : 'white', borderWidth: 2 }}
                                placeholder={translations[store?.language]?.имя}
                                onChangeText={(text) => setParentName(text)}
                                autoCorrect={false}
                                onFocus={() => setErrorMessage(prev => (prev != null ? null : prev))}
                            />

                        </View>

                        <View style={{gap: vs(10), width: '100%'}}>
                            
                            <Text style={{ fontSize: isTablet? vs(12) : s(12) }}>{translations[store?.language]?.отчество}</Text>
                            
                            <TextInput 
                                style={{ backgroundColor: 'white', width: '100%', height: isTablet? vs(40) : s(40), borderRadius: 15, paddingHorizontal: 20, fontSize: isTablet? vs(12) : s(12), borderColor: errorMessage? '#EB265D' : 'white', borderWidth: 2 }}
                                placeholder={translations[store?.language]?.отчество}
                                onChangeText={(text) => setParentFathersName(text)}
                                autoCorrect={false}
                                onFocus={() => {
                                    setErrorMessage(prev => (prev != null ? null : prev))
                                    translateY.value = withTiming(vs(-50), { duration: 300 })
                                }}
                                onBlur={() => {
                                    translateY.value = withTiming(0, { duration: 300 })
                                }}
                            /> 

                        </View>

                        <View style={{gap: vs(10), width: '100%'}}>
                            
                            <Text style={{ fontSize: isTablet? vs(12) : s(12) }}>{translations[store?.language]?.адрес}</Text>
                            
                            <TextInput 
                                style={{ backgroundColor: 'white', width: '100%', height: isTablet? vs(40) : s(40), borderRadius: 15, paddingHorizontal: 20, fontSize: isTablet? vs(12) : s(12), borderColor: errorMessage? '#EB265D' : 'white', borderWidth: 2 }}
                                placeholder={translations[store?.language]?.адрес}
                                onChangeText={(text) => setAddress(text)}
                                autoCorrect={false}
                                onFocus={() => {
                                    setErrorMessage(prev => (prev != null ? null : prev))
                                    translateY.value = withTiming(vs(-100), { duration: 300 })
                                }}
                                onBlur={() => {
                                    translateY.value = withTiming(0, { duration: 300 })
                                }}
                            /> 

                        </View>

                        <View style={{gap: vs(10), width: '100%'}}>
                            
                            <Text style={{ fontSize: isTablet? vs(12) : s(12) }}>{translations[store?.language]?.выберитеродителя}</Text>
                            
                            <TouchableOpacity onPress={() => {
                                Keyboard.dismiss()
                                setShowDropdown(!showDropdown)
                            }} style={{ backgroundColor: 'white', width: '100%', height: isTablet? vs(40) : s(40), borderRadius: 15, paddingHorizontal: 20, borderColor: errorMessage? '#EB265D' : 'white', borderWidth: 2, justifyContent: 'center' }}>
                                <Text style={{ fontSize: isTablet? vs(12) : s(12), color: !parentWho ? '#C7C7CD' : 'black' }}>{parentWho === '0' ? 'Мама' : 'Папа'}</Text>
                            </TouchableOpacity>

                            {showDropdown && (
                                <View style={{ position: 'absolute', zIndex: 1000, top: vs(75), width: '100%', backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: '#ccc', overflow: 'hidden' }}>
                                    {['Мама', 'Папа'].map((item, index) => (
                                        <TouchableOpacity key={item} style={{ padding: vs(10), backgroundColor: parentWho === index.toString() ? 'rgb(234, 244, 255)' : 'white' }}
                                            onPress={() => {
                                                setParentWho(index.toString());
                                                setShowDropdown(false);
                                            }}
                                        >
                                            <Text>{item}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}

                        </View>
                    </>
                }

            </View>

        </View>
    )
};

export default Inputs3