import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';

const Details = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Details Screen</Text>
        <Text style={styles.description}>This is the new screen you navigated to.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  content: {
    flex: 1,
    padding: RFValue(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: RFValue(24),
    fontWeight: 'bold',
    marginBottom: RFValue(20),
    color: '#4A5568',
  },
  description: {
    fontSize: RFValue(16),
    color: '#718096',
    textAlign: 'center',
  },
});

export default Details;