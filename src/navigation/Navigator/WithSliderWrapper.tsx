import React, { useEffect, useState } from 'react';
import { View, Button, Text, Platform, Image, TouchableOpacity } from 'react-native';
import Slider from '../Slider/Slider';
import Navigation from './Navigation';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import SliderContent from '../Slider/SliderContent';
import { navigationStore } from '../NavigationStore';
import { store } from '../../store/store';
import LoginScreen from '../../screens/LoginScreen';
import { observer } from 'mobx-react-lite';
import Modal from 'react-native-modal'
import { useScale } from '../../hooks/useScale';
import ProfileModal from '../../components/ProfileModal';

const WithSliderWrapper = () => {
    const [sliderOpen, setSliderOpen] = useState(false);

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
                    <>
                        <Navigation openSlider={() => setSliderOpen(true)} />
                        <Slider isOpen={sliderOpen} onClose={() => setSliderOpen(false)}>
                            <SliderContent onClose={() => setSliderOpen(false)} />
                        </Slider>
                        <ProfileModal />
                    </>
            </NavigationContainer>
        </View>
    );
};

export default observer(WithSliderWrapper);
