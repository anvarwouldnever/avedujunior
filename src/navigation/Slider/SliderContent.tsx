import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import { navigationStore } from '../NavigationStore';

const menuItems = [
  { screen: 'Home', icon: 'home', label: 'Главная' },
  { screen: 'Subjects', icon: 'document', label: 'Предметы' },
  { screen: 'OurGroup', icon: 'people', label: 'Наша группа' },
  { screen: 'Catalog', icon: 'folder', label: 'Каталог материалов для образовательной деятельности' },
  { screen: 'FreeActivity', icon: 'pencil-outline', label: 'Свободная деятельность' },
];

const SliderContent = observer(({ onClose }: { onClose: () => void }) => {
    const navigation = useNavigation();

    const handleNavigate = (screen: string) => {
        if (navigationStore.currentRoute !== screen) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: screen }],
            })
          );
        };
        onClose();
    };
  
    return (
      <View style={styles.container}>
        {menuItems.map((item) => {
          const isActive = navigationStore.currentRoute === item.screen;
          return (
            <Pressable
              key={item.screen}
              onPress={() => handleNavigate(item.screen)}
              style={[
                styles.item,
                isActive && styles.itemActive,
              ]}
            >
            <Ionicons
                name={item.icon as any}
                size={24}
                color={isActive ? '#FFFFFF' : '#B390EF'}
            />
            <Text style={[styles.text, { color: isActive ? '#FFFFFF' : '#B390EF' }]}>
                {item.label}
            </Text>
            </Pressable>
          );
        })}
      </View>
    );
  });

  const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: '#FFFFFF',
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 30,
      padding: 12,
      borderRadius: 16,
    },
    itemActive: {
      backgroundColor: '#B390EF',
    },
    text: {
      fontSize: 18,
      marginLeft: 15,
      flexShrink: 1,
      fontWeight: '600',
    },
  });
  

export default SliderContent;
