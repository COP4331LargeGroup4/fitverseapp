import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Checkbox, IconButton, Button, List, Portal, Dialog, TextInput } from 'react-native-paper';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';

import ExerciseWorkoutUtil from './ExerciseWorkout';

const ExerciseWorkout = new ExerciseWorkoutUtil();

export function DashboardCalendar() {
	const CalRef = useRef(null);

	var dayToAdd = moment().format('YYYY-MM-DD');

	var numDaysInWeek = 7
	var startDate = moment().startOf('week');
	var endDate = moment().add(numDaysInWeek, 'days');

	const [events, setEvents] = useState();

	const getEvents = async () => {
		var workouts = await ExerciseWorkout.getWorkouts(startDate, endDate);

		//console.log(workouts);
		setEvents(workouts);
	}

	useEffect(() => {
		getEvents();
	}, []);

	//console.log("TEST");

	try {
		//console.log(events.workouts[0].weekly);

		//console.log(events.workouts[0].weekly)
	}
	catch
	{
		console.log('events not mounted yet');
	}

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

	const [workoutViews, setWorkoutViews] = useState(undefined);



	const onDateSelected = (date) => {
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

	const markedDatesFunc = date => {

		var dots = [];

		try {
			events.workouts.forEach(workout => {
				if (workout.weekly.includes(moment(date).day())) {
					dots = [...dots, { color: "#000000", selectedColor: "#333333" }];
				}
			})
		}
		catch {
			console.log('not loaded');
		}
		

		return { dots: dots };




		/*if (date.isoWeekday() === 4) { // Thursdays
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
		return {};*/
	}


	const WorkoutAcordian = () => {

		try {

			let workoutList = [];

			events.workouts.forEach(workout => {
				//console.log(workout);
				//console.log('date ' + moment(selectedDate).isoWeekday() == 7 ? 0 : moment(selectedDate).isoWeekday());

				//var index = workoutDone.length();
				//setWorkoutDone([...workoutDone, false])

				if (workout.weekly.includes(moment(selectedDate).day())) {

					workoutList.push(
						<List.Accordion title={workout.name} key={workout._id} expanded={true}>
							<View style={styles.day} >
								<View style={{
									width: '15%', alignItems: 'center',
									padding: 10,
									borderRightColor: 'grey',
									borderRightWidth: StyleSheet.hairlineWidth,
								}}>
									<Checkbox
										status={false ? 'checked' : 'unchecked'}
										onPress={() => {
											console.log('checkbox ' + workout.name);
											//setWorkoutDone()
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
					)
				}
			})


			console.log(workoutList.length)

			if (workoutList.length == 0) {
				return (<Text>No workouts</Text>);
			}
			return (workoutList);



		}
		catch {
			return (
				<Text>No workouts</Text>
			)
		}


	}



	return (
		<View style={styles.container}>
			<CalendarStrip
				ref={CalRef}

				style={{ height: '20%', paddingTop: 20, paddingBottom: 10 }}
				numDaysInWeek={numDaysInWeek}
				startingDate={startDate}
				useIsoWeekday={false}
				daySelectionAnimation={{ type: 'border', duration: 0, borderWidth: 1, borderHighlightColor: 'black' }}
				onDateSelected={onDateSelected}
				markedDates={markedDatesFunc}
				selectedDate={selectedDate}
			/>
			<ScrollView style={styles.scrollView}>

				<WorkoutAcordian />
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