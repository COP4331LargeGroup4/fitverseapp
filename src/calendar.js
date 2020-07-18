import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Picker, ScrollView } from 'react-native';
import { Checkbox, IconButton, Button, List, Portal, Dialog, TextInput, Title } from 'react-native-paper';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';

import ExerciseWorkoutUtil from './ExerciseWorkout';

const ExerciseWorkout = new ExerciseWorkoutUtil();

export default function Calendar() {
	const CalRef = useRef(null);

	var numDaysInWeek = 7;
	var startDate = moment().startOf('week');
	var endDate = moment().add(numDaysInWeek, 'days');
	const today = moment().format('YYYY-MM-DD');

	const [events, setEvents] = useState();

	const getEvents = async () => {
		var workouts = await ExerciseWorkout.getWorkouts(startDate, endDate);

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
				dateContainerStyle:  {backgroundColor: "#CCCCCC"},
			}
		}
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


			//console.log(workoutList.length)

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

	const [addWorkoutState, setAddWorkoutState] = useState('info');
	const [workoutExercises, setWorkoutExercises] = useState([]);


	const [data, setData] = useState([]);
	const [key, setKey] = useState(0);


	const arr = ['1','2','3','4','5','6','7','8'];

	function RenderItem(item) {

		const [selected, setSelected] = useState(data[data.indexOf(item.value)].data);

		return (
			<View style={{ flexDirection: 'row', justifyContent: 'space-evenly'}}>
				<Picker 
					selectedValue={selected} 
					style={{width:'85%'}}
					onValueChange={(value) => {
						setSelected(value);

						var dataCopy = data;
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
					{ arr.map((val, index) => {
						return (
							<Picker.Item key={index} label={val.toString()} value={val.toString()} />
						)
					})}

				</Picker>
				<IconButton
					icon="trash-can" 
					style={{width:'15%'}}
					onPress={() => {
						// delete item
						var dataCopy = data;

						dataCopy.splice(data.indexOf(item.value), 1);

						setData(dataCopy);
					}}
				/>
			</View>
		);
	}

	function RenderList(props) {
		const listItems = props.data.map((val) => {
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
				onDateSelected={(date) => {setSelectedDate(date)}}
				markedDates={markedDatesFunc}
				customDatesStyles={customDateStyleFunc}
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
							value={dialogName}
							onChangeText={(text) =>{setDialogName(text)}}
						/>
						<TextInput
							label="Notes"
							mode="outlined"
							value={dialogNotes}
							onChangeText={(text) =>{setDialogNotes(text)}}
							multiline={true}
							numberOfLines={3}
						/>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={()=> {
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
								onPress={() => {setAddWorkoutState('info')}}
							>
								Workout Info
							</Button>
							<Button 
								mode={addWorkoutState === 'exercises' ? 'contained' : 'outlined'}
								onPress={() => {setAddWorkoutState('exercises')}}
							>
								Exercises
							</Button>
						</View>
						{addWorkoutState === 'info' ? <>
						<TextInput
							label="Workout Name test"
							mode="outlined"
						/>
						<TextInput
							label="Notes"
							mode="outlined"
							multiline={true}
							numberOfLines={3}
						/> 
						</> : <>
							<View style={{ flexDirection: 'row', justifyContent:'space-between'}}>
								<Title style={{height:'100%', justifyContent:'center'}}>Text</Title>
								<IconButton 
									icon='plus' 
									onPress={() => {
										//addValueToSelected(-1);
										//setData([...data, {data:-1, key:key}]);

										var dataCopy = data;

										// Add new exercise to data array
										dataCopy.push({data:arr[0], key:key});

										// Overwrite data and close window
										setData(dataCopy);

										setKey(key + 1);
									}}
								/>
							</View>
							<ScrollView style={{height:200}}>
								<RenderList data={data}/>
							</ScrollView>

		
						</>}
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={() => {
							hideWorkout();

							console.log(data);
							setData([]);
							setKey(0);
						}}>Done</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
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