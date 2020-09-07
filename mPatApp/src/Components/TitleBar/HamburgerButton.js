import React, { Component } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

class HamburgerButton extends Component {
	render () {
		return (
			<Menu>
				<MenuTrigger>
					<View style = {styles.menuIconContainer}>
						<Image style={styles.menuIcon} source = {require('../../../assets/hamburgerMenuNarrow.png')} />
					</View>
				</MenuTrigger>
				<MenuOptions optionsContainerStyle = {styles.hamburgerMenu}>
					<MenuOption>
						<Text style = {styles.menuItem}>Terms</Text>
					</MenuOption>
					<MenuOption>
						<Text style = {styles.menuItem}>Privacy</Text>
					</MenuOption>
				</MenuOptions>
			</Menu>
		)
	}
}

export default HamburgerButton;

const styles = StyleSheet.create({
	menuIcon: {
		width: 40,
		height: 40
	},

	hamburgerMenu: {
		marginTop: 58
	},

	menuItem: {
		fontSize: 18,
		margin: 5
	},

	menuIconContainer: {
		padding: 8
	}
});