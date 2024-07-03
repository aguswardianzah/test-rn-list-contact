import React, { useCallback, useMemo, useState } from 'react'
import { FieldError } from 'react-hook-form'
import { View, TextInput as TextInputNative, type NativeSyntheticEvent, type TextInputFocusEventData, Text, StyleSheet, StyleProp, ViewStyle, TextStyle, TextInputProps } from 'react-native'

interface TextInputType {
  containerStyle?: StyleProp<ViewStyle> | undefined,
  inputStyle?: StyleProp<TextStyle> | undefined,
  borderFocusColor?: string | undefined,
  inputProps?: Omit<TextInputProps, 'style'>,
  errors?: FieldError
}

const TextInput = ({
	containerStyle,
	inputStyle,
	borderFocusColor,
	inputProps,
	errors,
}: TextInputType): React.ReactNode => {

	const [isFocused, setFocused] = useState(false)

	const _handleFocus = useCallback((event: NativeSyntheticEvent<TextInputFocusEventData>) => {
		setFocused(true)
		if (typeof inputProps?.onFocus === 'function') inputProps.onFocus(event)
	}, [inputProps])

	const _handleBlur = useCallback((event: NativeSyntheticEvent<TextInputFocusEventData>) => {
		setFocused(false)
		if (typeof inputProps?.onBlur === 'function') inputProps.onBlur(event)
	}, [inputProps])

	const _renderTextInput = useMemo(() => {
		return (
			<TextInputNative
				style={ styles.input }
				onFocus={ _handleFocus }
				onBlur={ _handleBlur }
				{ ...inputProps }
			/>
		)
	}, [_handleFocus, _handleBlur])

	return (
		<View style={ containerStyle }>
			<View
				style={ [
					styles.container,
					borderFocusColor && isFocused && { borderColor: borderFocusColor } as any,
					errors && styles.error,
				] }
			>
				{ _renderTextInput }
			</View>
			{ errors?.message && <Text style={ styles.textError }>{ errors.message }</Text> }
		</View>
	)
}

export default React.memo(TextInput)

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 8,
		borderRadius: 8,
		borderColor: 'gray',
		borderWidth: 1,
		backgroundColor: 'white',
	},
	input: {
		flex: 1,
		borderWidth: 0,
		color: 'black',
		paddingVertical: 6,
	},
	error: {
		borderColor: 'red'
	},
	textError: {
		marginTop: 4,
		color: 'red'
	},
})