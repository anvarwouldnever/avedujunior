import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useScale } from '../hooks/useScale';

const TestScreen = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const { s, vs } = useScale()
  const [selectedImage, setSelectedImage] = useState<string>(null);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                    <View style={{width: s(100), height: vs(150), backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
                        <TouchableOpacity style={{ zIndex: 2, width: s(15), height: vs(70), position: 'absolute', left: 5, top: 5, alignItems: 'center', justifyContent: 'center'}}>
                            <Ionicons name='close-circle-outline' size={vs(70)}/>
                        </TouchableOpacity>
                        {selectedImage && (
                            <Image 
                                style={{ width: s(150), height: vs(450) }} 
                                source={selectedImage} 
                            />
                        )}
                    </View>
            </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default TestScreen;