import { JSX } from "react";
import { StyleSheet } from "react-native";
import { BaseToast, BaseToastProps, ErrorToast } from "react-native-toast-message";

const toastConfig = {
  success: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={ [styles.containerStyle, styles.successStyle] }
			contentContainerStyle={ styles.contentContainerStyle }
			text1Style={ styles.textStyle }
    />
  ),
  error: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <ErrorToast
      {...props}
      style={ [styles.containerStyle, styles.errorStyle] }
			contentContainerStyle={ styles.contentContainerStyle }
			text1Style={ styles.textStyle }
    />
  ),
}

export default toastConfig

const styles = StyleSheet.create({
	textStyle: {
		fontSize: 16,
		color: '#FFFFFF',
		fontWeight: '600',
	},
	containerStyle: {
		borderLeftWidth: 0,
		marginTop: 20,
		height: 50
	},
	contentContainerStyle: {
		paddingHorizontal: 16
	},
	successStyle: {
		backgroundColor: 'green'
	},
	errorStyle: {
		backgroundColor: 'red'
	}
})