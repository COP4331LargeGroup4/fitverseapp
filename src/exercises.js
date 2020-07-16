import React, { Component, useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Alert, FlatList } from 'react-native';
import { Checkbox, IconButton, Button, List, Portal, Dialog, Paragraph, TextInput } from 'react-native-paper';

import ExerciseWorkoutUtil from './ExerciseWorkout';

const ExerciseWorkout = new ExerciseWorkoutUtil();

export function Exercises() {

	const [data, setData] = useState();

	const [opened, setOpened] = useState();

	const [refresh, setRefresh] = useState(false);

	const [exerciseDialog, setExerciseDialog] = useState(false);
	const [deleteDialog, setDeleteDialog] = useState(false);
	const [exercise, setExercise] = useState(null);

	const getData = async () => {
		var exercises = await ExerciseWorkout.getExercises();
		setData(exercises);
	}

	useEffect(() => {
		getData();
	}, []);

	//console.log(data);

	const renderItem = ({ item }) => {

		const state = (item._id === opened)

		return (
			<>
				<View style={styles.day} >
					<View style={{
						width: '15%', alignItems: 'center',
						padding: 10,
						borderRightColor: 'grey',
						borderRightWidth: StyleSheet.hairlineWidth,
					}}>
						{item.notes != null && item.notes != '' ? <IconButton
							icon={state ? "chevron-down" : "chevron-up"}
							onPress={() => {
								// TODO: change to array to allow multiple opened at the same time
								setOpened(state ? null : item._id);
							}}
						/> : null}
					</View>
					<View style={[styles.allEvents, true ? { width: '65%', backgroundColor: 'lightgrey' } : {}]}>
						<Text style={{ margin: 5 }}>{item.name}</Text>
					</View>
					<View style={{ width: '20%', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: 'lightgrey' }}>
						<IconButton
							icon='settings'
							onPress={() => {
								setExercise(item);
								setExerciseDialog(true);
							}}

						/>
						<IconButton
							icon='delete'
							onPress={() => {
								setExercise(item);
								setDeleteDialog(true);
							}}
						/>
					</View>
				</View>
				{state && <View>
					<Text>{item.notes}</Text>
				</View>}
			</>
		)
	}

	const ExerciseDialog = (input) => {

		const dismiss = () => setExerciseDialog(false);

		if (exercise == null) {
			return null;
		}

		const [name, setName] = useState(exercise.name);
		const [notes, setNotes] = useState(exercise.notes);

		return (
			<Dialog visible={input.vis} onDismiss={dismiss}>
				<Dialog.Title>Edit Exercise</Dialog.Title>
				<Dialog.Content>
					<TextInput
						label="Name"
						value={name}
						onChangeText={(text) => {setName(text) }}
						mode="outlined"
					/>
					<TextInput
						label="Notes"
						mode="outlined"
						value={notes}
						onChangeText={(text) => {setNotes(text) }}
						multiline={true}
						numberOfLines={3}
					/>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={() => {
						ExerciseWorkout.updateExercise(exercise._id, name, notes);
						dismiss();
					}}>Done</Button>
				</Dialog.Actions>
			</Dialog>
		)
	}

	const DeleteDialog = (input) => {

		const dismiss = () => setDeleteDialog(false);

		if (exercise == null) {
			return null;
		}

		console.log(exercise);

		return (
			<Dialog visible={input.vis} onDismiss={dismiss}>
				<Dialog.Title>Delete Exercise</Dialog.Title>
				<Dialog.Content>
					<Text>Are you sure?</Text>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={() => {dismiss();}}>No</Button>
					<Button onPress={() => {
						ExerciseWorkout.deleteExercise(exercise._id);
						console.log(data.exercises);
						console.log(data.exercises.indexOf(exercise));
						var arr = data.exercises;
						arr.splice(data.exercises.indexOf(exercise),1);
						setData([arr])
						setRefresh(!refresh);
						dismiss();
					}}>Yes</Button>
				</Dialog.Actions>
			</Dialog>
		)
	}



	// TODO: https://reactnative.dev/docs/optimizing-flatlist-configuration#list-items
	// flatlist is slow, too much being done within unique items



	try {
		return (
			<>
				<Text>Print</Text>
				<FlatList
					data={data.exercises}
					renderItem={renderItem}
					keyExtractor={(item) => item._id}
					extraData={opened, exercise, exerciseDialog, deleteDialog, refresh}
					style={{ height: '90%' }}
				/>
				<Portal>
					<ExerciseDialog vis={exerciseDialog}/>
					<DeleteDialog vis={deleteDialog}/>
				</Portal>
			</>
		)
	}
	catch {
		return (
			<Text>No exercises, why dont you make some?</Text>
		)
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