import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { ThemeContext } from './ThemeContext';
import Head from 'expo-router/head';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  const deviceColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState(deviceColorScheme);

  useEffect(() => {
    setColorScheme(deviceColorScheme);
  }, [deviceColorScheme]);

  const toggleTheme = () => {
    setColorScheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  const backgroundColor = colorScheme === 'light' ? '#f1f5f9' : 'rgb(15,23,42)';
  const headerStyle = {
    backgroundColor: colorScheme === 'light' ? '#ffffff' : 'rgb(30,41,59)',
  };
  const headerTintColor = colorScheme === 'light' ? 'rgb(15,23,42)' : '#ffffff';

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

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
    </GestureHandlerRootView>

  );
}