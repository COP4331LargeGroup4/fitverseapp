import React, { useState } from 'react'
import { StyleSheet, Text, SafeAreaView, View, Image, Dimensions } from 'react-native';
import { BottomNavigation, Button, TextInput } from 'react-native-paper';


//import * as mdiIcon from '@mdi/react' // can i change the iconprovder to this? or add mdiAccountCowboyHat to react-native-icon-provider or whatever its called
//import { mdiAccountCowboyHat } from '@mdi/js';
import SafeViewAndroid from "./components/SafeAndroidView";
import Profile from './src/profile';
import Logo from './assets/logo.svg'
import { DashboardCalendar, PageCalendar } from './src/calendar';
import { Formik } from 'formik';
import * as Yup from 'yup';


const width = Dimensions.get('window').width;


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

const WelcomePage = () => {
	const [pageState, setPageState] = useState('signin');

	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);

	const [firstname, setFirstname] = useState(null);
	const [lastname, setLastname] = useState(null);

	const ValidateEmail = (email) => {
		console.log(email);
		setEmail(email);
	}

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
						<SignInForm />
					<View>
						<Text>Forgot password?</Text>
					</View>
				</View>
				:
				<View>
					<Text style={{ textAlign: 'center' }}>Sign up for a fitverse account</Text>
						<SignUpForm />
					<View>
						<Text>Forgot password?</Text>
					</View>
				</View>
		
			}
		</>
	);
}

const SignInForm = () => {
	return (
		<Formik
			initialValues={{ email: '', password:'' }}
			onSubmit={values => console.log(values)}
		>
		{({ handleChange, handleBlur, handleSubmit, values }) => (
		<View>
			<TextInput
				label="Email Address"
				onChangeText={handleChange('email')}
				onBlur={handleBlur('email')}
				value={values.email}
				mode='outlined'
			/>
			<TextInput
				label="Password"
				onChangeText={handleChange('password')}
				onBlur={handleBlur('password')}
				value={values.password}
				mode='outlined'
				secureTextEntry={true}
			/>
			<Button onPress={handleSubmit} mode='contained'>Submit</Button>
		</View>
		)}
		</Formik>
	)
}

const SignUpForm = () => {
	return (
		<Formik
			initialValues={{ firstname:'', lastname:'', email: '', password:'' }}
			onSubmit={values => console.log(values)}
		>
		{({ handleChange, handleBlur, handleSubmit, values }) => (
		<View>
			<View style={{ flexDirection: 'row' }}>
				<TextInput
					label="First Name"
					onChangeText={handleChange('firstname')}
					onBlur={handleBlur('firstname')}
					value={values.firstname}
					mode='outlined'
					style={{ width: '50%', justifyContent: 'center' }}
				/>
				<TextInput
					label="Last Name"
					onChangeText={handleChange('lastname')}
					onBlur={handleBlur('lastname')}
					value={values.lastname}
					mode='outlined'
					style={{ width: '50%', justifyContent: 'center' }}
				/>
			</View>
			<TextInput
				label="Email Address"
				onChangeText={handleChange('email')}
				onBlur={handleBlur('email')}
				value={values.email}
				mode='outlined'
			/>
			<TextInput
				label="Password"
				onChangeText={handleChange('password')}
				onBlur={handleBlur('password')}
				value={values.password}
				mode='outlined'
				secureTextEntry={true}
			/>
			<Button onPress={handleSubmit} mode='contained'>Submit</Button>
		</View>
		)}
		</Formik>
	)
}

const App = () => {
	const [userID, setUserID] = useState(-1);


	return (
		<SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
			{userID <= -1 ? <WelcomePage /> : <Dashboard />}
		</SafeAreaView>
	)
}

export default App;


/*<Formik
						initialValues={{ firstname: '', lastname: '', email: '', password: '' }}
						onSubmit={values => console.log(values)}
					/>
					{({ handleChange, handleBlur, handleSubmit, values }) => (
						<View>
							<View style={{ flexDirection: 'row' }}>
								<TextInput
									label="First Name"
									value={values.firstname}
									onChangeText={handleChange('firstname')}
									onBlur={handleBlur('firstname')}
									mode='outlined'
									style={{ width: '50%', justifyContent: 'center' }}
								/>
								<TextInput
									label="Last Name"
									value={lastname}
									onChangeText={lastname => setLastname(lastname)}
									mode='outlined' // could implement staying logged in after this
									style={{ width: '50%' }}
								/>
							</View>
							<TextInput
								label="Email Address"
								value={email}
								onChangeText={ValidateEmail}
								mode='outlined'
							/>
							<TextInput
								label="Password"
								value={password}
								onChangeText={password => setPassword(password)}
								secureTextEntry={true}
								mode='outlined' // could implement staying logged in after this
							/>
							<Button
								mode='contained'
							>
								Sign in
							</Button>
						</View>
					)}
					</Formik>*/