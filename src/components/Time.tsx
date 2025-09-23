import { Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useScale } from '../hooks/useScale'
import { store } from '../store/store'
import { observer } from 'mobx-react-lite'

const Time = () => {
    const { s, vs, isTablet } = useScale()
    const [formattedDate, setFormattedDate] = useState('')

    useEffect(() => {
        const updateTime = () => {
            const locale = store.language === 'uz' ? 'uz-UZ' : 'ru-RU'

            let formatted = new Intl.DateTimeFormat(locale, {
                day: '2-digit',
                month: 'long',
                hour: '2-digit',
                minute: '2-digit'
            }).format(new Date())

            if (store.language === 'ru') {
                formatted = formatted.replace(' в ', ' ')
            }

            setFormattedDate(formatted)
        }

        updateTime()
        const interval = setInterval(updateTime, 60 * 1000)
        return () => clearInterval(interval)
    }, [store.language])

    return (
        <Text style={{ fontSize: isTablet ? vs(26) : vs(20), fontWeight: '600', color: '#0C092A' }}>
            {formattedDate}
        </Text>
    )
}

export default observer(Time)
