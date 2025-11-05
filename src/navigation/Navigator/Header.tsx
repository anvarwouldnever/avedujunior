import React from 'react'
import { View, Text, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Logo from '../../components/Logo'
import HeaderRight from './HeaderRight'
import CompletedTasks from '../../components/CompletedTasks'
import Time from '../../components/Time'
import { useScale } from '../../hooks/useScale'
import { store } from '../../store/store'
import translations from '../../../translations'

const Header = React.memo(({ route, options }) => {
    const { vs, isTablet } = useScale()
    const insets = useSafeAreaInsets()

    const menuItem = [
        { screen: 'Home', label: translations[store.language]?.главная },
        { screen: 'Subjects', label: translations[store.language]?.предметы },
        { screen: 'OurGroup', label: translations[store.language]?.нашагруппа },
        { screen: 'Catalog', label: translations[store.language]?.каталогматериалов },
        { screen: 'FreeActivity', label: translations[store.language]?.свободнаядеятельность },
        { screen: 'Profile', label: translations[store.language]?.мойпрофиль },
        { screen: 'CompletedTasks', label: translations[store.language]?.пройденныетемы },
    ].find(item => item.screen === route?.name)

    const title = menuItem ? menuItem.label : route?.name

    return (
        <View style={{ paddingTop: insets.top, height: (isTablet ? 100 : vs(80)) + insets.top, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: options.headerStyle?.backgroundColor || '#fff', borderBottomWidth: Platform.OS === 'ios' ? 0.5 : 0, borderColor: '#ddd'}}>
        
            <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: vs(25) }}>
                
                <Logo />

                {isTablet && <Time />}
                
            </View>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: vs(10)}}>
                
                <Text numberOfLines={2} ellipsizeMode="tail" style={{ fontSize: isTablet ? vs(20) : vs(14), fontWeight: '700', color: '#6A5AE0', textAlign: 'center'}}>
                    {title}
                </Text>

            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: vs(25), borderWidth: 1, justifyContent: 'center' }}>
                
                {isTablet && <CompletedTasks />}

                <HeaderRight />

            </View>
            
        </View>
    )
})

export default Header
