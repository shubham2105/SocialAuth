import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SocialAuth = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SocialAuth</Text>
    </View>
  )
}

export default SocialAuth

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    color: "white"
  }
})