import React, { useCallback, useMemo } from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"
import { Contact } from "../../models/contact"
import Image from "../image"

type ContactItemProps = {
  item: Contact,
  onPress?: (item: Contact) => void
}

const ContactItem = ({item, onPress}: ContactItemProps): React.ReactNode => {
  const _onPress = useCallback(() => { onPress && onPress(item) }, [item, onPress])
  const _renderContact = useMemo(() => (
    <>
      <Image source={{uri: item.photo}} style={styles.image} />
      <Text style={styles.name}>{`${item.firstName} ${item.lastName}`}</Text>
    </>
  ), [item])
  return (
    <TouchableOpacity style={styles.container} onPress={_onPress}>
      { _renderContact }
    </TouchableOpacity>
  )
}

export default React.memo(ContactItem)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 1
  },
  image: {
    width: 32,
    height: 32,
    marginEnd: 16,
    borderRadius: 16
  },
  name: {
    flex: 1,
    color: 'black'
  }
})