import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import { navigationStore } from '../NavigationStore';
import { useScale } from '../../hooks/useScale';
import translations from '../../../translations';
import { store } from '../../store/store';
import { navigationReset } from '../Navigator/utils/navigate';

const SliderContent = () => {
    
    const { s, vs, isTablet } = useScale();

    const handleNavigate = (screen: string) => {
        if (navigationStore.currentRoute !== screen) {
          navigationReset(screen)
        };
        navigationStore.setOpenSlider(false)
    };

    const menuItems = [
        { screen: 'Home', icon: 'home', label: store.labels?.home || translations[store.language]?.главная },
        { screen: 'Subjects', icon: 'document', label: store.labels?.subjects || translations[store.language]?.предметы },
        { screen: 'OurGroup', icon: 'people', label: store.labels?.ourGroup || translations[store.language]?.нашагруппа },
        { screen: 'Catalog', icon: 'folder', label: store.labels?.lessonMaterialsCatalog || translations[store.language]?.каталогматериалов },
        { screen: 'FreeActivity', icon: 'pencil-outline', label: store.labels?.activityText || translations[store.language]?.свободнаядеятельность },
        { screen: 'CompletedTasks', icon: 'star', label: store.labels?.completedLessons || translations[store.language]?.пройденныетемы },
        { screen: 'Profile', icon: 'person', label: store.labels?.myProfile || translations[store.language]?.мойпрофиль },
    ];
  
    return (
        <View style={{ padding: vs(14), backgroundColor: '#FFFFFF', width: '100%', borderRadius: 30}}>
            
            {menuItems.map((item) => {
                const isActive = navigationStore.currentRoute === item?.screen;
                return (
                    <Pressable key={item?.screen} onPress={() => handleNavigate(item?.screen)} style={[ styles.item, isActive && styles.itemActive, {marginBottom: isTablet? vs(20) : s(20), padding: isTablet? vs(14) : s(14) }]}>
                        
                        <Ionicons name={item.icon as any} size={vs(20)} color={isActive ? '#FFFFFF' : '#B390EF'}/>
                        
                        <Text style={[styles.text, { color: isActive ? '#FFFFFF' : '#B390EF', fontSize: isTablet? vs(16) : s(16), marginLeft: isTablet? vs(15) : s(15)}]}>
                            {item?.label}
                        </Text>

                    </Pressable>
                );
            })}

        </View>
    );
};

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
  

export default observer(SliderContent);
