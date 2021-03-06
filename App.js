import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, SafeAreaView, View, Image, Dimensions } from 'react-native';
import { BottomNavigation, Button, TextInput, HelperText, ActivityIndicator } from 'react-native-paper';
import SafeViewAndroid from "./src/SafeAndroidView";
import Profile from './src/profile';
import Logo from './assets/logo.svg'
import Calendar from './src/calendar';
import Exercises from './src/exercises';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import StorageUtil from './src/Storage';

const Storage = new StorageUtil();

global.baseAPIURL = 'https://fitverse.herokuapp.com';

const theme = {
	...DefaultTheme,
	roundness: 2,
	colors: {
		...DefaultTheme.colors,
		primary: '#416165',
		accent: '#ACB0BD',
		background: '#FFFFFF'
	},
};

const App = () => {

	const [jwt, setJWT] = useState(null);
	const setJWTfunc = (token) => setJWT(token);

	const DashboardRoute = () =>
		<View style={styles.container}>
			<Logo
				width='100%'
				height='10%'

				style={styles.container}
			/>
			<Calendar />

		</View >;

	const ExercisesRoute = () =>
		<View style={styles.container}>
			<Exercises />
		</View >;

	const ProfileRoute = () =>
		<View style={styles.container}>
			<Profile />
			<Button
				icon="alert-octagon"
				mode="contained"
				onPress={() => {
					Storage.clearData();
					setJWTfunc(-1);
				}}
				style={{
					width: '40%',
					alignSelf: 'center',
					position: 'absolute',
					bottom: 0,
					margin: 10
				}}
			>
				Log Out
			</Button>
		</View >;

	const Dashboard = () => {

		const [index, setIndex] = React.useState(0);
		const [routes] = React.useState([
			{ key: 'dashboard', title: 'Dashboard', icon: 'home' },
			{ key: 'exercises', title: 'My Exercises', icon: 'dumbbell' },
			{ key: 'profile', title: 'Profile', icon: 'account' }, // TODO: Change to https://materialdesignicons.com/icon/account-cowboy-hat
		]);

		const renderScene = BottomNavigation.SceneMap({
			dashboard: DashboardRoute,
			exercises: ExercisesRoute,
			profile: ProfileRoute,
		});

		return (
			<BottomNavigation
				navigationState={{ index, routes }}
				onIndexChange={setIndex}
				renderScene={renderScene}
			/>
		);
	};

	const styles = StyleSheet.create({
		container: {
			flex: 1,
		},
		logo: {
			alignItems: 'center',
			flex: 1,
			justifyContent: 'center'
		}
	});

	const WelcomePage = () => {
		const [pageState, setPageState] = useState('signin');

		const [email, setEmail] = useState(null);
		const [password, setPassword] = useState(null);

		const [firstname, setFirstname] = useState(null);
		const [lastname, setLastname] = useState(null);

		return (
			<>
				<Logo
					width='100%'
					height='10%'
					style={styles.container}
				/>
				<View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10, marginBottom:10 }}>
					<Button
						style={{ width: '40%' }}
						mode={pageState == 'signin' ? "contained" : "outlined"}
						onPress={() => setPageState('signin')}
					>
						Log in
					</Button>
					<Button
						style={{ width: '40%' }}
						mode={pageState != 'signin' ? "contained" : "outlined"}
						onPress={() => setPageState('signup')}
					>
						Sign up
					</Button>
				</View>
				{pageState == 'signin' ?
					<View>
						<Text style={{ textAlign: 'center' }}>Log in to your fitverse account</Text>
						<SignInForm />
					</View>
					:
					<View>
						<Text style={{ textAlign: 'center' }}>Sign up for a fitverse account</Text>
						<SignUpForm />
					</View>

				}
			</>
		);
	}

	const SignInForm = () => {
		const [sending, setSending] = useState(false);

		return (
			<Formik
				initialValues={{ email: '', password: '' }}
				validationSchema={Yup.object({
					email: Yup.string("Enter your email")
						.email("Enter valid email")
						.required("Email is required"),
					password: Yup.string("Enter your password")
						.min(8, "Password must contain at least 8 character")
						.required("Password is required"),
				})}
				onSubmit={(values, actions) => {
					setSending(true);
					let creds = { email: values.email, password: values.password };
					axios.post(global.baseAPIURL + '/api/user/login', creds)
						.then((data) => {
							Storage.setData('usercreds', JSON.stringify(creds));
							Storage.setData('jwt', data.data.token);
							Storage.setData('user', JSON.stringify(data.data.user));
							setJWTfunc(data.data.token);
						})
						.catch((data) => {
							setSending(false);
							actions.setErrors({
								email:'email or password is incorrect',
								password:'email or password is incorrect'
							})
						});
				}}
			>
				{({ handleChange, handleBlur, handleSubmit, touched, values, errors }) => (
					<View style={{margin:10}}>
						<TextInput
							label="Email Address"
							onChangeText={handleChange('email')}
							onBlur={handleBlur('email')}
							value={values.email}
							mode='outlined'
							error={touched.email && errors.email}
							disabled={sending}
						/>
						<HelperText type="error" visible={touched.email && errors.email}>{touched.email && errors.email}</HelperText>
						<TextInput
							label="Password"
							onChangeText={handleChange('password')}
							onBlur={handleBlur('password')}
							value={values.password}
							mode='outlined'
							secureTextEntry={true}
							error={touched.password && errors.password}
							disabled={sending}
						/>
						<HelperText type="error" visible={touched.password && errors.password}>{touched.password && errors.password}</HelperText>
						<Button
							onPress={handleSubmit}
							mode='contained'
							disabled={!errors}
							loading={sending}
						>
							Submit
						</Button>
					</View>
				)}
			</Formik>
		)
	}

	const SignUpForm = () => {
		const [sending, setSending] = useState(false);

		return (
			<Formik
				initialValues={{ firstname: '', lastname: '', email: '', password: '' }}
				validationSchema={Yup.object({
					firstname: Yup.string("Enter your firstname")
						.required("First Name is Required"),
					lastname: Yup.string("Enter your lastname")
						.required("Last Name is Required"),
					email: Yup.string("Enter your email")
						.email("Enter valid email")
						.required("Email is required"),
					password: Yup.string("Enter your password")
						.min(8, "Password must contain at least 8 character")
						.required("Password is required"),
				})}
				onSubmit={(values, actions) => {
					setSending(true);
					axios.post(global.baseAPIURL + '/api/user/signup', { firstName: values.firstname, lastName: values.lastname, email: values.email, password: values.password })
						.then((data) => {
							Storage.setData('usercreds', JSON.stringify({ email: values.email, password: values.password }))
							Storage.setData('jwt', data.data.token);
							Storage.setData('user', JSON.stringify(data.data.user));
							setJWTfunc(data.data.token);
							setSending(false);
						})
						.catch((err) => {
							const errMsg = err.response.data.err;
							setSending(false);

							if (errMsg === "User already exists") {
								actions.setErrors({
									email:errMsg
								})
							}
							else if (errMsg === "Please enter all fields") {
								actions.setErrors({
									firstname:errMsg,
									lastname:errMsg,
									email:errMsg,
									password:errMsg
								})
							}
							else {
								actions.setErrors({
									firstname:' ',
									lastname:' ',
									email:'Something went wrong',
									password:' '
								})
							}
							
						});
				}}
			>
				{({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
					<View style={{margin:10}}>
						<View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
							<View style={{ width: '49%' }}>
								<TextInput
									label="First Name"
									onChangeText={handleChange('firstname')}
									onBlur={handleBlur('firstname')}
									value={values.firstname}
									mode='outlined'
									required
									style={{ justifyContent: 'center' }}
									error={touched.firstname && errors.firstname}
									disabled={sending}
								/>
								<HelperText type='error' visible={touched.firstname && errors.firstname}>
									{touched.firstname && errors.firstname}
								</HelperText>
							</View>
							<View style={{ width: '49%' }}>
								<TextInput
									label="Last Name"
									onChangeText={handleChange('lastname')}
									onBlur={handleBlur('lastname')}
									value={values.lastname}
									mode='outlined'
									style={{ justifyContent: 'center' }}
									error={touched.lastname && errors.lastname}
									disabled={sending}
								/>
								<HelperText type='error' visible={touched.lastname && errors.lastname}>
									{touched.lastname && errors.lastname}
								</HelperText>
							</View>
						</View>
						<View>
							<TextInput
								label="Email Address"
								onChangeText={handleChange('email')}
								onBlur={handleBlur('email')}
								value={values.email}
								mode='outlined'
								error={touched.email && errors.email}
								disabled={sending}
							/>
							<HelperText type='error' visible={touched.email && errors.email}>
								{touched.email && errors.email}
							</HelperText>
						</View>
						<View>
							<TextInput
								label="Password"
								onChangeText={handleChange('password')}
								onBlur={handleBlur('password')}
								value={values.password}
								mode='outlined'
								secureTextEntry={true}
								error={touched.password && errors.password}
								disabled={sending}
							/>
							<HelperText type='error' visible={touched.password && errors.password}>
								{touched.password && errors.password}
							</HelperText>
						</View>
						<Button
							onPress={handleSubmit}
							mode='contained'
							disabled={!errors}
							loading={sending}
						>
							Submit
						</Button>
					</View>
				)}
			</Formik>
		)
	}

	const SilentLogin = (email, password) => {
		axios.post(global.baseAPIURL + '/api/user/login', { email: email, password: password })
			.then((data) => {
				Storage.setData('jwt', data.data.token);
				Storage.setData('user', JSON.stringify(data.data.user));
				return data;
			})
			.catch((data) => {
				return(null);
			});
	}

	const getUsercreds = async () => {
		let creds = await Storage.getData('usercreds');

		return (creds === null ? null : JSON.parse(creds))
	}

	useEffect(() => {
		getUsercreds().then((data) => {
			if (data === null) {
				setJWTfunc(-1);
			}
			else {

				let token = SilentLogin(data.email, data.password);

				setJWTfunc(token);
			}
		});
	}, []);

	// Entry point to app
	return (
		<PaperProvider theme={theme}>
			<SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
				{jwt === null ? <ActivityIndicator animating={true} size='large' style={{ height: '100%', display: "flex", justifyContent: "center", alignItems: "center" }} />
					: (jwt <= -1 ? <WelcomePage /> : <Dashboard />)}

			</SafeAreaView>
		</PaperProvider>
	)
}

export default App;
