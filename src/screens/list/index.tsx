import React, { useCallback, useEffect, useMemo } from "react"
import Container from "../../components/container"
import Header from "../../components/header"
import { useGetContactsQuery } from "../../store/contact"
import { FlatList, StyleSheet, View } from "react-native"
import ContactItem from "../../components/contact-item"
import { Contact } from "../../models/contact"
import { NavigationProps } from "../../models/navigations"

type Props = NavigationProps<'list'>

const List = ({ navigation }: Props): React.ReactNode => {
  const { data, isLoading, refetch } = useGetContactsQuery()

  const _divider = useCallback((): React.ReactNode => (
    <View style={{ height: 8 }} />
  ), [])
  const _onSelect = useCallback((item: Contact) => {
    navigation.navigate('detail', { id: item.id })
  }, [])
  const _navigateToForm = useCallback(() => {
    navigation.navigate('form', {})
  }, [])

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
        title="List Contact" 
        showAdd
        onPressAdd={_navigateToForm}
        />
      <FlatList
        data={data}
        refreshing={isLoading}
        onRefresh={refetch}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ContactItem item={item} onPress={_onSelect} />}
        ItemSeparatorComponent={_divider}
        contentContainerStyle={styles.list}
      />
    </Container>
  )
}

export default React.memo(List)

const styles = StyleSheet.create({
  list: {
    padding: 16,
  }
})