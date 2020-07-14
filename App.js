import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, SafeAreaView, View, Image, Dimensions } from 'react-native';
import { BottomNavigation, Button, TextInput, HelperText, ActivityIndicator } from 'react-native-paper';


//import * as mdiIcon from '@mdi/react' // can i change the iconprovder to this? or add mdiAccountCowboyHat to react-native-icon-provider or whatever its called
//import { mdiAccountCowboyHat } from '@mdi/js';
import SafeViewAndroid from "./components/SafeAndroidView";
import Profile from './src/profile';
import Logo from './assets/logo.svg'
import { DashboardCalendar, PageCalendar } from './src/calendar';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


const width = Dimensions.get('window').width;

const baseAPIURL = 'https://fitverse.herokuapp.com';



const getData = async (token) => {
	try {
		return await AsyncStorage.getItem(token);
	} catch (e) {
		console.log(e);
	}
}

const setData = async (key, value) => {
	try {
		await AsyncStorage.setItem(key, value);
	} catch (e) {
		console.log(e);
	}
}

const clearData = async () => {
	try {
		await AsyncStorage.clear();
	} catch (e) {
		console.log(e);
	}
	console.log('Storage Cleared');
}


//<Image source={require('./assets/logo.png')} style={{ alignContent:'center', resizeMode:'center', width: (width * .8) }} />

const DashboardRoute = () =>
	<View >
		<Logo
			width='100%'
			height='20%'

			style={styles.container}
		/>
		<DashboardCalendar />

	</View >;

const CalendarRoute = () =>
	<View >
		<PageCalendar />
	</View >;

const RecentsRoute = () =>
	<View >
		<Text>Recents</Text>
		<Text>Route</Text>
		<Text>test</Text>
		<Button icon="alert-octagon" mode="contained" onPress={clearData}>
				Test
				</Button>
	</View >;

const ProfileRoute = () =>
	<View >
		<Profile />
	</View >;

const Dashboard = () => {

	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: 'dashboard', title: 'Dashboard', icon: 'home' },
		{ key: 'calendar', title: 'Calendar', icon: 'calendar' },
		{ key: 'recents', title: 'Recents', icon: 'history' },
		{ key: 'profile', title: 'Profile', icon: 'account' }, // TODO: Change to https://materialdesignicons.com/icon/account-cowboy-hat
	]);

	const renderScene = BottomNavigation.SceneMap({
		dashboard: DashboardRoute,
		calendar: CalendarRoute,
		recents: RecentsRoute,
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

const WelcomePage = ({jwt}) => {
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
			<View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
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
					<SignInForm jwt={jwt} />
					<View>
						<Text>Forgot password?</Text>
					</View>
				</View>
				:
				<View>
					<Text style={{ textAlign: 'center' }}>Sign up for a fitverse account</Text>
					<SignUpForm jwt={jwt} />
				</View>

			}
		</>
	);
}

const SignInForm = ({jwt}) => {
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
			onSubmit={values => {
				setSending(true);
				let creds = { email: values.email, password: values.password };
				axios.post(baseAPIURL + '/api/user/login', creds)
					.then((data) => {
						setData('usercreds', JSON.stringify(creds));
						jwt(data.data.token);
						console.log(data.data.token)
					})
					.catch((data) => console.log(data));
			}}
		>
			{({ handleChange, handleBlur, handleSubmit, touched, values, errors }) => (
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

const SignUpForm = ({jwt}) => {
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
			onSubmit={values => {
				setSending(true);
				axios.post(baseAPIURL + '/api/user/signup', { firstName: values.firstname, lastName: values.lastname, email: values.email, password: values.password })
					.then((data) => {
						setData('usercreds', JSON.stringify({ email: values.email, password: values.password }))
						jwt(data.data.token);
						console.log(data.data.token);
						setSending(false);
					})
					.catch((data) => {
						console.log(data);
						setSending(false);
					});
			}}
		>
			{({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
				<View>
					<View style={{ flexDirection: 'row' }}>
						<View style={{ width: '50%' }}>
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
						<View style={{ width: '50%' }}>
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
	axios.post(baseAPIURL + '/api/user/login', { email: email, password: password })
		.then((data) => {console.log(data); return data})
		.catch((data) => console.log(data));
}

const App = () => {

	const [jwt, setJWT] = useState(null);
	const setJWTfunc = (token) => setJWT(token);

	//const usercreds = JSON.stringify({email:'',password:''});
	
	//clearData();

	const getUsercreds = async() => {
		let creds = await getData('usercreds');

		return (creds === null ? null : JSON.parse(creds))
	}

	useEffect(() => {
		getUsercreds().then((data) => {
			if (data === null)
			{
				setJWT(-1);
			}
			else {

				let token = SilentLogin(data.email, data.password);
				console.log(token);

				setJWT(token);
			}
		});
	}, [] );

	return (
		<SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
			{jwt === null ? <ActivityIndicator animating={true} size='large' style={{height:'100%',display:"flex",justifyContent:"center",alignItems: "center"}} /> 
				: (jwt <= -1 ? <WelcomePage jwt={setJWTfunc}/> : <Dashboard />)}
			
		</SafeAreaView>
	)
}

export default App;
