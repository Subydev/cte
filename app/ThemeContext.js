import React from 'react';

export const ThemeContext = React.createContext({
  colorScheme: 'light',
  toggleTheme: () => {},
});