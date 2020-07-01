import React, { Component } from 'react'
import {Text} from 'react-native'
import WeeklyCalendar from './react-native-weekly-calendar';




export function DashboardCalendar() {
	return(
		<WeeklyCalendar events={sampleEvents} style={{height:'50%', width:'100%'}} />
	)
}

export function PageCalendar() {
	return(
		<WeeklyCalendar events={sampleEvents} style={{ height: '100%', width: 'auto' }} />
	)
}







const sampleEvents = [
    { 'start': '2020-06-30 00:00:00', 'duration': '24:00:00', 'note': 'Walk my dog' },
    { 'start': '2020-07-01 14:00:00', 'duration': '01:00:00', 'note': 'Doctor\'s appointment' },
    { 'start': '2020-03-25 08:00:00', 'duration': '00:30:00', 'note': 'Morning exercise' },
    { 'start': '2020-03-25 14:00:00', 'duration': '02:00:00', 'note': 'Meeting with client' },
    { 'start': '2020-03-25 19:00:00', 'duration': '01:00:00', 'note': 'Dinner with family' },
    { 'start': '2020-03-26 09:30:00', 'duration': '01:00:00', 'note': 'Schedule 1' },
    { 'start': '2020-03-26 11:00:00', 'duration': '02:00:00', 'note': 'Schedule 2' },
    { 'start': '2020-03-26 15:00:00', 'duration': '01:30:00', 'note': 'Schedule 3' },
    { 'start': '2020-03-26 18:00:00', 'duration': '02:00:00', 'note': 'Schedule 4' },
    { 'start': '2020-03-26 22:00:00', 'duration': '01:00:00', 'note': 'Schedule 5' }
  ]