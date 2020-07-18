import React, { Component, useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Alert, FlatList, ScrollView, RefreshControl } from 'react-native';
import { Checkbox, IconButton, Button, List, Portal, Dialog, Paragraph, TextInput } from 'react-native-paper';

import ExerciseWorkoutUtil from './ExerciseWorkout';
import { mixed } from 'yup';

const ExerciseWorkout = new ExerciseWorkoutUtil();

export default function Exercises() {

	const [data, setData] = useState();

	const [makeDialog, setMakeDialog] = useState(false);
	const [editDialog, setEditDialog] = useState(false);
	const [deleteDialog, setDeleteDialog] = useState(false);
	const [exercise, setExercise] = useState(null);

	const [refreshing, setRefreshing] = useState(false);

	var listItems;

	const getData = async () => {
		var exercises = await ExerciseWorkout.getExercises();
		setData(exercises);
	}

	const refreshData = () => {
		setRefreshing(true);
		ExerciseWorkout.getExercises()
			.then((data) => {
				setData(data);
				setRefreshing(false);
			});

	}

	useEffect(() => {
		getData();
	}, []);


	const MakeExerciseDialog = () => {

		const dismiss = () => setMakeDialog(false);

		const [name, setName] = useState();
		const [notes, setNotes] = useState();

		const [loading, setLoading] = useState(false);

		return (
			<Dialog visible={makeDialog} onDismiss={dismiss}>
				<Dialog.Title>Add Exercise</Dialog.Title>
				<Dialog.Content>
					<TextInput
						label="Name"
						value={name}
						disabled={loading}
						onChangeText={(text) => { setName(text) }}
						mode="outlined"
					/>
					<TextInput
						label="Notes"
						mode="outlined"
						value={notes}
						disabled={loading}
						onChangeText={(text) => { setNotes(text) }}
						multiline={true}
						numberOfLines={3}
					/>
				</Dialog.Content>
				<Dialog.Actions>
					<Button
						loading={loading}
						onPress={() => {
							setLoading(true);

							// Api request to edit data on server and wait for response
							ExerciseWorkout.makeExercise(name, notes)
								.then(ret => {
									// Make copy of data
									var dataCopy = data;

									// Add new exercise to data array
									dataCopy.exercises.push(ret.exercise);

									// Overwrite data and close window
									setData(dataCopy);
									dismiss();
								});
						}}>Done</Button>
				</Dialog.Actions>
			</Dialog>
		)
	}

	const EditExerciseDialog = () => {

		const dismiss = () => setEditDialog(false);

		if (exercise == null) {
			return null;
		}

		const [name, setName] = useState(exercise.name);
		const [notes, setNotes] = useState(exercise.notes);

		return (
			<Dialog visible={editDialog} onDismiss={dismiss}>
				<Dialog.Title>Edit Exercise</Dialog.Title>
				<Dialog.Content>
					<TextInput
						label="Name"
						value={name}
						onChangeText={(text) => { setName(text) }}
						mode="outlined"
					/>
					<TextInput
						label="Notes"
						mode="outlined"
						value={notes}
						onChangeText={(text) => { setNotes(text) }}
						multiline={true}
						numberOfLines={3}
					/>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={() => {
						// Api request to edit data on server
						ExerciseWorkout.updateExercise(exercise._id, name, notes);

						// Make copy of data and selected exercise
						var dataCopy = data;
						var exerciseCopy = exercise;

						// Edit fields
						exerciseCopy.name = name;
						exerciseCopy.notes = notes;

						// Find selected exercise in local data and overwrite it
						for (var i = 0; i < dataCopy.exercises.length; i++) {
							if (dataCopy.exercises[i]._id === exercise._id) {
								dataCopy.exercises[i] = exerciseCopy
							}
						}

						// Overwrite data and close window
						setData(dataCopy);
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

		//console.log(exercise);

		return (
			<Dialog visible={input.vis} onDismiss={dismiss}>
				<Dialog.Title>Delete Exercise</Dialog.Title>
				<Dialog.Content>
					<Text>Are you sure?</Text>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={() => { dismiss(); }}>No</Button>
					<Button onPress={() => {
						// Api request to delete data on server
						ExerciseWorkout.deleteExercise(exercise._id);

						// Make copy of data
						var dataCopy = data;

						// Find exercise in local data and remove it
						dataCopy.exercises.splice(dataCopy.exercises.indexOf(exercise), 1);

						// Overwrite data and close window
						setData(dataCopy);
						dismiss();
					}}>Yes</Button>
				</Dialog.Actions>
			</Dialog>
		)
	}


	function RenderItem(item) {
		//console.log(item.value);
		return (
			<View>
				<List.Item
					title={item.value.name}
					description={item.value.notes != null ? item.value.notes : null}
					right={props => (
						<View style={{ flexDirection: 'row' }}>
							<IconButton {...props} icon="settings" onPress={() => {
								setExercise(item.value);
								setEditDialog(true);
							}} />
							<IconButton {...props} icon="trash-can" onPress={() => {
								setExercise(item.value);
								setDeleteDialog(true);
							}} />
						</View>
					)} />
			</View>
		);
	}

	function RenderList(props) {
		listItems = props.data.map((val) => {
			return (
				<RenderItem key={val._id} value={val} />
			)
		});

		return (<View>{listItems}</View>);
	}

	try {
		if (data != null) {
			return (
				<>
					<ScrollView
						style={styles.scrollView}
						refreshControl={
							<RefreshControl refreshing={refreshing} onRefresh={refreshData} />
						}
					>
						<RenderList data={data.exercises} />
					</ScrollView>
					<View style={{ flexDirection: 'row', justifyContent: 'center', margin: 10 }}>
						<Button
							style={{ width: '40%' }}
							mode={"contained"}
							onPress={() => { setMakeDialog(true) }}
						>
							Add Exercise
						</Button>

					</View>

					<Portal>
						<MakeExerciseDialog vis={makeDialog} />
						<EditExerciseDialog vis={editDialog} />
						<DeleteDialog vis={deleteDialog} />
					</Portal>
				</>
			)
		}
		return (
			<Text>No exercises, why dont you make some?</Text>
		);
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