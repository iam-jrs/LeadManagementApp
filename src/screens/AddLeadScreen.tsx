import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AddLeadScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Lead</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default AddLeadScreen;
