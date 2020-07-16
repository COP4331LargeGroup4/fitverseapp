import React, { Component, useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Alert, FlatList } from 'react-native';
import { Checkbox, IconButton, Button, List, Portal, Dialog, Paragraph, TextInput } from 'react-native-paper';

import ExerciseWorkoutUtil from './ExerciseWorkout';

const ExerciseWorkout = new ExerciseWorkoutUtil();

export function Exercises() {

	const [data, setData] = useState();

	const [opened, setOpened] = useState([])

	const getData = async () => {
		var exercises = await ExerciseWorkout.getExercises();
		setData(exercises);
	}

	useEffect(() => {
		getData();
	}, []);

	//console.log(data);

	const renderItem = ({ item }) => {

		var state = opened.includes(item._id);

		return (
			<>
			<View style={styles.day} >
				<View style={{
					width: '15%', alignItems: 'center',
					padding: 10,
					borderRightColor: 'grey',
					borderRightWidth: StyleSheet.hairlineWidth,
				}}>
					<IconButton
						icon={state ? "chevron-down" : "chevron-up"}
						onPress={() => {
							var arr = opened;

							if (state) {
								arr = arr.splice(arr.indexOf(item._id), 1)
								console.log(arr);
								setOpened(arr);
							}
							else {
								console.log([...arr, item._id]);
								setOpened([...arr, item._id]);
							}
							console.log(opened);
						}}
					/>
				</View>
				<View style={[styles.allEvents, true ? { width: '65%', backgroundColor: 'lightgrey' } : {}]}>
					<Text>{item.name}</Text>
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
			{state && <View>
				<Text>Test</Text>
			</View>}
			</>
		)
	}

	try {
		return (
			<>
				<Text>Print</Text>
				<FlatList
					data={data.exercises}
					renderItem={renderItem}
					keyExtractor={(item) => item._id}
					style={{height:'90%'}}
				/>
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