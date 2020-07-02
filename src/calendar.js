import React, { Component, useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Checkbox, IconButton } from 'react-native-paper';
import CalendarStrip from 'react-native-calendar-strip';

import { Dimensions, Text } from 'react-native';
import moment from 'moment';





export function DashboardCalendar() {
	const headerRef = useRef(null);
	const [selDate, setSelDate] = useState(moment());
	const [workout, setWorkout] = useState(false);

	const onDateSelected = (date) => {
		//console.log(date.format('YYYY-MM-DD'));
		setSelDate(date);
	}

	const onHeaderSelected = (dateRange) => { // TODO: fix having to click twice
		console.log('header clicked');
		setSelDate(moment());
		headerRef.current.setSelectedDate(0);
		headerRef.current.updateWeekView(moment().startOf('week'));
		headerRef.current.setSelectedDate(moment());
		
	}

	return (
		<View style={styles.container}>
			<CalendarStrip 
				ref={headerRef}
				style={{ height: 100, paddingTop: 20, paddingBottom: 5 }}
				calendarColor={'#416165'}
				useIsoWeekday={false}
				startingDate={moment().startOf('week')}
				selectedDate={selDate}
				onHeaderSelected={onHeaderSelected}
				daySelectionAnimation={{ type: 'border', duration: 0, borderWidth: 1, borderHighlightColor: 'black' }}
				
				onDateSelected={onDateSelected}
				
			/>
			<View style={styles.day} >
			<View style={{width: '15%', alignItems: 'center',
						padding: 10,
						borderRightColor: 'grey',
						borderRightWidth: StyleSheet.hairlineWidth,}}>
					<Checkbox
						status={workout ? 'checked' : 'unchecked'}
						onPress={() => {
							setWorkout(!workout);
						}}
					/>
				</View>
				<View style={[styles.allEvents, true ? { width: '65%', backgroundColor: 'lightgrey' } : {}]}>
					<Text>Test</Text>
				</View>
				<View style={{width: '20%', flex:1,flexDirection: 'row',alignItems: 'center',justifyContent:'space-evenly', backgroundColor: 'lightgrey'}}>
					<IconButton
						icon='settings'
						onPress={() => console.log('settings')}
					/>
					<IconButton
						icon='delete'
						onPress={() => console.log('delete')}
					/>
				</View>
			</View>
			<View style={styles.day} >
				<View style={{width: '15%', alignItems: 'center',
						padding: 10,
						borderRightColor: 'grey',
						borderRightWidth: StyleSheet.hairlineWidth,}}>
					<Checkbox
						status={workout ? 'checked' : 'unchecked'}
						onPress={() => {
							setWorkout(!workout);
						}}
					/>
				</View>
				<View style={[styles.allEvents, true ? { width: '65%', backgroundColor: 'lightgrey' } : {}]}>
					<Text>Test</Text>
				</View>
				<View style={{width: '20%', flex:1,flexDirection: 'row',alignItems: 'center',justifyContent:'space-evenly', backgroundColor: 'lightgrey'}}>
					<IconButton
						icon='settings'
						onPress={() => console.log('settings')}
					/>
					<IconButton
						icon='delete'
						onPress={() => console.log('delete')}
					/>
				</View>
			</View>

		</View>
	)
}


export function PageCalendar() {
	return (
		<View style={styles.container}>
			<CalendarStrip
				style={{ height: 150, paddingTop: 20, paddingBottom: 10 }}
			/>
		</View>
	)
}







const styles = StyleSheet.create({
	container: { flex: 1 },
	component: {
		width: Dimensions.get('window').width,
		alignItems: 'center',
		backgroundColor: 'white',
		borderColor: 'grey',
		borderTopWidth: StyleSheet.hairlineWidth,
		borderBottomWidth: StyleSheet.hairlineWidth
	},
	header: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 5
	},
	arrowButton: {
		paddingHorizontal: 10
	},
	title: {
		color: 'grey',
		fontWeight: 'bold'
	},
	week: {
		width: '100%',
		borderBottomColor: 'grey',
		borderBottomWidth: StyleSheet.hairlineWidth,
		paddingVertical: 5
	},
	weekdayLabelContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 10
	},
	weekdayLabel: {
		flex: 1,
		alignItems: 'center'
	},
	weekdayLabelText: {
		color: 'grey'
	},
	weekdayNumberContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 5
	},
	weekDayNumber: {
		flex: 1,
		width: 30,
		height: 30,
		alignItems: 'center',
		justifyContent: 'center'
	},
	weekDayNumberCircle: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 30,
		height: 30,
		borderRadius: 30 / 2,
	},
	weekDayNumberTextToday: {
		color: 'white'
	},
	schedule: {
		width: '100%'
	},
	pickerButtons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: 'white'
	},
	picker: {
		backgroundColor: 'white',
		paddingBottom: 20
	},
	modal: {
		width: '100%',
		justifyContent: 'flex-end',
		alignItems: 'flex-end'
	},
	blurredArea: {
		flex: 1,
		opacity: 0.7,
		backgroundColor: 'black'
	},
	modalButton: {
		padding: 15
	},
	modalButtonText: {
		fontSize: 20
	},
	indicator: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(255, 255, 255, 0.7)',
		position: 'absolute'
	},
	day: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		borderTopColor: 'grey',
		borderBottomColor: 'grey',
		borderTopWidth: StyleSheet.hairlineWidth,
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	dayLabel: {
		width: '20%',
		alignItems: 'center',
		padding: 10,
		borderRightColor: 'grey',
		borderRightWidth: StyleSheet.hairlineWidth,
	},
	monthDateText: {
		fontSize: 20
	},
	dayText: {

	},
	allEvents: {
		width: '80%',
	},
	event: {
		flex: 1,
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10
	},
	eventDuration: {
		width: '30%',
		justifyContent: 'center'
	},
	durationContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	durationDot: {
		width: 4,
		height: 4,
		backgroundColor: 'grey',
		marginRight: 5,
		alignSelf: 'center',
		borderRadius: 4 / 2,
	},
	durationDotConnector: {
		height: 20,
		borderLeftColor: 'grey',
		borderLeftWidth: StyleSheet.hairlineWidth,
		position: 'absolute',
		left: 2
	},
	durationText: {
		color: 'grey',
		fontSize: 12
	},
	eventNote: {
	},
	lineSeparator: {
		width: '100%',
		borderBottomColor: 'lightgrey',
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	dot: {
		width: 4,
		height: 4,
		marginTop: 1,
		alignSelf: 'center',
		borderRadius: 4 / 2,
		position: 'absolute',
		bottom: '10%'
	}
});