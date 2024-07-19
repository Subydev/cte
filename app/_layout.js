import React, { useContext } from 'react';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { ThemeContext } from './ThemeContext';

export default function Layout() {
  const [colorScheme, setColorScheme] = useState('light');

  const toggleTheme = () => {
    setColorScheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const headerStyle = colorScheme === 'light' 
    ? { backgroundColor: '#e2e8f0' } 
    : { backgroundColor: 'rgb(15,23,42)' };

  const headerTintColor = colorScheme === 'light' 
    ? 'rgb(15 23 42)' 
    : 'white';

  const backgroundColor = colorScheme === 'light' ? '#e2e8f0' : 'rgb(15,23,42)';

  return (
    <ThemeContext.Provider value={{ colorScheme, toggleTheme }}>
      <View style={{ flex: 1, backgroundColor }}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen 
            name="details" 
            options={{ 
              title: 'CTE Reference Table',
              headerBackTitle: 'Back',
              headerStyle: headerStyle,
              headerTintColor: headerTintColor,
              headerTitleStyle: {
                fontWeight: '500',
                fontSize: 16,
              },
            }} 
          />
        </Stack>
      </View>
    </ThemeContext.Provider>
  );
}