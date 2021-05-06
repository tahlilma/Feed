import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FeedScreen from './screens/FeedScreen';
import WebScreen from './screens/WebScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen name="Read More" component={WebScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
