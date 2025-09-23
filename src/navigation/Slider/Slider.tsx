import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { navigationStore } from '../NavigationStore';
import { observer } from 'mobx-react-lite';
import { useScale } from '../../hooks/useScale';
import Time from '../../components/Time';

const Slider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {

  const { s, vs, windowWidth, isTablet } = useScale()

  const SLIDER_WIDTH = isTablet? windowWidth * 0.3 : windowWidth * 0.75;

  const translateX = useSharedValue(-SLIDER_WIDTH);

  React.useEffect(() => {
    translateX.value = withSpring(navigationStore.openSlider ? 0 : -SLIDER_WIDTH);
  }, [navigationStore.openSlider, SLIDER_WIDTH]);

  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
      <View style={StyleSheet.absoluteFill}>
          {navigationStore.openSlider && (
            <Pressable style={[styles.backdrop, {left: SLIDER_WIDTH}]} onPress={() => navigationStore.setOpenSlider(false)} />
          )}

          <Animated.View style={[styles.slider, sliderStyle, {width: SLIDER_WIDTH, paddingTop: isTablet ? vs(10) : vs(20), rowGap: vs(10)}]}>
          
            { !isTablet && <Time />}
            
            {children ?? (
              <Text style={{ color: 'white', fontSize: 18 }}>Пусто</Text>
            )}

          </Animated.View>
      </View>
  );
};

const styles = StyleSheet.create({
  slider: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: 'white',
    zIndex: 0,
    
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    alignItems: 'center',
    elevation: 10,
  },
  backdrop: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 50,
  },
});

export default observer(Slider);
