import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen';
import { View } from 'react-native';
import SubjectsScreen from '../../screens/SubjectsScreen';
import OurGroupScreen from '../../screens/OurGroupScreen';
import CatalogScreen from '../../screens/CatalogScreen';
import FreeActivityScreen from '../../screens/FreeActivityScreen';
import { useScale } from '../../hooks/useScale';
import Logo from '../../components/Logo';
import TasksScreen from '../../screens/TasksScreen';
import PreGameScreen from '../../screens/PreGameScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import { observer } from 'mobx-react-lite';
import LoginScreen from '../../screens/LoginScreen';
import GameScreen from '../../screens/GameScreen';
import TestScreen from '../../screens/TestScreen';
import * as SecureStore from 'expo-secure-store';
import RegisterScreen from '../../screens/RegisterScreen';
import HeaderRight from './HeaderRight';
import translations from '../../../translations';
import { store } from '../../store/store';
import { Text } from 'react-native';
import CompletedTasksScreen from '../../screens/CompletedTasksScreen';
import CompletedTasks from '../../components/CompletedTasks';
import Time from '../../components/Time';
import StudentScreen from '../../screens/StudentScreen';

const Stack = createStackNavigator();

const Navigation = () => {

    const { vs, isTablet, windowWidth } = useScale();
    
    const token = SecureStore.getItem('access_token');

    const menuItems = [
        { screen: 'Home', label: translations[store.language].главная },
        { screen: 'Subjects', label: translations[store.language].предметы },
        { screen: 'OurGroup', label: translations[store.language].нашагруппа },
        { screen: 'Catalog', label: translations[store.language].каталогматериалов },
        { screen: 'FreeActivity', label: translations[store.language].свободнаядеятельность },
        { screen: 'Profile', label: translations[store.language].мойпрофиль },
        { screen: 'CompletedTasks', label: translations[store.language].пройденныетемы },
    ];

    return (
        <Stack.Navigator
            screenOptions={({ route }) => {
                const menuItem = menuItems.find(item => item?.screen === route?.name);

                return {
                    animation: 'default',
                    title: menuItem ? menuItem?.label : route?.name,
                    headerTitleContainerStyle: { position: 'absolute', justifyContent: 'center', left: 0, right: 0, alignSelf: 'center'},
                    headerTitleStyle: {
                        fontSize: vs(12),
                        alignSelf: 'center',
                        maxWidth: vs(100),
                    },

                    headerTitle: () => (
                        <View style={{ position: 'absolute', width: windowWidth, justifyContent: 'center', alignItems: 'center', left: 0}}>
                            <Text style={{ fontSize: isTablet ? vs(20) : vs(14), fontWeight: '700', maxWidth: vs(400), color: '#6A5AE0', textAlign: 'center'}} numberOfLines={2} ellipsizeMode="tail">
                                {menuItem ? menuItem.label : ''}
                            </Text>
                        </View>
                    ),

                    headerStyle: {
                        height: isTablet ? 130 : vs(130),
                    },

                    headerRight: () => 
                        <View style={{ flexDirection: 'row', columnGap: vs(25), alignItems: 'center'}}>
                            
                            { isTablet && <CompletedTasks /> }

                            <HeaderRight />

                        </View>
                    ,

                    headerLeft: () => 
                        <View style={{flexDirection: 'row', alignItems: 'center', columnGap: vs(25)}}>

                            <Logo />

                            { isTablet && <Time />}

                        </View>
                    ,
                }
            }} initialRouteName={token? "Home" : "LoginScreen"}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Subjects" component={SubjectsScreen} />
            <Stack.Screen name="TasksList" component={TasksScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="PreGame" component={PreGameScreen} />
            <Stack.Screen name="Test" component={TestScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Game" component={GameScreen} />
            <Stack.Screen options={{ headerShown: false }} name="LoginScreen" component={LoginScreen} />
            <Stack.Screen options={{ headerShown: false }} name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="OurGroup" component={OurGroupScreen} />
            <Stack.Screen name="Student" component={StudentScreen} />
            <Stack.Screen name="Catalog" component={CatalogScreen} />
            <Stack.Screen name="FreeActivity" component={FreeActivityScreen} />
            <Stack.Screen name="CompletedTasks" component={CompletedTasksScreen} />
        </Stack.Navigator>
    )
}

export default observer(Navigation);