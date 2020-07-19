import StorageUtil from './Storage';
import axios from 'axios';

const Storage = new StorageUtil();

const baseAPIURL = 'https://fitverse.herokuapp.com';

export default class ExerciseWorkoutUtil {

	getExercises = async () => {
		var token = await Storage.getData('jwt');

		var response = await axios.post(baseAPIURL + "/api/exercise/readAll", {
			token: token,
		}, {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			mode: 'cors'
		})

		return response.data;
	}

	makeExercise = async (name, notes) => {
		var token = await Storage.getData('jwt');

		var response = await axios.post(baseAPIURL + "/api/exercise/create", {
			token: token,
			name: name,
			notes: notes
		}, {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			mode: 'cors'
		})

		return response.data;
	}

	updateExercise = async (id, name, notes) => {
		var token = await Storage.getData('jwt');

		var response = await axios.post(baseAPIURL + "/api/exercise/update", {
			token: token,
			id: id,
			name: name,
			notes: notes,
		}, {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			mode: 'cors'
		})

		return response.data;
	}

	deleteExercise = async (id) => {
		var token = await Storage.getData('jwt');

		var response = await axios.post(baseAPIURL + "/api/exercise/delete", {
			token: token,
			id: id,
		}, {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			mode: 'cors'
		})

		return response.data;
	}






	getWorkouts = async () => {
		var token = await Storage.getData('jwt');

		var response = await axios.post(baseAPIURL + "/api/workout/readAll", {
			token: token
		}, {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			mode: 'cors'
		})

		return response.data;
	}

	makeWorkout = async (name, exercises, weekly, startDate, endDate ) => {
		var token = await Storage.getData('jwt');

		var response = await axios.post(baseAPIURL + "/api/workout/create", {
			token: token,
			name: name,
			exercises: exercises,
			weekly: weekly,
			startDate: startDate,
			endDate: endDate
		}, {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			mode: 'cors'
		})

		return response.data;
	}


	getExercisesDone = async (workout, date) => {
		var token = await Storage.getData('jwt');

		var response = await axios.post(baseAPIURL + "/api/workout/getDoneExercises", {
			token: token,
			workout: workout,
			date: date
		}, {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			mode: 'cors'
		})

		return response.data;
	}

	markExercisesDone = async (workout, date, exercise) => {
		var token = await Storage.getData('jwt');

		var response = await axios.post(baseAPIURL + "/api/workout/markExercisesDone", {
			token: token,
			workout: workout,
			date: date,
			addDoneExercises: [exercise]
		}, {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			mode: 'cors'
		}).then(console.log('marked done'))

		return response.data;
	}

	unmarkExercisesDone = async (workout, date, exercise) => {
		var token = await Storage.getData('jwt');

		var response = await axios.post(baseAPIURL + "/api/workout/markExercisesDone", {
			token: token,
			workout: workout,
			date: date,
			removeDoneExercises: [exercise]
		}, {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			mode: 'cors'
		}).then(console.log('marked undone'))

		return response.data;
	}
}