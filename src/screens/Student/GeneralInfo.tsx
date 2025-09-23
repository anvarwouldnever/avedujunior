// GeneralInfo.tsx
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useScale } from '../../hooks/useScale';
import Calendar from './GeneralInfo/Calendar';
import { Ionicons } from '@expo/vector-icons';
import { store } from '../../store/store';

const GeneralInfo = () => {

    const { s, vs, isTablet } = useScale();

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
        { 
          key: 'lastName', 
          label: store.labels?.lastName, 
          placeholder: store.labels?.lastName, 
          value: lastName, 
          onChange: setLastName, 
          isCalendar: false 
        },
        { 
          key: 'gender', 
          label: store.labels?.gender, 
          placeholder: store.labels?.gender, 
          value: gender, 
          onChange: setGender, 
          isCalendar: false 
        },
        { 
          key: 'firstName', 
          label: store.labels?.firstName, 
          placeholder: store.labels?.firstName, 
          value: firstName, 
          onChange: setFirstName, 
          isCalendar: false 
        },
        { 
          key: 'fatherName', 
          label: store.labels?.patronymic, 
          placeholder: store.labels?.patronymic, 
          value: fatherName, 
          onChange: setFatherName, 
          isCalendar: false 
        },
        { 
          key: 'birthDate', 
          label: store.labels?.dateOfBirth, 
          placeholder: 'дд.мм.гггг', 
          value: birthDate, 
          onChange: setBirthDate, 
          isCalendar: true 
        },
        { 
          key: 'address', 
          label: store.labels?.homeAddress,   // ⚠️ в JSON есть homeAddress: "Домашний адрес"
          placeholder: store.labels?.homeAddress, 
          value: address, 
          onChange: setAddress, 
          isCalendar: false 
        },
        { 
          key: 'metricNumber', 
          label: store.labels?.metricNumber, 
          placeholder: store.labels?.metricNumber, 
          value: metricNumber, 
          onChange: setMetricNumber, 
          isCalendar: false 
        },
        { 
          key: 'ticketNumber', 
          label: store.labels?.voucherNumber, 
          placeholder: store.labels?.voucherNumber, 
          value: ticketNumber, 
          onChange: setTicketNumber, 
          isCalendar: false 
        },
        { 
          key: 'ticketIssueDate', 
          label: store.labels?.voucherIssueDate, 
          placeholder: 'дд.мм.гггг', 
          value: ticketIssueDate, 
          onChange: setTicketIssueDate, 
          isCalendar: true 
        },
        { 
          key: 'ticketEndDate', 
          label: store.labels?.voucherExpiryDate, 
          placeholder: 'дд.мм.гггг', 
          value: ticketEndDate, 
          onChange: setTicketEndDate, 
          isCalendar: true 
        },
    ];
      
    const isPad = isTablet;

    return (
        <View style={{ width: '100%', height: 'auto', rowGap: vs(15), flexWrap: isPad ? 'wrap' : 'nowrap', flexDirection: isPad ? 'row' : 'column', justifyContent: 'space-between', alignItems: 'center' }}>
            
            {fields?.map(field => (
                <View key={field?.key} style={{ width: isPad ? '32%' : '100%', height: 'auto', rowGap: vs(10) }}>
                    
                    <Text style={{ fontSize: isTablet ? vs(16) : vs(14), fontWeight: '500' }}>{field?.label}</Text>
                    
                    {!field.isCalendar ?
                        <TextInput
                            value={field?.value}
                            onChangeText={field?.onChange}
                            placeholder={field?.placeholder}
                            placeholderTextColor="#999"
                            style={{ paddingHorizontal: vs(16), paddingVertical: vs(14), borderWidth: 2, borderColor: '#EFEEFC', fontSize: isTablet ? vs(16) : vs(14), borderRadius: vs(20), fontWeight: '500' }}
                        />
                    :
                        <TouchableOpacity onPress={() => { setActiveField(field.key); setShow(true); }} style={{ paddingHorizontal: vs(16), paddingVertical: vs(14), borderWidth: 2, borderColor: '#EFEEFC', borderRadius: vs(20), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            
                            <Text style={{fontSize: isTablet ? vs(16) : vs(14), fontWeight: '500'}}>
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
