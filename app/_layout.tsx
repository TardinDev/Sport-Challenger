import '../global.css';

import { Stack } from 'expo-router';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  useEffect(() => {
    // Hide the splash screen after 5 seconds
    const timer = setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return <Stack />;
}
