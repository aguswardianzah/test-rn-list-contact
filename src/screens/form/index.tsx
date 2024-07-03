import React, { useCallback, useEffect, useMemo } from "react"
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Container from "../../components/container"
import Header from "../../components/header"
import { NavigationProps } from "../../models/navigations"
import { useGetOneContactQuery, useInsertContactMutation, useUpdateContactMutation } from "../../store/contact"
import { Controller, FieldError, FieldValues, useForm } from "react-hook-form"
import { Contact } from "../../models/contact"
import TextInput from "../../components/text-input"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Toast from "react-native-toast-message"

type Props = NavigationProps<'form'>

type FormData = Omit<Contact, 'id'>

const Form = ({ route, navigation }: Props): React.ReactNode => {
  const { id, isEdit } = route.params
  const { data } = useGetOneContactQuery(id ?? '', { skip: !Boolean(id) })
  const { control, handleSubmit, formState: { errors }, } = useForm<FormData>({
    values: data
  })
  const [insertContact, { isSuccess, isError, isLoading }] = useInsertContactMutation()
  const [
    updateContact, {
      isLoading: loadingUpdate,
      isSuccess: successUpdate,
      isError: errorUpdate
    }
  ] = useUpdateContactMutation()

  const _process = useCallback((data: FormData) => {
    if (isEdit) {
      updateContact({ ...data, id } as Contact)
    } else {
      insertContact(data)
    }
  }, [isEdit, id])

  const _renderInput = useCallback((
    label: string, 
    name: keyof FormData, 
    error?: FieldError, 
    required?: boolean
  ) => (
    <>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        rules={{ required: required ? `${label} is required` : undefined }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            containerStyle={styles.input}
            borderFocusColor='blue'
            inputProps={{
              placeholder: `Input ${label}`,
              placeholderTextColor: 'gray',
              value: value?.toString(),
              onChangeText: onChange,
              keyboardType: name === 'age' ? 'number-pad' : 'default'
            }}
            errors={error}
          />
        )}
      />
    </>
  ), [control])

  const _renderSubmit = useMemo(() => (
    <TouchableOpacity
      disabled={isLoading || loadingUpdate}
      onPress={handleSubmit(_process)}
      style={styles.button}
    >
      <Text style={styles.buttonLabel}>Save</Text>
    </TouchableOpacity>
  ), [])

  useEffect(() => {
    if (isError) {
      Toast.show({
				type: 'error',
				text1: 'Failed to save contact'
			})
    }
    if (isSuccess) {
      Toast.show({
				type: 'success',
				text1: 'Contact saved'
			})
      navigation.goBack()
    }
  }, [isSuccess, isError])
  useEffect(() => {
    if (errorUpdate) {
      Toast.show({
				type: 'error',
				text1: 'Failed to update contact'
			})
    }
    if (successUpdate) {
      Toast.show({
				type: 'success',
				text1: 'Contact saved'
			})
      navigation.goBack()
    }
  }, [successUpdate, errorUpdate])

  return (
    <Container>
      <Header
        title={`${isEdit ? 'Edit' : 'Add'} Contact`}
        showBack
        onPressBack={navigation.goBack}
      />
      <KeyboardAwareScrollView
        style={styles.page}
        bounces={false}
        keyboardShouldPersistTaps='handled'
        enableOnAndroid
      >
        {_renderInput('Firstname', 'firstName', errors.firstName, true)}
        {_renderInput('Lastname', 'lastName', errors.lastName, true)}
        {_renderInput('Age', 'age', errors.age, true)}
        {_renderInput('Photo', 'photo')}
        {_renderSubmit}
      </KeyboardAwareScrollView>
    </Container>
  )
}

export default React.memo(Form)

const styles = StyleSheet.create({
  page: {
    padding: 16
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: 'black',
    marginTop: 16
  },
  input: {
    marginTop: 8,
    alignSelf: 'stretch'
  },
  button: {
    marginTop: 16,
    backgroundColor: 'blue',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: 'white'
  },
})