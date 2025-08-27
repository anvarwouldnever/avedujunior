// Calendar.tsx
import { View, Button, Modal } from 'react-native'
import React, { useState } from 'react'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { useScale } from '../../../hooks/useScale'

const Calendar = ({ show, setShow, activeField, fields }) => {
    const { s, vs } = useScale()

    const currentField = fields?.find(f => f?.key === activeField)

    const [tempDate, setTempDate] = useState<Date>(currentField?.value || new Date())

    const onChange = (event, selectedDate?: Date) => {
        if (selectedDate) {
            setTempDate(selectedDate)
        }
    }

    const done = () => {
        if (currentField) {
            currentField.onChange(tempDate)
        }
        setShow(false)
    }

    const cancel = () => {
        setShow(false)
    }

    if (!currentField) return null

    return (
        <Modal visible={show} animationType='fade' transparent={true}>
                
            <View style={{width: 'auto', maxWidth: 445, height: 'auto', rowGap: vs(20), alignItems: 'center', borderRadius: 20, backgroundColor: 'white', paddingHorizontal: vs(10), position: 'absolute', top: vs(200), alignSelf: 'center', flexDirection: 'column', justifyContent: 'space-between', shadowColor: 'black', shadowRadius: 400, shadowOffset: {width: 1, height: 1}, shadowOpacity: 1}}>
                
                <RNDateTimePicker
                    value={tempDate} 
                    onChange={onChange}
                    themeVariant="light"
                    style={{ marginTop: 1, width: '100%', maxWidth: 420, height: 'auto', backgroundColor: 'white'}}
                    accentColor="#6A5AE0"
                    display='inline'
                    mode='date'
                />

                <View style={{width: '100%', maxWidth: 460, height: 'auto', alignItems: 'center', marginBottom: vs(7), flexDirection: 'row', justifyContent: 'space-between', borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
                    
                    <Button color={'#6A5AE0'} onPress={cancel} title='Отменить' />
                        
                    <Button color={'#6A5AE0'} onPress={done} title='Готово' />
                        
                </View>

            </View>

        </Modal>
    )
}

export default Calendar;
