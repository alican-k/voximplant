import React from 'react'
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { compose, branch, renderComponent, withProps } from 'recompose'
import Contact from './Contact'

const Loading 	= () => <ActivityIndicator />
const Empty 	= () => <Text>There is no contact</Text>

const ContactList = ({ list, comp }) => 
	<View style={styles.container}>
		{{
			LOADING	: <Loading />,
			EMPTY 	: <Empty />,
			LIST 	: list.map(contact => <Contact key={contact.id} contact={contact} />)
		}[comp]}
	</View>
	
export default compose(
	withProps(
		({ list, status }) => ({ 
			comp: status === 'LOADING' 
				? 'LOADING' 
				: list.length === 0
					? 'EMPTY'
					: 'LIST'
		})
	)
)(ContactList)
	
const styles = StyleSheet.create({
	container: {
		display: 'flex',
		padding: 25,
	}
})