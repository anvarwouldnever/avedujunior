import { GestureHandlerRootView } from 'react-native-gesture-handler';
import WithSliderWrapper from './src/navigation/Navigator/WithSliderWrapper';

export default function App() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <WithSliderWrapper />
    </GestureHandlerRootView>
  );
}
