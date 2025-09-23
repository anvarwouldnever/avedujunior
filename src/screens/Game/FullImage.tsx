import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useScale } from '../../hooks/useScale'
import Modal from 'react-native-modal'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'

const FullImage = ({ setFullImage, selectedImage, fullImage}) => {

    const { s, vs } = useScale()

    return (
        <Modal backdropTransitionOutTiming={1} animationInTiming={300} backdropTransitionInTiming={1} backdropOpacity={0.1} onBackdropPress={() => setFullImage(false)} isVisible={fullImage} style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', left: s(80), top: vs(45)}}>
            
            <View style={{width: s(150), height: vs(500), backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 10, alignSelf: 'center', borderWidth: 2, borderColor: '#e2cef2'}}>
                
                <TouchableOpacity onPress={() => setFullImage(false)} style={{ zIndex: 2, width: vs(70), height: vs(70), position: 'absolute', left: 5, top: 5, alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}}>
                    
                    <Ionicons name='close-circle-outline' size={vs(70)}/>
                    
                </TouchableOpacity>

                {selectedImage && (
                    <Image 
                        style={{ width: s(100), height: vs(450)}} 
                        source={selectedImage} 
                        contentFit='contain' 
                    />
                )}
                
            </View>

        </Modal>
    )
}

export default FullImage;