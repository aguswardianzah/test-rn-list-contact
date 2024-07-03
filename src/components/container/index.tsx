import React, { PropsWithChildren } from "react"
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native"

const Container = ({ children }: PropsWithChildren): React.ReactNode => {
  return (
    <SafeAreaView style={ styles.root }>
      <StatusBar
        backgroundColor='transparent'
        translucent
        barStyle='dark-content'
      />
      <View style={ styles.content }>
        {children}
      </View>
    </SafeAreaView>
  )
}

export default React.memo(Container)

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: 'white'
  },
  content: {
    flex: 1,
    paddingTop: StatusBar.currentHeight ?? 0
  }
})