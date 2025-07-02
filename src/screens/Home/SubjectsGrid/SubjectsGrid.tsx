import React from 'react';
import { View, Text, StyleSheet, Platform, useWindowDimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import {
    MaterialCommunityIcons,
    FontAwesome5,
    Entypo,
    FontAwesome,
    Ionicons,
    MaterialIcons,
  } from '@expo/vector-icons';
import { useScale } from '../../../hooks/useScale';
import { useNavigation } from '@react-navigation/native';
import { getSubjects } from './hooks/getSubjects';
import { Image } from 'expo-image';
import { observer } from 'mobx-react-lite';

// const subjects = [
//     {
//       id: '1',
//       name: 'Рисование',
//       color: '#4527A0',
//       icon: <MaterialCommunityIcons name="palette" size={32} color="#fff" />,
//     },
//     {
//       id: '2',
//       name: 'Конструирование',
//       color: '#29B6F6',
//       icon: <FontAwesome5 name="building" size={28} color="#fff" />,
//     },
//     {
//       id: '3',
//       name: 'Аппликация',
//       color: '#EC407A',
//       icon: <Entypo name='chevron-left' size={32} color="#fff" />,
//     },
//     {
//       id: '4',
//       name: 'Лепка',
//       color: '#4DD0E1',
//       icon: <MaterialCommunityIcons name="toy-brick" size={32} color="#fff" />,
//     },
//     {
//       id: '5',
//       name: 'Окружающий нас мир',
//       color: '#66BB6A',
//       icon: <FontAwesome name="globe" size={30} color="#fff" />,
//     },
//     {
//       id: '6',
//       name: 'Развитие речи',
//       color: '#FF7043',
//       icon: <MaterialIcons name="record-voice-over" size={32} color="#fff" />,
//     },
//     {
//       id: '7',
//       name: 'Основы науки и естествознания / экология',
//       color: '#3F51B5',
//       icon: <Ionicons name="flask" size={30} color="#fff" />,
//     },
//     {
//       id: '8',
//       name: 'Обучение грамоте',
//       color: '#81C784',
//       icon: <MaterialCommunityIcons name="alphabetical" size={32} color="#fff" />,
//     },
// ];

const SubjectsGrid = () => {

  const { s, vs } = useScale();
  const navigation = useNavigation()
  
  const cardSize = 150;
  const { width } = useWindowDimensions();
  const cardWidth = Platform.isPad ? vs(cardSize) : s(cardSize);

  const containerSize = width - (Platform.isPad? vs(40) : s(40));
  const columns = Math.floor(containerSize / cardWidth);
  const usedWidth = columns * cardWidth;
  const leftoverSpace = containerSize - usedWidth;
  const columnGap = columns > 1 ? leftoverSpace / (columns - 1) : 0;

  const { subjects, loading, error } = getSubjects()

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: vs(80) }}>
        <ActivityIndicator size="large" color="#6A5AE0" />
      </View>
    );
  }
  
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', marginVertical: vs(60) }}>
        <Text style={{ color: 'red', fontSize: s(15) }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, {columnGap: columnGap, rowGap: vs(15), justifyContent: leftoverSpace > (2.5 / 3 * cardSize)? 'center' : 'flex-start'}]}>
      {subjects?.map((item, index) => (
        <TouchableOpacity onPress={() => navigation.navigate('TasksList', {name: item?.name, id: item?.id})} key={index} style={[styles.card, { width: Platform.isPad? vs(cardSize) : s(cardSize), height: 'auto', backgroundColor: 'white', borderWidth: 1, borderColor: '#e2cef2'}]}>
            <View style={{width: '100%', height: Platform.isPad? vs(100) : s(100), backgroundColor: item.color, borderTopLeftRadius: 20, borderTopRightRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
              <Image source={{ uri: item?.image?.url }} contentFit='contain' style={{ width: s(40), height: vs(40) }} />
            </View>
            <View style={{backgroundColor: 'white', width: '100%', position: 'relative', minHeight: vs(40), borderBottomLeftRadius: 20, borderBottomRightRadius: 20, padding: vs(8)}}>
              <Text style={{fontSize: vs(12), fontWeight: '600', width: '100%', flexShrink: 1}}>{item?.name}</Text>
            </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 150,
    flexWrap: 'wrap',
  },
  card: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  label: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 13,
  },
});
  
export default observer(SubjectsGrid);
  