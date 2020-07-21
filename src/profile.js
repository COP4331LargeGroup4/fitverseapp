import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { TextInput, Button, IconButton, HelperText } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import StorageUtil from './Storage';

const Storage = new StorageUtil();

export default function Profile() {

	const [firstName, setFirstName] = useState(null);
	const [lastName, setLastName] = useState(null);
	const [email, setEmail] = useState(null);

	const [show, setShow] = useState(false);

	Storage.getData('user')
		.then(data => {
			var json = JSON.parse(data);
			setFirstName(json.firstName);
			setLastName(json.lastName);
			setEmail(json.email);
		})

	return (
		<>
			{/* All of this is to display the account icon (plus a dumb easter egg lol) */}
			<View style={{ width:Dimensions.get('window').width, height:Dimensions.get('window').width*(3/5)}}>
				{!show && <View style={{justifyContent:'center', alignItems:'center'}}>
					<IconButton
						icon='account'
						size={200}
						onPress={() => {setShow(!show)}}
					/>
				</View>}
				{show && <><View pointerEvents='none' style={{alignSelf:'flex-start'}}><YoutubePlayer width={Dimensions.get('window').width} height={Dimensions.get('window').width} videoId={"6n3pFFPSlW4"} play={true} volume={100} onChangeState={state => {if (state=='ended') setShow(false)}} onError={()=>{setShow(false)}} initialPlayerParams={{controls:false, modestbranding:1}} forceAndroidAutoplay={true} /></View><IconButton style={{position:'absolute', top:10, right:10, backgroundColor:'#AAAAAA'}} icon='close' onPress={()=>{setShow(false)}}/></>}</View>
			
			
			<Formik
				enableReinitialize={true}
				initialValues={{
					firstname: firstName || '',
					lastname: lastName || '',
					email: email || '',
				}}
				validationSchema={Yup.object({
					firstname: Yup.string("Enter your firstname")
						.required("First Name is Required"),
					lastname: Yup.string("Enter your lastname")
						.required("Last Name is Required"),
				})}

				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(true);
					Storage.getData('jwt').then(jwt => {
						axios
							.post(global.baseAPIURL + "/api/user/update", {
								token: jwt,
								firstName: values.firstname,
								lastName: values.lastname,
							}, {
								headers: { 'Access-Control-Allow-Origin': '*' },
								mode: 'cors',
							})
							.then(function (response) {
								setSubmitting(false);
							})
							.catch(function (err) {
								console.log(err);
								setSubmitting(false);
							});
					})

				}}
			>
				{({ handleChange, handleBlur, handleSubmit, isSubmitting, touched, values, errors }) => (
					<View style={{margin:10}}>
						<TextInput
							label="First Name"
							onChangeText={handleChange('firstname')}
							onBlur={handleBlur('firstname')}
							value={values.firstname}
							mode='outlined'
							error={touched.firstname && errors.firstname}
							disabled={isSubmitting}
						/>
						<HelperText type="error" visible={touched.firstname && errors.firstname}>{touched.firstname && errors.firstname}</HelperText>

						<TextInput
							label="Last Name"
							onChangeText={handleChange('lastname')}
							onBlur={handleBlur('lastname')}
							value={values.lastname}
							mode='outlined'
							error={touched.lastname && errors.lastname}
							disabled={isSubmitting}
						/>
						<HelperText type="error" visible={touched.lastname && errors.lastname}>{touched.lastname && errors.lastname}</HelperText>

						<TextInput
							label="Email Address"
							onChangeText={handleChange('email')}
							onBlur={handleBlur('email')}
							value={values.email}
							mode='outlined'
							error={touched.email && errors.email}
							disabled={true}
						/>
						<HelperText type="error" visible={false}>i shouldnt be here</HelperText>

						<Button
							onPress={handleSubmit}
							mode='contained'
							disabled={!errors}
							loading={isSubmitting}
							
						>
							Submit
						</Button>
					</View>
				)}
			</Formik>
		</>
	)
}
