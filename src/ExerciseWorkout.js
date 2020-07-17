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






	getWorkouts = async (startDate, endDate) => {
		var token = await Storage.getData('jwt');

		var response = await axios.post(baseAPIURL + "/api/workout/readAllDateRange", {
			token: token,
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
}