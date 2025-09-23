import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native'
import React from 'react'
import { useScale } from '../../hooks/useScale'
import { useNavigation } from '@react-navigation/native'
import ProgressBorder from '../../components/ProgressBorder'
import { useTasks } from './hooks/getTasks'
import { colors } from '../../components/Colors'
import translations from '../../../translations'
import { store } from '../../store/store'
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons'

const TasksList = ({ route }) => {

    const id = route?.params?.id;

    const { tasks, error, loading } = useTasks(id);

    const { s, vs, isTablet } = useScale();
    const navigation = useNavigation();
    const { width } = useWindowDimensions();
    const padding = vs(40);
    const columns = isTablet ? 3 : width - padding >= 738 ? 2 : 1;
    const subjectWidth = isTablet
        ? (width - padding - vs(20) * 2) / 3
        : columns === 2
        ? (width - padding) / 2
        : width - vs(40);

    const label = (key: string, fallbackKey: string) => store.labels?.[key] || translations[store?.language]?.[fallbackKey] || fallbackKey;

    return (
        <View style={{width: '100%', height: 'auto', gap: vs(15), marginBottom: 100}}>
            {tasks?.monthes?.map((month, index) => (
                <View style={{width: '100%', gap: vs(10)}} key={index}>
                    <Text style={{ color: 'black', fontSize: isTablet? vs(18) : s(18), fontWeight: '700'}}>
                        {month?.name}
                    </Text>

                    <View style={{width: '100%', gap: vs(20), flexWrap: 'wrap', flexDirection: 'row'}}>
                        {month?.tests?.map((topic: any, index: number) => {
                            const color = colors[index % colors?.length];
                            const opened = topic?.opened;

                            return (
                                <TouchableOpacity 
                                    key={index}
                                    activeOpacity={0.8} 
                                    onPress={!opened ? () => {} : () => navigation.navigate('PreGame', {
                                        name: route?.params?.name, 
                                        topic: topic.name, 
                                        id: topic?.id, 
                                        tasksId: id 
                                    })} 
                                    style={{
                                        width: subjectWidth, 
                                        height: vs(240), 
                                        borderWidth: 2, 
                                        borderColor: color.primary, 
                                        backgroundColor: 'white', 
                                        borderRadius: 20, 
                                        paddingVertical: vs(15), 
                                        paddingHorizontal: vs(20), 
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <View style={{ backgroundColor: color.primary, width: '50%', alignItems: 'center', borderRadius: 15 }}>
                                        <Text adjustsFontSizeToFit numberOfLines={1} ellipsizeMode='tail' style={{ marginVertical: vs(8), color: color.secondary, fontWeight: '600', margin: vs(5)}}>
                                            {route?.params?.name}
                                        </Text>
                                    </View>

                                    <View style={{width: '100%', height: isTablet? vs(80) : s(80), flexDirection: 'row', alignItems: 'center', gap: vs(15)}}>
                                        <ProgressBorder 
                                            size={columns === 2? (isTablet? vs(70) : s(70)) : (isTablet? vs(80) : s(80))} 
                                            percent={Math.round(topic?.finished_percent)} 
                                            baseColor={color.primary} 
                                            color={color.secondary}
                                        />

                                        <View style={{height: '100%', width: '60%', justifyContent: 'center', gap: vs(10)}}>
                                            <Text adjustsFontSizeToFit numberOfLines={3} ellipsizeMode='tail' style={{color: 'black', fontSize: isTablet? vs(14) : s(14), fontWeight: '600'}}>
                                                {topic?.name}
                                            </Text>

                                            <TouchableOpacity onPress={() => navigation.navigate('PreGame', {name: route?.params?.name, topic: topic.name, id: topic?.id, tasksId: id })} style={{ backgroundColor: color.secondary, justifyContent: 'center', alignItems: 'center', borderRadius: 20, paddingHorizontal: s(6), paddingVertical: vs(8), width: '60%'}}>
                                                <Text style={{ color: 'white', fontWeight: '700', flexDirection: 'row'}}>
                                                    {label('пройти', 'пройти')} →
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={{ width: '90%', alignSelf: 'center', height: isTablet? vs(35) : s(35), flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ height: '100%', justifyContent: 'space-between', width: '45%', alignItems: 'center' }}>
                                            <Text style={{fontWeight: '800', fontSize: isTablet? vs(12) : s(12)}}>{topic?.passed_tests_count} / {topic?.test_count}</Text>
                                            <Text adjustsFontSizeToFit style={{color: '#8D8D8D', fontSize: isTablet? vs(12) : s(12)}}>{label('тестоврешено', 'тестоврешено')}</Text>
                                        </View>

                                        <View style={{height: '100%', backgroundColor: '#EFEEFC', width: 1, borderRadius: 20}}/>

                                        <View style={{ height: '100%', justifyContent: 'space-between', width: '45%', alignItems: 'center' }}>
                                            <Text style={{ fontWeight: '800', fontSize: isTablet? vs(12) : s(12) }}>{Math.round(topic?.finished_percent)}%</Text>
                                            <Text adjustsFontSizeToFit style={{color: '#8D8D8D', fontSize: isTablet? vs(12) : s(12)}}>{label('пройдено', 'пройдено')}</Text>
                                        </View>
                                    </View>

                                    {!opened &&
                                        <BlurView intensity={10} style={{ position: 'absolute', flex: 1, top: 0, left: 0, bottom: 0, right: 0, justifyContent: 'center' }}>
                                            <Ionicons name='lock-closed' color={'#6A5AE0'} size={vs(25)} style={{ position: 'absolute', alignSelf: 'center' }} />
                                        </BlurView>
                                    }
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            ))}
        </View>
    )
}

export default TasksList
