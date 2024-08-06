import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ShoppingScreen from './screens/ShoppingScreen'
import { Provider } from 'react-redux'
import { persistor, store } from './store/store.ts'
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ShoppingScreen />
      </PersistGate>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})