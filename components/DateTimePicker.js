import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from '@chakra-ui/react'
import moment from 'moment'

export default function DateTimePicker() {
    const [startDate, setStartDate] = useState(new Date());
    const ChakraUIInput = forwardRef(({ value, onClick }, ref) => (
        <Input value={value} onClick={onClick} ref={ref} />
    ));

    return (
        <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            customInput={<ChakraUIInput />}
            showTimeSelect
            timeFormat="p"
            timeIntervals={15}
            dateFormat="Pp"
            filterDate={(date) => {
                return moment().toDate().getDate() <= date.getDate();
            }}
            filterTime={(date) => {
                return moment().milliseconds() > moment(date).milliseconds();
            }}
        />
    );

}