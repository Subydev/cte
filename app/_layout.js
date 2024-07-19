import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { ThemeContext } from './ThemeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  const [colorScheme, setColorScheme] = useState('light');

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
        <SafeAreaProvider>
          <View style={{ flex: 1, backgroundColor }}>
            <Stack
              screenOptions={{
                headerStyle,
                headerTintColor,
                headerBackTitleVisible: false,
                contentStyle: { backgroundColor },
              }}
            >
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen 
                name="details" 
                options={{ 
                  title: 'CTE Reference Table',
                  headerShadowVisible: false,
                  
                }} 
              />
            </Stack>
          </View>
        </SafeAreaProvider>
      </ThemeContext.Provider>
    </GestureHandlerRootView>
  );
}