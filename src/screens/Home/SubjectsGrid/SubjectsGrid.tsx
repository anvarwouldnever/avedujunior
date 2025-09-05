import React from 'react';
import { View, Text, useWindowDimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useScale } from '../../../hooks/useScale';
import { useNavigation } from '@react-navigation/native';
import { getSubjects } from './hooks/getSubjects';
import { Image } from 'expo-image';
import { observer } from 'mobx-react-lite';

const SubjectsGrid = () => {

    const { s, vs, isTablet } = useScale();
    const navigation = useNavigation()
    
    const cardSize = 150;
    const { width } = useWindowDimensions();
    const padding = isTablet? vs(60) : s(41);
    const containerSize = width - padding;

    const columns = isTablet ? 3 : Math.floor(containerSize / s(cardSize));

    const totalGap = vs(20) * (columns - 1);
    const cardWidth = isTablet? (containerSize - totalGap) / columns : s(cardSize);
    
    const usedWidth = columns * cardWidth;
    const leftoverSpace = containerSize - usedWidth;
    const columnGap = isTablet ? vs(30) : columns > 1 ? leftoverSpace / (columns - 1) : 0; 

    const { subjects, loading, error } = getSubjects()

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: vs(80) }}>
                
                <ActivityIndicator size="large" color="#6A5AE0" />
            
            </View>
        );
    }
  
    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', marginVertical: vs(60) }}>
                
                <Text style={{ color: 'red', fontSize: vs(15) }}>{error}</Text>
            
            </View>
        );
    }

    return (
        <View style={[{columnGap: columnGap, rowGap: vs(15), justifyContent: 'flex-start', marginBottom: vs(25), flexDirection: 'row', flexWrap: 'wrap',}]}>
            {subjects?.map((item, index) => {
                return (
                    <TouchableOpacity onPress={() => navigation.navigate('TasksList', {name: item?.name, id: item?.id, key: Date.now()})} key={index} style={[{ width: cardWidth, borderRadius: 20, alignItems: 'center', justifyContent: 'flex-start', height: 'auto', backgroundColor: 'white', borderWidth: 1, borderColor: '#e2cef2'}]}>
                    
                        <View style={{width: '100%', height: isTablet? vs(130) : s(100), backgroundColor: item.color, borderTopLeftRadius: 20, borderTopRightRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
                            
                            <Image source={{ uri: item?.image?.url }} contentFit='contain' style={{ width: s(60), height: vs(60) }} />

                        </View>
                        
                        <View style={{backgroundColor: 'white', width: '100%', position: 'relative', minHeight: vs(40), borderBottomLeftRadius: 20, borderBottomRightRadius: 20, padding: vs(12)}}>
                            
                            <Text style={{fontSize: isTablet ? vs(14) : vs(12), fontWeight: '600', width: '100%'}}>{item?.name}</Text>
                        
                        </View>

                    </TouchableOpacity>
                )
            })}
        </View>
    );
};
  
export default observer(SubjectsGrid);