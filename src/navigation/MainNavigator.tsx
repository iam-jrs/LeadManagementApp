import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LeadsListScreen from '../screens/LeadsListScreen';
import LeadDetailScreen from '../screens/LeadDetailScreen';
import AddLeadScreen from '../screens/AddLeadScreen';

const Stack = createNativeStackNavigator();


const MainNavigator = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.text,
        contentStyle: { backgroundColor: theme.background },
      }}
    >
      <Stack.Screen
        name="LeadsList"
        component={LeadsListScreen}
        options={{ title: 'Leads' }}
      />
      <Stack.Screen
        name="LeadDetail"
        component={LeadDetailScreen}
        options={{ title: 'Lead Detail' }}
      />
      <Stack.Screen
        name="AddLead"
        component={AddLeadScreen}
        options={{ title: 'Add Lead' }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
