import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useScale } from '../../hooks/useScale'
import translations from '../../../translations'
import { store } from '../../store/store'
import { observer } from 'mobx-react-lite'

type Role = 'organization' | 'personal'

const ChooseRole = ({ thinking, selectedRole, setSelectedRole }) => {
    const { s, vs, isTablet } = useScale()

    const organizationLabel = store.labels?.organizations?.trim() || translations[store?.language]?.организация
    const personalLabel = store.labels?.personal?.trim() || translations[store?.language]?.персональный

    const roles: { key: Role, label: string }[] = [
        { key: 'organization', label: organizationLabel },
        { key: 'personal', label: personalLabel }
    ]

    return (
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
            {roles.map(role => (
                <TouchableOpacity 
                    key={role.key}
                    onPress={thinking ? () => {} : () => setSelectedRole(role.key)} 
                    activeOpacity={0.8} 
                    style={{
                        height: isTablet ? vs(45) : s(45),
                        width: '48%',
                        borderWidth: 2,
                        borderColor: '#6A5AE0',
                        borderRadius: 15,
                        backgroundColor: selectedRole === role.key ? '#6A5AE0' : '#EFEEFC',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Text style={{ 
                        color: selectedRole === role.key ? 'white' : '#6A5AE0',
                        fontWeight: '600',
                        fontSize: isTablet ? vs(14) : s(14)
                    }}>
                        {role.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default observer(ChooseRole)
