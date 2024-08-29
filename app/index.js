import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'
import { StatusBar } from 'expo-status-bar';


export default function index() {
  return (

    <Redirect href="/(authenticate)/login" />

  )
}

const styles = StyleSheet.create({})

