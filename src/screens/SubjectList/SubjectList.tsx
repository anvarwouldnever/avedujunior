import { View, Text, Platform, TouchableOpacity, useWindowDimensions } from 'react-native'
import React from 'react'
import { useScale } from '../../hooks/useScale'
import { useNavigation } from '@react-navigation/native'
import ProgressBorder from '../../components/ProgressBorder'

const SubjectList = ({ route }) => {

    const { s, vs } = useScale()

    const months = [
        {
          name: 'Сентябрь',
          topics: [
            { color: '#6A5AE0', baseColor: '#EFEEFC', percent: 60, name: 'Наша дружная семья' },
            { color: '#5AE0C0', baseColor: '#EEFBFC', percent: 40, name: 'Моя улица' },
            { color: '#59E956', baseColor: '#F0FCEE', percent: 20, name: 'Печатное рисование красками из природного материала' }
          ]
        },
        {
          name: 'Октябрь',
          topics: [
            { color: '#B55AE0', baseColor: '#F8EEFC', percent: 40, name: 'Красивая скатерть' },
            { color: '#E05A5A', baseColor: '#FCEEEE', percent: 85, name: 'Как мы играем в саду с друзьями' },
            { color: '#E0C35A', baseColor: '#FCFBEE', percent: 0, name: 'Архитектурные памятники Узбекистана' }
          ]
        },
        {
          name: 'Ноябрь',
          topics: [
            { color: '#6A5AE0', baseColor: '#EFEEFC', percent: 60, name: 'Архитектурные памятники Узбекистана' },
            { color: '#5AE0C0', baseColor: '#EEFBFC', percent: 25, name: 'Красивая скатерть' },
            { color: '#E05A9A', baseColor: '#FCEEF5', percent: 0, name: 'Моя улица' }
          ]
        },
        {
          name: 'Декабрь',
          topics: [
            { color: '#B55AE0', baseColor: '#F8EEFC', percent: 40, name: 'Печатное рисование красками из природного материала' },
            { color: '#59E956', baseColor: '#F0FCEE', percent: 20, name: 'Как мы играем в саду с друзьями' },
            { color: '#E05A5A', baseColor: '#FCEEEE', percent: 85, name: 'Наша дружная семья' }
          ]
        },
        {
          name: 'Январь',
          topics: [
            { color: '#5AE0C0', baseColor: '#EEFBFC', percent: 10, name: 'Моя улица' },
            { color: '#E0C35A', baseColor: '#FCFBEE', percent: 0, name: 'Как мы играем в саду с друзьями' },
            { color: '#6A5AE0', baseColor: '#EFEEFC', percent: 60, name: 'Наша дружная семья' }
          ]
        },
        {
          name: 'Февраль',
          topics: [
            { color: '#5AE0C0', baseColor: '#EEFBFC', percent: 60, name: 'Красивая скатерть' },
            { color: '#E05A9A', baseColor: '#FCEEF5', percent: 0, name: 'Печатное рисование красками из природного материала' },
            { color: '#B55AE0', baseColor: '#F8EEFC', percent: 40, name: 'Архитектурные памятники Узбекистана' }
          ]
        },
        {
          name: 'Март',
          topics: [
            { color: '#E05A5A', baseColor: '#FCEEEE', percent: 85, name: 'Наша дружная семья' },
            { color: '#5AE0C0', baseColor: '#EEFBFC', percent: 45, name: 'Печатное рисование красками из природного материала' },
            { color: '#59E956', baseColor: '#F0FCEE', percent: 20, name: 'Моя улица' }
          ]
        },
        {
          name: 'Апрель',
          topics: [
            { color: '#6A5AE0', baseColor: '#EFEEFC', percent: 60, name: 'Красивая скатерть' },
            { color: '#E0C35A', baseColor: '#FCFBEE', percent: 0, name: 'Архитектурные памятники Узбекистана' },
            { color: '#5AE0C0', baseColor: '#EEFBFC', percent: 25, name: 'Как мы играем в саду с друзьями' }
          ]
        },
        {
          name: 'Май',
          topics: [
            { color: '#B55AE0', baseColor: '#F8EEFC', percent: 40, name: 'Моя улица' },
            { color: '#59E956', baseColor: '#F0FCEE', percent: 20, name: 'Печатное рисование красками из природного материала' },
            { color: '#5AE0C0', baseColor: '#EEFBFC', percent: 60, name: 'Наша дружная семья' }
          ]
        },
        {
          name: 'Июнь',
          topics: [
            { color: '#E05A5A', baseColor: '#FCEEEE', percent: 85, name: 'Красивая скатерть' },
            { color: '#E05A9A', baseColor: '#FCEEF5', percent: 0, name: 'Наша дружная семья' },
            { color: '#5AE0C0', baseColor: '#EEFBFC', percent: 45, name: 'Как мы играем в саду с друзьями' }
          ]
        },
        {
          name: 'Июль',
          topics: [
            { color: '#6A5AE0', baseColor: '#EFEEFC', percent: 60, name: 'Архитектурные памятники Узбекистана' },
            { color: '#5AE0C0', baseColor: '#EEFBFC', percent: 10, name: 'Печатное рисование красками из природного материала' },
            { color: '#E0C35A', baseColor: '#FCFBEE', percent: 0, name: 'Моя улица' }
          ]
        },
        {
          name: 'Август',
          topics: [
            { color: '#5AE0C0', baseColor: '#EEFBFC', percent: 25, name: 'Наша дружная семья' },
            { color: '#B55AE0', baseColor: '#F8EEFC', percent: 40, name: 'Моя улица' },
            { color: '#59E956', baseColor: '#F0FCEE', percent: 20, name: 'Как мы играем в саду с друзьями' }
          ]
        }
    ];

    const navigation = useNavigation()

    const { width } = useWindowDimensions();
    const padding = vs(50);
    const columns = width - padding >= 738 ? 2 : 1;
    const subjectWidth = columns === 2 ? (width - padding) / 2 : width - vs(40);

    return (
        <View style={{width: '100%', height: 'auto', gap: vs(15), marginBottom: 100}}>
            {months.map((month, index) => {
                return (
                    <View style={{width: '100%', gap: vs(20)}} key={index}>
                        <Text style={{ color: 'black', fontSize: Platform.isPad? vs(18) : s(18), fontWeight: '700'}}>{month?.name}</Text>
                        <View style={{width: '100%', gap: vs(10), flexWrap: 'wrap', flexDirection: 'row'}}>
                            {month?.topics.map((topic, index) => {
                                return (
                                    <View style={{width: subjectWidth, height: Platform.isPad? vs(225) : s(225), borderWidth: 2, borderColor: topic.baseColor, backgroundColor: 'white', borderRadius: 20, paddingVertical: vs(15), paddingHorizontal: Platform.isPad? vs(20) : s(20), justifyContent: 'space-between'}} key={index}>
                                        <View style={{ backgroundColor: topic.baseColor, width: '50%', alignItems: 'center', borderRadius: 15 }}>
                                            <Text adjustsFontSizeToFit numberOfLines={1} ellipsizeMode='tail' style={{ marginVertical: vs(8), color: topic.color, fontWeight: '600', margin: vs(5)}}>{route?.params?.name}</Text>
                                        </View>

                                        <View style={{width: '100%', height: Platform.isPad? vs(80) : s(80), flexDirection: 'row', alignItems: 'center', gap: s(15)}}>
                                            <ProgressBorder size={columns === 2? (Platform.isPad? vs(70) : s(70)) : (Platform.isPad? vs(80) : s(80))} percent={topic?.percent} baseColor={topic?.baseColor} color={topic?.color}/>

                                            <View style={{height: '100%', width: '60%', justifyContent: 'center', gap: vs(10)}}>
                                                <Text adjustsFontSizeToFit numberOfLines={3} ellipsizeMode='tail' style={{color: 'black', fontSize: Platform.isPad? vs(14) : s(14), fontWeight: '600'}}>{topic?.name}</Text>

                                                <TouchableOpacity onPress={() => navigation.navigate('PreGame')} style={{ backgroundColor: topic.color, justifyContent: 'center', alignItems: 'center', borderRadius: 20, paddingHorizontal: s(8), paddingVertical: vs(6), width: '60%'}}>
                                                    <Text style={{ color: 'white', fontWeight: '700'}}>Пройти  →</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        <View style={{ width: '90%', alignSelf: 'center', height: Platform.isPad? vs(35) : s(35), flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={{ height: '100%', justifyContent: 'space-between', width: '45%', alignItems: 'center' }}>
                                                <Text style={{fontWeight: '800', fontSize: Platform.isPad? vs(12) : s(12)}}>12 / 24</Text>

                                                <Text adjustsFontSizeToFit style={{color: '#8D8D8D', fontSize: Platform.isPad? vs(12) : s(12)}}>тестов решено</Text>
                                            </View>

                                            <View style={{height: '100%', backgroundColor: '#EFEEFC', width: 1, borderRadius: 20}}/>

                                            <View style={{ height: '100%', justifyContent: 'space-between', width: '45%', alignItems: 'center' }}>
                                                <Text style={{ fontWeight: '800', fontSize: Platform.isPad? vs(12) : s(12) }}>50%</Text>

                                                <Text adjustsFontSizeToFit style={{color: '#8D8D8D', fontSize: Platform.isPad? vs(12) : s(12)}}>пройдено</Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                )
            })}
        </View>
    )
}

export default SubjectList
