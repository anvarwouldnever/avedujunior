import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Platform,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring
} from 'react-native-reanimated';

const Slider = ({
  children,
  isOpen,
  onClose,
}: {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}) => {

  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const SLIDER_WIDTH = Platform.isPad? SCREEN_WIDTH * 0.3 : SCREEN_WIDTH * 0.75;

  const translateX = useSharedValue(-SLIDER_WIDTH);

  React.useEffect(() => {
    translateX.value = withSpring(isOpen ? 0 : -SLIDER_WIDTH, {
      damping: 25,
      stiffness: 200,
    });
  }, [isOpen, SLIDER_WIDTH]);

  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={StyleSheet.absoluteFill}>
      {isOpen && (
        <Pressable style={[styles.backdrop, {left: SLIDER_WIDTH,}]} onPress={() => onClose()} />
      )}

        <Animated.View style={[styles.slider, sliderStyle, {width: SLIDER_WIDTH,}]}>
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
    paddingTop: 80,
    zIndex: 100,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 10,

    // Тень для Android
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

export default Slider;
