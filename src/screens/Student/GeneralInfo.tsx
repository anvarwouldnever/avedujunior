// GeneralInfo.tsx
import { View, Text, TextInput, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useScale } from '../../hooks/useScale';
import Calendar from './GeneralInfo/Calendar';
import { Ionicons } from '@expo/vector-icons';

const GeneralInfo = () => {

    const { s, vs } = useScale();

    const [lastName, setLastName] = useState<string>('')
    const [gender, setGender] = useState<string>('')
    const [firstName, setFirstName] = useState<string>('')
    const [fatherName, setFatherName] = useState<string>('')
    const [birthDate, setBirthDate] = useState<Date>()
    const [address, setAddress] = useState<string>('')
    const [metricNumber, setMetricNumber] = useState<string>('')
    const [ticketNumber, setTicketNumber] = useState<string>('')
    const [ticketIssueDate, setTicketIssueDate] = useState<Date>()
    const [ticketEndDate, setTicketEndDate] = useState<Date>()

    const [show, setShow] = useState<boolean>(false)
    const [activeField, setActiveField] = useState<string | null>(null)

    const fields = [
        { key: 'lastName', label: 'Фамилия', placeholder: 'Фамилия', value: lastName, onChange: setLastName, isCalendar: false },
        { key: 'gender', label: 'Пол', placeholder: 'Пол', value: gender, onChange: setGender, isCalendar: false },
        { key: 'firstName', label: 'Имя', placeholder: 'Имя', value: firstName, onChange: setFirstName, isCalendar: false },
        { key: 'fatherName', label: 'Отчество', placeholder: 'Отчество', value: fatherName, onChange: setFatherName, isCalendar: false },
        { key: 'birthDate', label: 'Дата рождения', placeholder: 'дд.мм.гггг', value: birthDate, onChange: setBirthDate, isCalendar: true },
        { key: 'address', label: 'Домашний адрес', placeholder: 'Домашний адрес', value: address, onChange: setAddress, isCalendar: false },
        { key: 'metricNumber', label: 'Номер метрики', placeholder: 'Номер метрики', value: metricNumber, onChange: setMetricNumber, isCalendar: false },
        { key: 'ticketNumber', label: 'Номер путевки', placeholder: 'Номер путевки', value: ticketNumber, onChange: setTicketNumber, isCalendar: false },
        { key: 'ticketIssueDate', label: 'Дата выдачи путевки', placeholder: 'дд.мм.гггг', value: ticketIssueDate, onChange: setTicketIssueDate, isCalendar: true },
        { key: 'ticketEndDate', label: 'Дата окончания путевки', placeholder: 'дд.мм.гггг', value: ticketEndDate, onChange: setTicketEndDate, isCalendar: true },
    ];    

    const isPad = Platform.isPad;

    return (
        <View style={{ width: '100%', height: 'auto', rowGap: vs(15), flexWrap: isPad ? 'wrap' : 'nowrap', flexDirection: isPad ? 'row' : 'column', justifyContent: 'space-between', alignItems: 'center' }}>
            
            {fields?.map(field => (
                <View key={field?.key} style={{ width: isPad ? '32%' : '100%', height: 'auto', rowGap: vs(10) }}>
                    
                    <Text style={{ fontSize: Platform.isPad ? vs(16) : vs(14), fontWeight: '500' }}>{field?.label}</Text>
                    
                    {!field.isCalendar ?
                        <TextInput
                            value={field?.value}
                            onChangeText={field?.onChange}
                            placeholder={field?.placeholder}
                            style={{ paddingHorizontal: vs(16), paddingVertical: vs(14), borderWidth: 2, borderColor: '#EFEEFC', fontSize: Platform.isPad ? vs(16) : vs(14), borderRadius: vs(20), fontWeight: '500' }}
                        />
                    :
                        <TouchableOpacity onPress={() => { setActiveField(field.key); setShow(true); }} style={{ paddingHorizontal: vs(16), paddingVertical: vs(14), borderWidth: 2, borderColor: '#EFEEFC', borderRadius: vs(20), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            
                            <Text style={{fontSize: Platform.isPad ? vs(16) : vs(14), fontWeight: '500'}}>
                                {field?.value ? field.value.toLocaleDateString("ru-RU") : field.placeholder}
                            </Text>

                            <Ionicons name='calendar-clear-outline' size={vs(15)} />

                        </TouchableOpacity>
                    }
                    
                </View>
            ))}

            <Calendar show={show} setShow={setShow} activeField={activeField} fields={fields} />

        </View>
    )
}

export default GeneralInfo;
