import { useEffect, useState } from 'react'
import { GetMap } from '../../../api/methods/students/map'
import { store } from '../../../store/store'
import { alertHandler } from '../../../network/alertHandler'
import { checkNetwork } from '../../../network/checkNetwork'

const mapCache: Record<string, any> = {}

export const getMap = (type: string) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<null | string>(null)
    const [map, setMap] = useState<any>()

    const lang = store.language

    useEffect(() => {
        const cacheKey = `${lang}_${type}`

        if (mapCache[cacheKey]) {
            setMap(mapCache[cacheKey])
            setLoading(false)
            return
        }

        const fetchMap = async () => {
            try {
                const network = await checkNetwork()
                if (!network) { alertHandler(); return; }

                const response = await GetMap(type)
                const data = response?.data?.data
                mapCache[cacheKey] = data
                setMap(data)
            } catch (e: any) {
                console.log(e)
                setError(e?.response?.data?.message || 'Ошибка загрузки табеля')
            } finally {
                setLoading(false)
            }
        }

        fetchMap()
    }, [type])

    return { map, loading, error }
}
