import React from 'react';
import { View, Text, StyleSheet, Platform, useWindowDimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useScale } from '../../../hooks/useScale';
import { useNavigation } from '@react-navigation/native';
import { getSubjects } from './hooks/getSubjects';
import { Image } from 'expo-image';
import { observer } from 'mobx-react-lite';

const SubjectsGrid = () => {

  const { s, vs } = useScale();
  const navigation = useNavigation()
  
  const cardSize = 150;
  const { width } = useWindowDimensions();
  const padding = Platform.isPad? vs(60) : s(40);
  const containerSize = width - padding;

  const columns = Platform.isPad ? 3 : Math.floor(containerSize / s(cardSize));

  const totalGap = vs(20) * (columns - 1);
  const cardWidth = Platform.isPad? (containerSize - totalGap) / columns : s(cardSize);
  
  const usedWidth = columns * cardWidth;
  const leftoverSpace = containerSize - usedWidth;
  const columnGap = Platform.isPad ? vs(30) : columns > 1 ? leftoverSpace / (columns - 1) : 0; 

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
    <View style={[styles.container, {columnGap: columnGap, rowGap: vs(15), justifyContent: 'flex-start'}]}>
      {subjects?.map((item, index) => (
        <TouchableOpacity onPress={() => navigation.navigate('TasksList', {name: item?.name, id: item?.id, key: Date.now()})} key={index} style={[styles.card, { width: cardWidth, height: 'auto', backgroundColor: 'white', borderWidth: 1, borderColor: '#e2cef2'}]}>
            <View style={{width: '100%', height: Platform.isPad? vs(130) : s(100), backgroundColor: item.color, borderTopLeftRadius: 20, borderTopRightRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
              <Image source={{ uri: item?.image?.url }} contentFit='contain' style={{ width: s(60), height: vs(60) }} />
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
  