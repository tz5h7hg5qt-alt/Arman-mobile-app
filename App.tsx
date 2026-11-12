
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';

import { SplashScreen } from './src/screens/SplashScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { SignUpScreen } from './src/screens/SignUpScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { AddTransactionScreen } from './src/screens/AddTransactionScreen';
import { TransactionsScreen } from './src/screens/TransactionsScreen';

import { colors } from './src/theme/colors';
import { LanguageProvider } from './src/i18n/LanguageContext';
import { TransactionProvider } from './src/context/TransactionContext';

function AppContent() {
  const [screen, setScreen] = useState<
    'splash' | 'login' | 'signup' | 'home' | 'addTransaction' | 'transactions'
  >('splash');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={
          screen === 'splash'
            ? 'light-content'
            : 'dark-content'
        }
        backgroundColor={
          screen === 'splash'
            ? colors.primary
            : colors.background
        }
      />

      {screen === 'splash' && (
        <SplashScreen onStart={() => setScreen('login')} />
      )}

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

      {screen === 'home' && (
        <HomeScreen
          onAddTransaction={() => setScreen('addTransaction')}
          onOpenTransactions={() => setScreen('transactions')}
        />
      )}

      {screen === 'addTransaction' && (
        <AddTransactionScreen
          onBack={() => setScreen('home')}
        />
      )}

      {screen === 'transactions' && (
        <TransactionsScreen
          onBack={() => setScreen('home')}
        />
      )}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <TransactionProvider>
        <AppContent />
      </TransactionProvider>
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
