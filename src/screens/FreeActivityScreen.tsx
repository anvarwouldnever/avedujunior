import { Text, ImageBackground, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useScale } from '../hooks/useScale'
import Activities from './FreeActivity/Activities';
import ActivityItems from './FreeActivity/ActivityItems';
import { observer } from 'mobx-react-lite';
import { bgAssets } from '../components/BgAssets';
import { store } from '../store/store';
import { getActivities } from './FreeActivity/hooks/getActivities';

const FreeActivityScreen = () => {

    const { vs } = useScale();
    const [activity, setActivity] = useState<number | null>(1);

    const { activities, error, loading } = getActivities(activity);

    return (
        <ImageBackground style={{ flex: 1, justifyContent: 'center'}} source={store?.backgroundImage?.image?.url ? { uri: store.backgroundImage.image.url } : bgAssets[1]}>
            <ScrollView style={{flex: 1, padding: vs(20)}}>
                <Text style={{color: 'black', fontSize: vs(22), fontWeight: '700', marginVertical: vs(20)}}>Свободная деятельность</Text>
                <Activities activity={activity} setActivity={setActivity}/>

                <ActivityItems activity={activity} activities={activities}/>
            </ScrollView>
        </ImageBackground>
    )
}

export default observer(FreeActivityScreen);