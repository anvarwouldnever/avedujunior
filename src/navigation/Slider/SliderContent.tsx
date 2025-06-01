import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable, Platform } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import { navigationStore } from '../NavigationStore';
import { useScale } from '../../hooks/useScale';

const menuItems = [
  { screen: 'Home', icon: 'home', label: 'Главная' },
  { screen: 'Subjects', icon: 'document', label: 'Предметы' },
  { screen: 'OurGroup', icon: 'people', label: 'Наша группа' },
  { screen: 'Catalog', icon: 'folder', label: 'Каталог материалов для образовательной деятельности' },
  { screen: 'FreeActivity', icon: 'pencil-outline', label: 'Свободная деятельность' },
];

const SliderContent = observer(({ onClose }: { onClose: () => void }) => {
    const navigation = useNavigation();
    const { s, vs } = useScale()

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
      <View style={{ padding: Platform.isPad? vs(14) : s(14), backgroundColor: '#FFFFFF'}}>
        {menuItems.map((item) => {
          const isActive = navigationStore.currentRoute === item.screen;
          return (
            <Pressable
              key={item.screen}
              onPress={() => handleNavigate(item.screen)}
              style={[
                styles.item,
                isActive && styles.itemActive,
                {marginBottom: Platform.isPad? vs(20) : s(20), padding: Platform.isPad? vs(14) : s(14),}
              ]}
            >
            <Ionicons
                name={item.icon as any}
                size={vs(20)}
                color={isActive ? '#FFFFFF' : '#B390EF'}
            />
            <Text style={[styles.text, { color: isActive ? '#FFFFFF' : '#B390EF', fontSize: Platform.isPad? vs(16) : s(16), marginLeft: Platform.isPad? vs(15) : s(15)}]}>
                {item.label}
            </Text>
            </Pressable>
          );
        })}
      </View>
    );
  });

  const styles = StyleSheet.create({
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 16,
    },
    itemActive: {
      backgroundColor: '#B390EF',
    },
    text: {
      flexShrink: 1,
      fontWeight: '600',
    },
  });
  

export default SliderContent;
