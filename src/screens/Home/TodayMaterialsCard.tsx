import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { useScale } from '../../hooks/useScale';

const TodayMaterialsCard = () => {

  const { s, vs } = useScale()

    const materials = [
        {
          id: 1,
          title: 'Сложение и вычитание в пределах 20',
          subject: 'Элементарная математика',
        },
        {
          id: 2,
          title: 'Dishes (2)',
          subject: 'Английский язык',
        },
      ];
      
    return (
        <View style={[styles.card, {gap: Platform.isPad? vs(20) : s(20), padding: Platform.isPad? vs(20) : s(20),}]}>
          <View style={{ marginBottom: Platform.isPad? vs(8) : s(8), }}>
            <Text style={[styles.title, {fontSize: Platform.isPad? vs(18) : s(18), lineHeight: Platform.isPad ? vs(30) : s(30), marginBottom: Platform.isPad? vs(12) : s(12),}]}>Материалы для образовательной деятельности на сегодня</Text>
            <TouchableOpacity>
              <Text style={[styles.link, {fontSize: Platform.isPad? vs(14) : s(14)}]}>Посмотреть все</Text>
            </TouchableOpacity>
          </View>
    
          <View style={[styles.separator, {marginVertical: Platform.isPad? vs(4) : s(4)}]} />
    
          {materials.map((item, index) => (
            <View key={item.id} style={[styles.materialRow, {marginBottom:  Platform.isPad? vs(12) : s(12),}]}>
              <Text style={[styles.index, {width: s(20), fontSize: Platform.isPad? vs(16) : s(16)}]}>{index + 1}</Text>
              <View style={[styles.content]}>
                <Text style={[styles.materialTitle, {fontSize: Platform.isPad? vs(15) : s(15), marginBottom: Platform.isPad? vs(4) : s(4),}]}>{item.title}</Text>
                <View style={{backgroundColor: '#e0f0ff', paddingHorizontal: Platform.isPad? vs(8) : s(8), paddingVertical: Platform.isPad? vs(4) : s(4), borderRadius: 6, alignSelf: 'flex-start'}}>
                  <Text style={[styles.tagText, {fontSize: Platform.isPad? vs(12) : s(12)}]}>{item.subject}</Text>
                </View>
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
        width: '100%',
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
      alignItems: 'flex-start',
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