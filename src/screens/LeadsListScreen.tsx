import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const LeadsListScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leads List</Text>
      <Button title="Add Lead" onPress={() => navigation.navigate('AddLead')} />
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

export default LeadsListScreen;
