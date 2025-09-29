import '../global.css';

import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Hide the splash screen after 5 seconds
    const timer = setTimeout(async () => {
      await SplashScreen.hideAsync();

      // Check if user has selected location (TODO: check from storage)
      // For now, always redirect to location on first load
      if (!isReady) {
        router.replace('/location');
        setIsReady(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return <Stack />;
}
