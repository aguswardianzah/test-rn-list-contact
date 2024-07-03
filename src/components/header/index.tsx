import { AddSquare, ArrowLeft3, Edit, Trash } from "iconsax-react-native"
import React, { useMemo } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

type HeaderProps = {
  title: string
  showBack?: boolean
  onPressBack?: () => void
  showEdit?: boolean
  onPressEdit?: () => void
  showAdd?: boolean
  onPressAdd?: () => void
  showDelete?: boolean
  onPressDelete?: () => void
}

const Header = ({
  title,
  showBack,
  onPressBack,
  showEdit,
  onPressEdit,
  showAdd,
  onPressAdd,
  showDelete,
  onPressDelete
}: HeaderProps): React.ReactNode => {
  const _renderBackButton = useMemo(() => {
    if (showBack) {
      return (
        <TouchableOpacity onPress={onPressBack}>
          <ArrowLeft3 size={24} color="black" />
        </TouchableOpacity>
      )
    }
  }, [showBack, onPressBack])
  const _renderTitle = useMemo(() => (
    <Text style={styles.title}>{title}</Text>
  ), [title])
  const _renderAddButton = useMemo(() => {
    if (showAdd) {
      return (
        <TouchableOpacity onPress={onPressAdd}>
          <AddSquare size={24} color="black" />
        </TouchableOpacity>
      )
    }
  }, [showAdd, onPressAdd])
  const _renderEditButton = useMemo(() => {
    if (showEdit) {
      return (
        <TouchableOpacity onPress={onPressEdit}>
          <Edit size={24} color="black" />
        </TouchableOpacity>
      )
    }
  }, [showEdit, onPressEdit])
  const _renderDeleteButton = useMemo(() => {
    if (showDelete) {
      return (
        <TouchableOpacity onPress={onPressDelete} style={{marginStart: 8}}>
          <Trash size={24} color="black" />
        </TouchableOpacity>
      )
    }
  }, [showDelete, onPressDelete])

  return (
    <View style={styles.container}>
      {_renderTitle}
      {_renderBackButton}
      <View style={{flex: 1}}></View>
      {_renderAddButton}
      {_renderEditButton}
      {_renderDeleteButton}
    </View>
  )
}

export default React.memo(Header)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 32
  },
  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    textAlign: 'center',
    color: 'black',
    fontWeight: '700',
    fontSize: 18,
  }
})