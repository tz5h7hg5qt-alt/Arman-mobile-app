import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { SplashScreen } from './src/screens/SplashScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { SignUpScreen } from './src/screens/SignUpScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { colors } from './src/theme/colors';

export default function App() {
  const [screen, setScreen] = useState<'splash' | 'login' | 'signup' | 'home'>('splash');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={screen === 'splash' ? 'light-content' : 'dark-content'} />
      {screen === 'splash' && <SplashScreen onStart={() => setScreen('login')} />}
      {screen === 'login' && (
        <LoginScreen
          onLogin={() => setScreen('home')}
          onGoToSignUp={() => setScreen('signup')}
        />
      )}
      {screen === 'signup' && (
        <SignUpScreen
          onSignUp={() => setScreen('home')}
          onGoToLogin={() => setScreen('login')}
        />
      )}
      {screen === 'home' && <HomeScreen />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});