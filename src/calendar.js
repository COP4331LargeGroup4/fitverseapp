import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Picker, ScrollView } from 'react-native';
import { Checkbox, IconButton, Button, List, Portal, Dialog, TextInput, Title, Switch, ActivityIndicator } from 'react-native-paper';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

import ExerciseWorkoutUtil from './ExerciseWorkout';

const ExerciseWorkout = new ExerciseWorkoutUtil();

export default function Calendar() {
	const CalRef = useRef(null);

	const StartDateRef = useRef(null);
	const EndDateRef = useRef(null);

	var numDaysInWeek = 7;
	var startDate = moment().startOf('week');
	var endDate = moment().add(numDaysInWeek, 'days');
	const today = moment().format('YYYY-MM-DD');

	const [events, setEvents] = useState();

	const getEvents = async () => {
		var workouts = await ExerciseWorkout.getWorkouts();

		//console.log(workouts);
		setEvents(workouts);
	}

	useEffect(() => {
		getEvents();
	}, []);


	const [exerciseDialog, setExerciseDialog] = useState(false);
	const showExercise = () => setExerciseDialog(true);
	const hideExercise = () => setExerciseDialog(false);
	const [workoutDialog, setWorkoutDialog] = useState(false);
	const showWorkout = () => setWorkoutDialog(true);
	const hideWorkout = () => setWorkoutDialog(false);

	const [dialogName, setDialogName] = useState();
	const [dialogNotes, setDialogNotes] = useState();


	const [selectedDate, setSelectedDate] = useState(today);

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
	}

	const customDateStyleFunc = date => {
		if (moment(date).format('YYYY-MM-DD') == today) {
			return {
				dateContainerStyle: { backgroundColor: "#CCCCCC" },
			}
		}
	}




	const [repeatWeekly, setRepeatWeekly] = useState(true);
	const [settingDate, setSettingDate] = useState('start');
	const [workoutStartDate, setWorkoutStartDate] = useState(new Date());
	const [workoutEndDate, setWorkoutEndDate] = useState(new Date());
	const [repeatingDays, setRepeatingDays] = useState([false, false, false, false, false, false, false]);
	const [mode, setMode] = useState('date');
	const [show, setShow] = useState(false);

	const onChange = (event, selectedDate) => {

		if (event.type == 'set' || event.type == 'dismissed') {
			if (settingDate == 'start') {
				StartDateRef.current.blur();
			}
			else if (settingDate == 'end') {
				EndDateRef.current.blur();
			}
		}

		const currentDate = selectedDate || (settingDate == 'start' ? workoutStartDate : workoutEndDate);
		setShow(Platform.OS === 'ios');

		if (settingDate == 'start') {
			setWorkoutStartDate(currentDate);
		}
		else if (settingDate == 'end') {
			setWorkoutEndDate(currentDate);
		}

	};

	const showMode = currentMode => {
		setShow(true);
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode('date');
	};

	const showTimepicker = () => {
		showMode('time');
	};

	const [addWorkoutState, setAddWorkoutState] = useState('info');
	const [workoutExercises, setWorkoutExercises] = useState([]);

	const [workoutName, setWorkoutName] = useState('');

	const [data, setData] = useState([]);
	const [key, setKey] = useState(0);

	const [exercises, setExercises] = useState();

	const getExercises = async () => {
		var ex = await ExerciseWorkout.getExercises();
		setExercises(ex);
	}

	/*const refreshData = () => {
								setRefreshing(true);
		ExerciseWorkout.getExercises()
			.then((data) => {
								setData(data);
				setRefreshing(false);
			});

	}*/

	useEffect(() => {
		getExercises();
	}, []);

	function RenderItem(item) {

		const [selected, setSelected] = useState(data[data.indexOf(item.value)].data);

		return (
			<View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
				<Picker
					selectedValue={selected}
					style={{ width: '85%' }}
					onValueChange={(value) => {
						setSelected(value);

						var dataCopy = [...data];
						var itemCopy = item.value;

						itemCopy.data = value;

						for (var i = 0; i < dataCopy.length; i++) {
							if (dataCopy[i].key === itemCopy.key) {
								dataCopy[i] = itemCopy
							}
						}

						setData(dataCopy);
					}}
				>
					{exercises.exercises.map((val) => {
						return (
							<Picker.Item key={val._id} label={val.name} value={val._id} />
						)
					})}

				</Picker>
				<IconButton
					icon="trash-can"
					style={{ width: '15%' }}
					onPress={() => {
						// delete item
						var dataCopy = [...data];

						dataCopy.splice(data.indexOf(item.value), 1);

						setData(dataCopy);


					}}
				/>
			</View>
		);
	}

	function RenderList(props) {
		var listItems = props.data.map((val) => {
			return (
				<RenderItem key={val.key} value={val} />
			)
		});

		return (<View>{props.data.length === 0 ? <Text>Add some exercises to your workout!</Text> : listItems}</View>);
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
				onDateSelected={(date) => { setSelectedDate(date) }}
				markedDates={markedDatesFunc}
				customDatesStyles={customDateStyleFunc}
				selectedDate={selectedDate}
			/>
			<ScrollView style={styles.scrollView}>
				<WorkoutAcordian selectedDate={selectedDate} events={events} />
			</ScrollView>
			<View style={{ flexDirection: 'row', justifyContent: 'space-evenly', margin: 10 }}>
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
							value={dialogName}
							onChangeText={(text) => { setDialogName(text) }}
						/>
						<TextInput
							label="Notes"
							mode="outlined"
							value={dialogNotes}
							onChangeText={(text) => { setDialogNotes(text) }}
							multiline={true}
							numberOfLines={3}
						/>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={() => {
							ExerciseWorkout.makeExercise(dialogName, dialogNotes);
							hideExercise();
						}}>Done</Button>
					</Dialog.Actions>
				</Dialog>
				<Dialog visible={workoutDialog} onDismiss={hideWorkout}>
					<Dialog.Title>Add Workout</Dialog.Title>
					<Dialog.Content>
						<View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
							<Button
								mode={addWorkoutState === 'info' ? 'contained' : 'outlined'}
								onPress={() => { setAddWorkoutState('info') }}
							>
								Workout Info
							</Button>
							<Button
								mode={addWorkoutState === 'exercises' ? 'contained' : 'outlined'}
								onPress={() => { setAddWorkoutState('exercises') }}
							>
								Exercises
							</Button>
						</View>
						{addWorkoutState === 'info' ? <>
							<TextInput
								label="Workout Name"
								mode="outlined"
								value={workoutName}
								onChangeText={(text) => { setWorkoutName(text) }}
							/>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
								<TextInput
									ref={StartDateRef}

									label={repeatWeekly ? 'Start Date' : 'Date'}
									mode="outlined"
									style={!repeatWeekly ? { width: '100%' } : { width: '49%' }}

									caretHidden
									onFocus={() => {
										setSettingDate('start');
										showDatepicker();

									}}
									onBlur={() => { setShow(false) }}
									value={'📅 ' + workoutStartDate.toDateString()}
									showSoftInputOnFocus={false}
								/>

								{repeatWeekly && <TextInput
									ref={EndDateRef}

									label='End Date'
									mode="outlined"
									style={{ width: '49%' }}

									caretHidden
									onFocus={() => {
										setSettingDate('end');
										showDatepicker();
									}}
									onBlur={() => { setShow(false) }}
									value={'📅 ' + workoutEndDate.toDateString()}
									showSoftInputOnFocus={false}
								/>}

							</View>

							<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
								<Text>Repeat Weekly?</Text>
								<Switch value={repeatWeekly} onValueChange={() => {
									setRepeatWeekly(!repeatWeekly);
								}} />
							</View>


							{show && (
								<DateTimePicker
									testID="dateTimePicker"
									value={settingDate == 'start' ? workoutStartDate : workoutEndDate}
									mode={mode}
									is24Hour={true}
									display="default"
									onChange={onChange}
								/>
							)}

							{repeatWeekly && (<View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'stretch' }}>
								{['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((value, index) => {
									return (
										<Button
											style={{ width: '12%' }}
											key={index}
											compact={true}
											mode={repeatingDays[index] ? 'contained' : 'text'}
											onPress={() => {
												var dataCopy = [...repeatingDays];
												dataCopy[index] = !dataCopy[index];
												setRepeatingDays(dataCopy);
											}}
										>
											{value}
										</Button>
									)
								})}
							</View>
							)}


						</> : <>
								<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
									<Title style={{ height: '100%', justifyContent: 'center' }}>Text</Title>
									<IconButton
										icon='plus'
										onPress={() => {
											var dataCopy = [...data];
											dataCopy.push({ data: exercises.exercises[0]._id, key: key });
											setData(dataCopy);
											setKey(key + 1);
										}}
									/>
								</View>
								<ScrollView style={{ height: 200 }}>
									<RenderList data={data} />
								</ScrollView>
							</>}
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={() => {
							ExerciseWorkout.makeWorkout(
								workoutName,
								data.map(value => value.data),
								repeatWeekly ? repeatingDays.map((val, index) => { if (val) return index }).filter((val) => val != undefined) : [],
								workoutStartDate,
								repeatWeekly ? endDate : null
							).then(() => {
								setWorkoutName('');
								setData([]);
								setKey(0);

								setRepeatWeekly(true);
								setRepeatingDays([false, false, false, false, false, false, false]);
								setWorkoutStartDate(new Date());
								setWorkoutEndDate(new Date());
								
								hideWorkout();
							});
						}}>Done</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</View>
	)
}




function WorkoutAcordian(props) {
	const [doneExercises, setDoneExercises] = useState(null);

	const getDoneWorkouts = async () => {
		var workouts = await ExerciseWorkout.getWorkoutsExercisesDone(props.selectedDate);

		setDoneExercises(workouts.workouts.flatMap(x => x.exercises));
	}

	useEffect(() => {
		setDoneExercises(null);
		getDoneWorkouts();
	}, [props.selectedDate]);


	function RenderItemExercise(item) {

		const [status, setStatus] = useState(item.doneExercises == null ? null : item.doneExercises.includes(item.value._id));

		return (
			<List.Item
				title={item.value.name}
				description={item.value.notes ? item.value.notes : null}
				left={myprops => (
					<Checkbox {...myprops}
						status={status === null ? 'indeterminate' : (status ? 'checked' : 'unchecked')}
						onPress={() => {
							if (status) {
								ExerciseWorkout.unmarkExercisesDone(item.workoutId, props.selectedDate, item.value._id);
							}
							else {
								ExerciseWorkout.markExercisesDone(item.workoutId, props.selectedDate, item.value._id);
							}

							setStatus(!status);
						}}
					/>
				)}
			/>
		)
	}

	function RenderItemWorkoutAccordian(item) {

		const [accordionState, setAccordionState] = useState(true);
		const [status, setStatus] = useState(item.value.doneDates.findIndex(date => (moment.utc(date).diff(moment.utc(props.selectedDate), 'days') == 0)) != -1);

		return (
			<View style={styles.container, { flexDirection: 'row', justifyContent: 'center' }}>
				<View style={{ width: '10%', height: 55, alignItems: 'center', justifyContent: 'center', marginLeft: 20 }}>
					<Checkbox
						status={status ? 'checked' : 'unchecked'}
						onPress={() => {
							if (status) {
								ExerciseWorkout.unmarkWorkoutDone(item.value._id, props.selectedDate);
							}
							else {
								ExerciseWorkout.markWorkoutDone(item.value._id, props.selectedDate);
							}

							setStatus(!status)
						}}
					/>
				</View>

				<View style={{ width: '90%' }}>
					<List.Accordion
						title={item.value.name}
						expanded={accordionState}
						onPress={() => { setAccordionState(!accordionState) }}
						style={{ flex: 1, width: '100%', alignSelf: 'flex-end' }}
					>
						{item.value.exercises.length != 0 ?
							item.value.exercises.map((value) => {
								return (
									<RenderItemExercise
										key={value._id}
										value={value}
										workoutId={item.value._id}
										doneExercises={item.doneExercises}
									/>
								)
							}) :
							<Text>No Exercises for this Workout</Text>
						}
					</List.Accordion>
				</View>
			</View>
		)
	}

	try {
		let workoutList = [];

		props.events.workouts.forEach(workout => {
			if (workout.weekly.includes(moment(props.selectedDate).day())) {
				workoutList.push(
					<RenderItemWorkoutAccordian
						key={workout._id}
						value={workout}
						doneExercises={doneExercises}
					/>
				)
			}
		})

		if (workoutList.length == 0) {
			return (<Text>No workouts</Text>);
		}
		return (<View style={styles.container}>{workoutList}</View>);
	}
	catch {
		return (<ActivityIndicator animating={true} size='large' style={{height:'100%',display:"flex",justifyContent:"center",alignItems: "center"}} />);
	}


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