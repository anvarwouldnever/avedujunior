import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import WithSliderWrapper from './src/navigation/Navigator/WithSliderWrapper';

export default function App() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <WithSliderWrapper />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
