import StorageUtil from './Storage';
import axios from 'axios';
import moment from 'moment';

const Storage = new StorageUtil();

export default class ExerciseWorkoutUtil {

	getExercises = async () => {
		var token = await Storage.getData('jwt');

		var response = await axios.post(global.baseAPIURL + "/api/exercise/readAll", {
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

		var response = await axios.post(global.baseAPIURL + "/api/exercise/create", {
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

		var response = await axios.post(global.baseAPIURL + "/api/exercise/update", {
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

		var response = await axios.post(global.baseAPIURL + "/api/exercise/delete", {
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
			startDate: moment(startDate).format('YYYY-MM-DD'),
			endDate: moment(endDate).format('YYYY-MM-DD')
		}, {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			mode: 'cors'
		})

		return response.data;
	}


	getWorkoutExercisesDone = async (workout, date) => {
		var token = await Storage.getData('jwt');

		var response = await axios.post(baseAPIURL + "/api/workout/getDoneExercises", {
			token: token,
			workout: workout,
			date: moment(date).format('YYYY-MM-DD')
		}, {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			mode: 'cors'
		})

		return response.data;
	}

	getWorkoutsExercisesDone = async (date) => {
		var token = await Storage.getData('jwt');

		var response = await axios.post(baseAPIURL + "/api/workout/getAllDoneExercisesOnDate", {
			token: token,
			date: moment(date).format('YYYY-MM-DD')
		}, {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			mode: 'cors'
		})

		return response.data;
	}


	markWorkoutDone = async (workout, date) => {
		var token = await Storage.getData('jwt');

		var response = await axios.post(baseAPIURL + "/api/workout/update", {
			token: token,
			id: workout,
			addDoneDates: [moment.utc(date).format('YYYY-MM-DD').toString()]
		}, {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			mode: 'cors'
		})

		return response.data;
	}

	unmarkWorkoutDone = async (workout, date) => {
		var token = await Storage.getData('jwt');

		var response = await axios.post(baseAPIURL + "/api/workout/update", {
			token: token,
			id: workout,
			removeDoneDates: [moment.utc(date).format('YYYY-MM-DD').toString()]
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
			date: moment(date).format('YYYY-MM-DD'),
			addDoneExercises: [exercise.toString()]
		}, {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			mode: 'cors'
		})

		return response.data;
	}

	unmarkExercisesDone = async (workout, date, exercise) => {
		var token = await Storage.getData('jwt');

		var response = await axios.post(baseAPIURL + "/api/workout/markExercisesDone", {
			token: token,
			workout: workout,
			date: moment(date).format('YYYY-MM-DD'),
			removeDoneExercises: [exercise]
		}, {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			mode: 'cors'
		})

		return response.data;
	}
}