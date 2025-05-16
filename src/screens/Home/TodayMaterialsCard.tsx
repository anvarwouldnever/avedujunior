import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const TodayMaterialsCard = () => {
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
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Материалы для образовательной деятельности на сегодня</Text>
            <TouchableOpacity>
              <Text style={styles.link}>Посмотреть все</Text>
            </TouchableOpacity>
          </View>
    
          <View style={styles.separator} />
    
          {materials.map((item, index) => (
            <View key={item.id} style={styles.materialRow}>
              <Text style={styles.index}>{index + 1}</Text>
              <View style={styles.content}>
                <Text style={styles.materialTitle}>{item.title}</Text>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{item.subject}</Text>
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
        padding: 20,
        elevation: 3,
        height: 'auto',
        width: '100%',
        gap: 20,
        borderWidth: 2,
        borderColor: '#e2cef2'
    },
    header: {
      marginBottom: 8,
    },
    title: {
      fontWeight: '700',
      fontSize: 18,
      marginBottom: 12,
      lineHeight: 30
    },
    link: {
      color: '#7a5df7',
      fontSize: 14,
      fontWeight: '500',
    },
    separator: {
      height: 1,
      backgroundColor: '#eee',
      marginVertical: 4,
    },
    materialRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    index: {
      width: 20,
      fontSize: 16,
      fontWeight: '500',
      color: '#000',
    },
    content: {
      flex: 1,
    },
    materialTitle: {
      fontSize: 15,
      color: '#333',
      marginBottom: 4,
    },
    tag: {
      backgroundColor: '#e0f0ff',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      alignSelf: 'flex-start',
    },
    tagText: {
      fontSize: 12,
      color: '#1a73e8',
      fontWeight: '500',
    },
  });

export default TodayMaterialsCard