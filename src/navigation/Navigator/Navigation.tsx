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
import Logo from '../../components/Logo';
import TasksScreen from '../../screens/TasksScreen';
import PreGameScreen from '../../screens/PreGameScreen';
import { store } from '../../store/store';
import ProfileScreen from '../../screens/ProfileScreen';
import { pfpAssets } from '../../components/PfpAssets';
import { observer } from 'mobx-react-lite';
import LoginScreen from '../../screens/LoginScreen';
import GameScreen from '../../screens/GameScreen';
import TestScreen from '../../screens/TestScreen';

const Stack = createStackNavigator();

const Navigation = ({ openSlider }: { openSlider: () => void }) => {

    const { s, vs } = useScale();
    const [key, setKey] = useState<boolean>(false)

    useEffect(() => {
        setKey(prev => !prev)
    }, [store.pfp])

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
                        onPress={() => store.setModal(!store.profileModal)}
                        activeOpacity={0.8}
                    >
                        <Image
                            key={key}
                            source={pfpAssets[store.pfp] ?? pfpAssets[1]} // запасной вариант, если store.pfp пустой
                            resizeMode='contain'
                            style={{ width: 50, height: 50 }}
                        />
                    </TouchableOpacity> 
                    <TouchableOpacity onPress={() => openSlider()}>
                        <Ionicons name="menu" size={50} color="black" />
                    </TouchableOpacity>
                </View>
            ),
            headerLeft: () => (
                <Logo />
            )
        }} initialRouteName={"LoginScreen"}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Subjects" component={SubjectsScreen} />
            <Stack.Screen name="TasksList" component={TasksScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="PreGame" component={PreGameScreen} />
            <Stack.Screen name="Test" component={TestScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Game" component={GameScreen} />
            <Stack.Screen options={{ headerShown: false }} name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="OurGroup" component={OurGroupScreen} />
            <Stack.Screen name="Catalog" component={CatalogScreen} />
            <Stack.Screen name="FreeActivity" component={FreeActivityScreen} />
        </Stack.Navigator>
    )
}

export default observer(Navigation);