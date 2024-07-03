import React, { useCallback, useEffect, useMemo } from "react"
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text } from "react-native"
import { NavigationProps } from "../../models/navigations"
import Container from "../../components/container"
import Header from "../../components/header"
import { useDeleteContactMutation, useGetOneContactQuery } from "../../store/contact"
import Image from "../../components/image"
import Toast from "react-native-toast-message"

type Props = NavigationProps<'detail'>

const Detail = ({ navigation, route }: Props): React.ReactNode => {
  const { id } = route.params
  const { data, isLoading, refetch } = useGetOneContactQuery(id)
  const [deleteContact, {isSuccess, isError}] = useDeleteContactMutation()

  const _renderLoading = useMemo(() => {
    if (isLoading) {
      return (
        <ActivityIndicator size={48} color='black' />
      )
    }
  }, [isLoading])

  const _renderImage = useMemo(() => (
    <Image source={{ uri: data?.photo }} style={styles.image} />
  ), [data])
  const _renderInfo = useMemo(() => (
    <>
      <Text style={styles.label}>Name</Text>
      <Text style={styles.field}>{`${data?.firstName} ${data?.lastName}`}</Text>
      <Text style={styles.label}>Age</Text>
      <Text style={styles.field}>{data?.age}</Text>
    </>
  ), [data])

  const _refreshControl = useMemo(() => (
    <RefreshControl
      refreshing={isLoading}
      onRefresh={refetch}
    />
  ), [isLoading])

  const _renderContent = useMemo(() => {
    if (!isLoading) {
      return (
        <ScrollView
          refreshControl={_refreshControl}
          style={styles.page}
        >
          {_renderImage}
          {_renderInfo}
        </ScrollView>
      )
    }
  }, [isLoading])

  const _navigateToEdit = useCallback(() => {
    navigation.navigate('form', { isEdit: true, id })
  }, [])

  const _deleteContact = useCallback(() => {
    data && deleteContact(data?.id)
  }, [data])

  useEffect(() => {
    if (isSuccess) {
      Toast.show({
        type: 'success',
        text1: `${data?.firstName} ${data?.lastName} deleted`
      })
      navigation.goBack()
    }
    if (isError) {
      Toast.show({
        type: 'error',
        text1: `Failed to delete contact`
      })
    }
  }, [isSuccess, isError])
  useEffect(() => {
		const focusSubscribe = navigation.addListener('focus', () => {
			if (!data) return

			refetch()
		})

		return focusSubscribe
	}, [data])

  return (
    <Container>
      <Header
        title="Detail Contact"
        showBack
        showEdit={Boolean(data)}
        showDelete={Boolean(data)}
        onPressBack={navigation.goBack}
        onPressEdit={_navigateToEdit}
        onPressDelete={_deleteContact}
      />
      {_renderLoading}
      {_renderContent}
    </Container>
  )
}

export default React.memo(Detail)

const styles = StyleSheet.create({
  page: {
    padding: 16
  },
  image: {
    alignSelf: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24
  },
  label: {
    fontSize: 13,
    color: 'black',
    marginTop: 12
  },
  field: {
    fontSize: 14,
    color: 'black',
    fontWeight: '700',
    marginTop: 4
  }
})