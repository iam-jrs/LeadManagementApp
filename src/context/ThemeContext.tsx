import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { themes } from '../constants/ThemesColor';
// or
// import { themes } from '../constants/themesColor';
// Make sure the file exists at the specified path and the export is correct

interface ThemeContextProps {
  theme: typeof themes.light;
}

export const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const theme = systemColorScheme === 'dark' ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
