import React, { useEffect } from 'react';
import { View } from 'react-native';
import Navigation from './Navigation';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { navigationStore } from '../NavigationStore';
import { observer } from 'mobx-react-lite';
import ProfileModal from '../../components/ProfileModal';

const WithSliderWrapper = () => {

    const navigationRef = useNavigationContainerRef();

    useEffect(() => {
        const unsubscribe = navigationRef.addListener('state', () => {
        const route = navigationRef.getCurrentRoute();
        if (route) {
            navigationStore.setRoute(route.name);
        }
        });

        return unsubscribe;
    }, [navigationRef]);

    return (
        <View style={{ flex: 1 }}>

            <NavigationContainer ref={navigationRef}>

                <Navigation />

                <ProfileModal />

            </NavigationContainer>
            
        </View>
    );
};

export default observer(WithSliderWrapper);
