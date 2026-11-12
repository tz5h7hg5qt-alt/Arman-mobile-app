
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
  onSignUp: () => void;
  onGoToLogin: () => void;
}

export const SignUpScreen: React.FC<Props> = ({
  onSignUp,
  onGoToLogin,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { t, language } = useLanguage();

  const handleSignUp = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert(
        language === 'ru'
          ? 'Ошибка'
          : language === 'kk'
          ? 'Қате'
          : 'Error',
        language === 'ru'
          ? 'Заполните все поля'
          : language === 'kk'
          ? 'Барлық жолдарды толтырыңыз'
          : 'Please fill in all fields'
      );
      return;
    }

    onSignUp();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('signup')}</Text>

      <Text style={styles.subHeader}>
        {language === 'ru'
          ? 'Создайте новый аккаунт QAZYNA'
          : language === 'kk'
          ? 'Жаңа QAZYNA аккаунтын ашыңыз'
          : 'Create a new QAZYNA account'}
      </Text>

      <View style={styles.form}>
        <Text style={styles.label}>{t('name')}</Text>

        <TextInput
          style={styles.input}
          placeholder={
            language === 'ru'
              ? 'Ваше имя'
              : language === 'kk'
              ? 'Аты-жөніңіз'
              : 'Your name'
          }
          placeholderTextColor={colors.textMuted}
          value={name}
          onChangeText={setName}
        />

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
          title={t('signup')}
          onPress={handleSignUp}
        />

        <TouchableOpacity
          onPress={onGoToLogin}
          style={styles.linkContainer}
        >
          <Text style={styles.linkText}>
            {t('haveAccount')}{' '}
            <Text style={styles.bold}>{t('login')}</Text>
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
