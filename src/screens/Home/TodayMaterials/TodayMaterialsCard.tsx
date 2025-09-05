import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { useScale } from '../../../hooks/useScale';
import { getDocs } from './hooks/getDocs';
import * as Linking from 'expo-linking';
import { useNavigation } from '@react-navigation/native';
import translations from '../../../../translations';
import { store } from '../../../store/store';

const TodayMaterialsCard = () => {

    const { s, vs, isTablet } = useScale()

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
        <View style={[styles.card, {gap: vs(20), width: isTablet ? '49%' : '100%', padding: vs(20),}]}>
          
          <View style={{ marginBottom: isTablet ? vs(8) : s(8) }}>
            
            <Text style={[styles.title, {fontSize: isTablet ? vs(18) : s(18), lineHeight: isTablet  ? vs(30) : s(30), marginBottom: isTablet ? vs(12) : s(12),}]}>{translations[store.language].материалыдля}</Text>
            
            <TouchableOpacity onPress={() => navigation.navigate('Catalog')}>
              <Text style={[styles.link, {fontSize: isTablet ? vs(16) : vs(14)}]}>{translations[store.language].посмотретьвсе}</Text>
            </TouchableOpacity>

          </View>
    
          <View style={[styles.separator, {marginVertical: vs(4)}]} />
    
          <View style={{width: '100%', height: 'auto', rowGap: vs(26) }}>
            {docs?.map((doc, index) => (
              <View key={index} style={[styles.materialRow, { columnGap: vs(12)}]}>
                
                <Text style={[styles.index, {width: 'auto', fontSize: isTablet  ? vs(18) : vs(16)}]}>{index + 1}</Text>
                
                <View style={[styles.content, {rowGap: vs(16)}]}>
                  
                  <Text style={[styles.materialTitle, {fontSize: isTablet  ? vs(18) : vs(16), fontWeight: '500'}]}>{doc?.name}</Text>
                  
                  <TouchableOpacity onPress={() => openPdf(doc?.pdf)} style={{backgroundColor: '#e0f0ff', paddingHorizontal: vs(8), paddingVertical: vs(4), borderRadius: 6, alignSelf: 'flex-start'}}>
                    
                    <Text style={[styles.tagText, {fontSize: isTablet  ? vs(14) : vs(12)}]}>{doc?.subject}</Text>
                  
                  </TouchableOpacity>

                </View>

              </View>
            ))}
          </View>
          
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