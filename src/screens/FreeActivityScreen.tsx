import { Text, ImageBackground, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useScale } from '../hooks/useScale'
import Activities from './FreeActivity/Activities';
import ActivityItems from './FreeActivity/ActivityItems';
import { observer } from 'mobx-react-lite';
import { bgAssets } from '../components/BgAssets';
import { store } from '../store/store';
import { getActivities } from './FreeActivity/hooks/getActivities';
import translations from '../../translations';
import Slider from '../navigation/Slider/Slider';
import SliderContent from '../navigation/Slider/SliderContent';

const FreeActivityScreen = () => {

    const { vs } = useScale();
    const [activity, setActivity] = useState<number | null>(1);

    const { activities, error, loading } = getActivities(activity);

    return (
        <ImageBackground style={{ flex: 1, justifyContent: 'center'}} source={store?.backgroundImage?.image?.url ? { uri: store.backgroundImage.image.url } : bgAssets[1]}>
            
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ rowGap: vs(20) }} style={{flex: 1, padding: vs(20)}}>
                <Text style={{color: 'black', fontSize: vs(22), fontWeight: '700'}}>{store?.labels?.activityText || translations[store.language]?.свободнаядеятельность}</Text>
                <Activities activity={activity} setActivity={setActivity}/>

                <ActivityItems activity={activity} activities={activities}/>
            </ScrollView>

            <Slider>
                <SliderContent />
            </Slider>

        </ImageBackground>
    )
}

export default observer(FreeActivityScreen);