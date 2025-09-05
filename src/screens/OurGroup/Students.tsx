import { TouchableOpacity, View, Text, Platform } from 'react-native'
import React, { useState } from 'react'
import { useScale } from '../../hooks/useScale'
import { Ionicons } from '@expo/vector-icons'
import Animated, { FadeIn, LinearTransition } from 'react-native-reanimated'
import { getAge } from './utils/getAge'
import { useNavigation } from '@react-navigation/native'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

const Students = ({ students }) => {

    const { s, vs, isTablet } = useScale();

    const navigation = useNavigation()

    const [openedChildren, setOpenedChildren] = useState<number[]>([]);

    const toggleChild = (index: number) => {
        setOpenedChildren(prev => {
            if (prev.includes(index)) {
                return prev.filter(i => i !== index);
            } else {
                return [...prev, index];
            }
        });
    }

    const isPad = isTablet;

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: 'auto', rowGap: vs(15)}}>
                
            {students?.map((student: any, index: number) => {
                const isChildChosen = openedChildren?.includes(index);
                
                const number = index + 1;
                const name = `${student?.last_name ?? ''} ${student?.first_name ?? ''} ${student?.middle_name ?? ''}`.trim();
                const gender = student?.gender
                const mother = student?.parents?.find((p: any) => p?.mom_dad === 0);
                const father = student?.parents?.find((p: any) => p?.mom_dad === 1);
                const age = getAge(student?.birth_date)

                return (
                    <AnimatedTouchableOpacity layout={LinearTransition.duration(200)} activeOpacity={1} onPress={() => toggleChild(index)} key={index} style={{ paddingHorizontal: vs(20), paddingTop: isChildChosen ? 0 : vs(15), paddingBottom: isChildChosen ? vs(15) : vs(15), height: 'auto', borderWidth: 2, borderRadius: vs(15), borderColor: '#EFEEFC', width: '100%' }}>
                        
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: isChildChosen ? vs(15) : 0 }}>
                            
                            <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: vs(12), flex: 1 }}>
                                
                                <Text style={{ fontSize: isTablet ? vs(18) : vs(16), color: '#0C092A', fontWeight: '500' }}>{number}</Text>
                                
                                <Text ellipsizeMode="tail" numberOfLines={1} style={{ fontSize: isTablet ? vs(18) : vs(16), color: '#0C092A', fontWeight: '500', flexShrink: 1 }}>{name}</Text>

                            </View>

                            <Ionicons name={isChildChosen ? 'chevron-up' : 'chevron-down'} color={'#0C092A'} size={vs(20)} />

                        </View>

                        {isChildChosen && (<View style={{ height: 2, backgroundColor: '#EFEEFC', width: '100%' }} />)}

                        {isChildChosen &&
                            
                            <Animated.View entering={FadeIn.duration(400)} style={{ width: '100%', height: 'auto', marginTop: vs(15), gap: vs(15), flexWrap: isPad ? 'wrap' : 'nowrap', justifyContent: 'center' }}>

                                <View style={{ width: isPad ? vs(500) : '100%', height: 'auto', flexDirection: isPad ? 'row' : 'column', rowGap: vs(5), justifyContent: isPad ? 'space-between' : 'center', alignItems: isPad ? 'center' : 'flex-start', }}>
                                    
                                    <Text style={{ color: '#858494', fontSize: isTablet ? vs(18) : vs(14), fontWeight: '400' }}>ФИО:</Text>

                                    <Text style={{ color: '#49465F', fontSize: isTablet ? vs(20) : vs(16), fontWeight: '500', width: isPad ? vs(300) : 'auto' }}>{name}</Text>

                                </View>

                                {mother && <View style={{ width: isPad ? vs(500) : '100%', height: 'auto', flexDirection: isPad ? 'row' : 'column', rowGap: vs(5), justifyContent: isPad ? 'space-between' : 'center'}}>
                                    
                                    <Text style={{ color: '#858494', fontSize: isTablet ? vs(18) : vs(14), fontWeight: '400' }}>Мама ребенка:</Text>

                                    <Text style={{ color: '#49465F', fontSize: isTablet ? vs(20) : vs(16), fontWeight: '500', width: isPad ? vs(300) : 'auto' }}>{`${mother?.last_name} ${mother?.first_name} ${mother?.middle_name}`}</Text>

                                </View>}

                                {mother && <View style={{ width: isPad ? vs(500) : '100%', height: 'auto', flexDirection: isPad ? 'row' : 'column', rowGap: vs(5), justifyContent: isPad ? 'space-between': 'center'}}>
                                    
                                    <Text style={{ color: '#858494', fontSize: isTablet ? vs(18) : vs(14), fontWeight: '400' }}>Номер мамы:</Text>

                                    <Text style={{ color: '#49465F', fontSize: isTablet ? vs(20) : vs(16), fontWeight: '500', width: isPad ? vs(300) : 'auto' }}>{mother?.phone}</Text>

                                </View>}

                                {father && <View style={{ width: isPad ? vs(500) : '100%', height: 'auto', flexDirection: isPad ? 'row' : 'column', rowGap: vs(5), justifyContent: isPad ? 'space-between' : 'center'}}>
                                    
                                    <Text style={{ color: '#858494', fontSize: isTablet ? vs(18) : vs(14), fontWeight: '400' }}>Отец ребенка:</Text>

                                    <Text style={{ color: '#49465F', fontSize: isTablet ? vs(20) : vs(16), fontWeight: '500', width: isPad ? vs(300) : 'auto' }}>{`${father?.last_name} ${father?.first_name} ${father?.middle_name}`}</Text>

                                </View>}

                                {father && <View style={{ width: isPad ? vs(500) : '100%', height: 'auto', flexDirection: isPad ? 'row' : 'column', rowGap: vs(5), justifyContent: isPad ? 'space-between' : 'center'}}>
                                    
                                    <Text style={{ color: '#858494', fontSize: isTablet ? vs(18) : vs(14), fontWeight: '400' }}>Номер отца:</Text>

                                    <Text style={{ color: '#49465F', fontSize: isTablet ? vs(20) : vs(16), fontWeight: '500', width: isPad ? vs(300) : 'auto' }}>{father?.phone}</Text>

                                </View>}

                                {gender && <View style={{ width: isPad ? vs(500) : '100%', height: 'auto', flexDirection: isPad ? 'row' : 'column', rowGap: vs(5), justifyContent: isPad ? 'space-between' : 'center'}}>
                                    
                                    <Text style={{ color: '#858494', fontSize: isTablet ? vs(18) : vs(14), fontWeight: '400' }}>Пол ребенка:</Text>

                                    <Text style={{ color: '#49465F', fontSize: isTablet ? vs(20) : vs(16), fontWeight: '500', width: isPad ? vs(300) : 'auto' }}>{gender === "M" ? "Мужчина" : "Женщина"}</Text>

                                </View>}

                                {age !== '' && <View style={{ width: isPad ? vs(500) : '100%', height: 'auto', flexDirection: isPad ? 'row' : 'column', rowGap: vs(5), justifyContent: isPad ? 'space-between' : 'center'}}>
                                        
                                        <Text style={{ color: '#858494', fontSize: isTablet ? vs(18) : vs(14), fontWeight: '400' }}>Возраст:</Text>
                                        
                                        <Text style={{ color: '#49465F', fontSize: isPad ? vs(20) : vs(16), fontWeight: '500', width: isPad ? vs(300) : 'auto' }}>
                                            {age}
                                        </Text>

                                </View>}

                            </Animated.View>

                        }

                        {isChildChosen &&
                            <AnimatedTouchableOpacity onPress={() => navigation.navigate('Student')} entering={FadeIn.duration(400)} style={{ paddingHorizontal: vs(18), paddingVertical: vs(10), backgroundColor: '#EFEEFC', marginTop: vs(15), borderRadius: vs(13), alignSelf: 'flex-start' }}>
                                <Text style={{ fontSize: isPad ? vs(16) : vs(14), color: '#6A5AE0', fontWeight: '500' }}>Подробнее</Text>
                            </AnimatedTouchableOpacity>
                        }
                        
                    </AnimatedTouchableOpacity>
                );
            })}

        </View>        
    )
}

export default Students