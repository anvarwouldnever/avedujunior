import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { useScale } from '../../../hooks/useScale';
import { getDocs } from './hooks/getDocs';
import * as Linking from 'expo-linking';
import { useNavigation } from '@react-navigation/native';
import translations from '../../../../translations';
import { store } from '../../../store/store';

const TodayMaterialsCard = () => {

    const { s, vs } = useScale()

      
    const { docs, error, loading } = getDocs()

    const navigation = useNavigation()

    const openPdf = (url) => {
      if (url) {
          Linking.openURL(url);
      } else {
          console.warn('URL пустой или недоступен');
      }
    };

    return (
        <View style={[styles.card, {gap: Platform.isPad? vs(20) : s(20), width: Platform.isPad? '49%' : '100%', padding: Platform.isPad? vs(20) : s(20),}]}>
          <View style={{ marginBottom: Platform.isPad? vs(8) : s(8), }}>
            <Text style={[styles.title, {fontSize: Platform.isPad? vs(18) : s(18), lineHeight: Platform.isPad ? vs(30) : s(30), marginBottom: Platform.isPad? vs(12) : s(12),}]}>{translations[store.language].материалыдля}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Catalog')}>
              <Text style={[styles.link, {fontSize: Platform.isPad? vs(14) : s(14)}]}>{translations[store.language].посмотретьвсе}</Text>
            </TouchableOpacity>
          </View>
    
          <View style={[styles.separator, {marginVertical: Platform.isPad? vs(4) : s(4)}]} />
    
          {docs?.map((doc, index) => (
            <View key={index} style={[styles.materialRow, {marginBottom:  Platform.isPad? vs(12) : s(12),}]}>
              <Text style={[styles.index, {width: s(20), fontSize: Platform.isPad? vs(16) : s(16)}]}>{index + 1}</Text>
              <View style={[styles.content]}>
                <Text style={[styles.materialTitle, {fontSize: Platform.isPad? vs(15) : s(15), marginBottom: Platform.isPad? vs(4) : s(4), fontWeight: '500'}]}>{doc?.name}</Text>
                <TouchableOpacity onPress={() => openPdf(doc?.pdf)} style={{backgroundColor: '#e0f0ff', paddingHorizontal: Platform.isPad? vs(8) : s(8), paddingVertical: Platform.isPad? vs(4) : s(4), borderRadius: 6, alignSelf: 'flex-start'}}>
                  <Text style={[styles.tagText, {fontSize: Platform.isPad? vs(12) : s(12)}]}>{doc?.subject}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 3,
        height: 'auto',
        borderWidth: 2,
        borderColor: '#e2cef2'
    },
    title: {
      fontWeight: '700',
    },
    link: {
      color: '#7a5df7',
      fontWeight: '500',
    },
    separator: {
      height: 1,
      backgroundColor: '#eee',
    },
    materialRow: {
      flexDirection: 'row',
      aligndocs: 'flex-start',
    },
    index: {
      fontWeight: '500',
      color: '#000',
    },
    content: {
      flex: 1,
      gap: 5
    },
    materialTitle: {
      color: '#333',
    },
    tagText: {
      color: '#1a73e8',
      fontWeight: '500',
    },
  });

export default TodayMaterialsCard