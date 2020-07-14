import React, { Component, useState, useEffect, useRef } from 'react';
import { Image, View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Checkbox, IconButton, Button, List, Portal, Dialog, Paragraph, TextInput } from 'react-native-paper';
import CalendarStrip from 'react-native-calendar-strip';

import { Dimensions, Text } from 'react-native';
import moment from 'moment';


const logo = {
	uri: 'https://reactnative.dev/img/tiny_logo.png',
	width: 64,
	height: 64
};


export function DashboardCalendar() {
	const CalRef = useRef(null);

	var dayToAdd = moment().format('YYYY-MM-DD')

	var myEventsList = [
		{
			title: 'Chest and Triceps',
			date: '2020-06-29',
			//startRecur: currentEvent.repeat.length ? '2020-06-23' : '',
			//endRecur: '',
			//daysOfWeek: currentEvent.repeat.length ? currentEvent.repeat : ''
		},
		{
			title: 'Chest and Triceps',
			date: '2020-06-30',
			//startRecur: currentEvent.repeat.length ? '2020-06-23' : '',
			//endRecur: '',
			//daysOfWeek: currentEvent.repeat.length ? currentEvent.repeat : ''
		},
		{
			title: 'Chest and Triceps',
			date: '2020-07-01',
			//startRecur: currentEvent.repeat.length ? '2020-06-23' : '',
			//endRecur: '',
			//daysOfWeek: currentEvent.repeat.length ? currentEvent.repeat : ''
		},
	]

	const [exerciseDialog, setExerciseDialog] = useState(false);
	const showExercise = () => setExerciseDialog(true);
	const hideExercise = () => setExerciseDialog(false);
	const [workoutDialog, setWorkoutDialog] = useState(false);
	const showWorkout = () => setWorkoutDialog(true);
	const hideWorkout = () => setWorkoutDialog(false);


	const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
	const [workout, setWorkout] = useState(false);
	const [markedDates, setMarkedDates] = useState(myEventsList.map(a => a.date));



	handleOnPressDate = (date) => {
		setSelectedDate(date);
		//console.log(selectedDate);
		/*var events = [];
		eventDate.forEach((event, index) => {

			if (event == moment(selectedDate).format('YYYY-MM-DD'))
			{
				events.push(index);
			}
		})
		setEventIDs(events);*/
	}

	function addEvent() {
		var event = markedDates;
		event.push(dayToAdd);
		dayToAdd = moment(dayToAdd).add(1, 'day').format('YYYY-MM-DD'); // Testing function
		setMarkedDates(event);
		CalRef.current.forceUpdate();
	}

	markedDatesFunc = date => {
		if (date.isoWeekday() === 4) { // Thursdays
			return {
				dots: [{
					color: "#000000",
					selectedColor: "#333333",
				}]
			};
		}
		// Line
		if (date.isoWeekday() === 6) { // Saturdays
			return {
				lines: [{
					color: "#000000",
					selectedColor: "#333333",
				}]
			};
		}
		return {};
	}



	return (
		<View style={styles.container}>
			<CalendarStrip
				ref={CalRef}

				style={{ height: '20%', paddingTop: 20, paddingBottom: 10 }}
				numDaysInWeek={7}
				startingDate={moment().startOf('week')}
				useIsoWeekday={false}
				daySelectionAnimation={{ type: 'border', duration: 0, borderWidth: 1, borderHighlightColor: 'black' }}

				markedDates={markedDatesFunc}
				selectedDate={selectedDate}
			/>
			<ScrollView style={styles.scrollView}>
				<List.Accordion title="test">
					<View style={styles.day} >
						<View style={{
							width: '15%', alignItems: 'center',
							padding: 10,
							borderRightColor: 'grey',
							borderRightWidth: StyleSheet.hairlineWidth,
						}}>
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
						<View style={{ width: '20%', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: 'lightgrey' }}>
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

				</List.Accordion>
				<List.Accordion title="test">
					<View style={styles.day} >
						<View style={{
							width: '15%', alignItems: 'center',
							padding: 10,
							borderRightColor: 'grey',
							borderRightWidth: StyleSheet.hairlineWidth,
						}}>
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
						<View style={{ width: '20%', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: 'lightgrey' }}>
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

				</List.Accordion>
				<List.Accordion title="test">
					<View style={styles.day} >
						<View style={{
							width: '15%', alignItems: 'center',
							padding: 10,
							borderRightColor: 'grey',
							borderRightWidth: StyleSheet.hairlineWidth,
						}}>
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
						<View style={{ width: '20%', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: 'lightgrey' }}>
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

				</List.Accordion>
				<List.Accordion title="test">
					<View style={styles.day} >
						<View style={{
							width: '15%', alignItems: 'center',
							padding: 10,
							borderRightColor: 'grey',
							borderRightWidth: StyleSheet.hairlineWidth,
						}}>
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
						<View style={{ width: '20%', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: 'lightgrey' }}>
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

				</List.Accordion>
			</ScrollView>
			<View style={{ flexDirection: 'row', justifyContent: 'space-evenly', margin: 10 }}>
				<Button
					style={{ width: '40%' }}
					mode={"contained"}
					onPress={showExercise}
				>
					Add Exercise
				</Button>
				<Button
					style={{ width: '40%' }}
					mode={"contained"}
					onPress={showWorkout}
				>
					Add Workout
				</Button>
			</View>

			<Portal>
				<Dialog visible={exerciseDialog} onDismiss={hideExercise}>
					<Dialog.Title>Add Exercise</Dialog.Title>
					<Dialog.Content>
						<TextInput
							label="Exercise Name"
							mode="outlined"
						/>
						<TextInput
							label="Notes"
							mode="outlined"
							multiline={true}
							numberOfLines={3}
						/>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={hideExercise}>Done</Button>
					</Dialog.Actions>
				</Dialog>
				<Dialog visible={workoutDialog} onDismiss={hideWorkout}>
					<Dialog.Title>Add Workout</Dialog.Title>
					<Dialog.Content>
					<TextInput
							label="Workout Name"
							mode="outlined"
						/>
						<TextInput
							label="Notes"
							mode="outlined"
							multiline={true}
							numberOfLines={3}
						/>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={hideWorkout}>Done</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
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
	container: {
		width: '100%',
		height: '100%',
		flex: 1
	},
	scrollView: {
		flex: 1,
		height: '70%'
	},
	component: {
		width: '100%',//Dimensions.get('window').width,
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