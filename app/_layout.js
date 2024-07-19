import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function Layout() {
  const colorScheme = useColorScheme();

  const headerStyle = colorScheme === 'light' 
    ? { backgroundColor: '#e2e8f0' } 
    : { backgroundColor: 'rgb(15,23,42)' };

  const headerTintColor = colorScheme === 'light' 
    ? 'rgb(15 23 42)' 
    : 'white';

  return (
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
  );
}