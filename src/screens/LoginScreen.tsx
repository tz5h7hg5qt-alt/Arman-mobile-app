
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { colors } from '../theme/colors';
import { Button } from '../components/Button';
import { useLanguage } from '../i18n/LanguageContext';

interface Props {
  onLogin: () => void;
  onGoToSignUp: () => void;
}

export const LoginScreen: React.FC<Props> = ({
  onLogin,
  onGoToSignUp,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { t, language } = useLanguage();

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert(
        language === 'ru'
          ? 'Ошибка'
          : language === 'kk'
          ? 'Қате'
          : 'Error',
        language === 'ru'
          ? 'Введите email и пароль'
          : language === 'kk'
          ? 'Email мен құпиясөзді енгізіңіз'
          : 'Please enter your email and password'
      );
      return;
    }

    onLogin();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('welcome')}</Text>

      <Text style={styles.subHeader}>
        {t('loginSubtitle')}
      </Text>

      <View style={styles.form}>
        <Text style={styles.label}>{t('email')}</Text>

        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          placeholderTextColor={colors.textMuted}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>{t('password')}</Text>

        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor={colors.textMuted}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button
          title={t('login')}
          onPress={handleLogin}
        />

        <TouchableOpacity
          onPress={onGoToSignUp}
          style={styles.linkContainer}
        >
          <Text style={styles.linkText}>
            {t('noAccount')}{' '}
            <Text style={styles.bold}>{t('signup')}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
  },
  subHeader: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 32,
    marginTop: 4,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    color: colors.text,
  },
  linkContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkText: {
    color: colors.textMuted,
    fontSize: 14,
  },
  bold: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});
