import React, { useContext } from 'react';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { ThemeContext } from './ThemeContext';
import Head from 'expo-router/head';


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
      <Head>
        <title>Verisurf Software | 3D Measurement Solutions</title>
        <meta
          name="description"
          content="Verisurf Software provides 3D measurement solutions for manufacturing. Our software integrates CAD, CAM, and CAI for precision measurement and quality inspection."
        />
        <meta
          name="keywords"
          content="Verisurf, 3D measurement, CAD, CAM, CAI, quality inspection, manufacturing software"
        />
        <meta name="author" content="Verisurf Software, Inc." />
        <meta
          property="og:title"
          content="Verisurf Software | 3D Measurement Solutions"
        />
        <meta
          property="og:description"
          content="Precision 3D measurement solutions for manufacturing. Integrate CAD, CAM, and CAI for quality inspection and control."
        />
        <meta
          property="og:image"
          content="https://www.verisurf.com/path-to-your-logo.png"
        />
        <meta property="og:url" content="https://www.verisurf.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.verisurf.com" />
      </Head>
      <View style={{ flex: 1, backgroundColor }}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="details"
            options={{
              title: "CTE Reference Table",
              headerBackTitle: "Back",
              headerStyle: headerStyle,
              headerTintColor: headerTintColor,
              headerTitleStyle: {
                fontWeight: "500",
                fontSize: 16,
              },
            }}
          />
        </Stack>
      </View>
    </ThemeContext.Provider>
  );
}