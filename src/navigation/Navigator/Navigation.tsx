import React, { useEffect, useRef, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, Image, Platform } from 'react-native';
import logo from '../../../assets/aveduLogo.jpg';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Subjects from '../../screens/SubjectsScreen';
import SubjectsScreen from '../../screens/SubjectsScreen';
import OurGroupScreen from '../../screens/OurGroupScreen';
import CatalogScreen from '../../screens/CatalogScreen';
import FreeActivityScreen from '../../screens/FreeActivityScreen';
import { useScale } from '../../hooks/useScale';

const Stack = createStackNavigator();

const Navigation = ({ openSlider }: { openSlider: () => void }) => {

    const { s, vs } = useScale();

    return (
        <Stack.Navigator screenOptions={{
            animation: 'default',
            title: '',
            headerStyle: {
                height: Platform.isPad? 130 : vs(130),
            },
            headerRight: () => (
                <View style={{marginRight: 15, flexDirection: 'row', gap: 10}}>
                    <TouchableOpacity
                        onPress={() => alert('Меню нажато')}
                    >
                        <Ionicons name="person-circle" size={50} color="purple" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openSlider()}>
                        <Ionicons name="menu" size={50} color="black" />
                    </TouchableOpacity>
                </View>
            ),
            headerLeft: () => (
                <Image source={logo} style={{width: 100, height: 60, resizeMode: 'contain', marginLeft: 15}}/>
            )
        }} initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Subjects" component={SubjectsScreen} />
            <Stack.Screen name="OurGroup" component={OurGroupScreen} />
            <Stack.Screen name="Catalog" component={CatalogScreen} />
            <Stack.Screen name="FreeActivity" component={FreeActivityScreen} />
        </Stack.Navigator>
    )
}

export default Navigation;