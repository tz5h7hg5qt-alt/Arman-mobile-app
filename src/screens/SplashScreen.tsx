
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colors } from '../theme/colors';
import { Button } from '../components/Button';
import { useLanguage } from '../i18n/LanguageContext';

interface Props {
  onStart: () => void;
}

export const SplashScreen: React.FC<Props> = ({ onStart }) => {
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>Q</Text>
        </View>

        <Text style={styles.title}>QAZYNA</Text>

        <Text style={styles.subtitle}>
          {t('slogan')}
        </Text>
      </View>

      <View style={styles.bottom}>
        <Button
          title={t('start')}
          onPress={onStart}
          variant="secondary"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'space-between',
    padding: 24,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.primary,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.white,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 14,
    color: colors.accent,
    marginTop: 8,
    textAlign: 'center',
  },
  bottom: {
    marginBottom: 20,
  },
});
