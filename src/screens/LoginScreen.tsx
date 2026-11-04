import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { Button } from '../components/Button';

interface Props {
  onLogin: () => void;
  onGoToSignUp: () => void;
}

export const LoginScreen: React.FC<Props> = ({ onLogin, onGoToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Кош келдиңиз!</Text>
      <Text style={styles.subHeader}>QAZYNA аккаунтуңузга кириңиз</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Сыр сөз</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button title="Кирүү" onPress={onLogin} />

        <TouchableOpacity onPress={onGoToSignUp} style={styles.linkContainer}>
          <Text style={styles.linkText}>Аккаунтуңуз жокпу? <Text style={styles.bold}>Катталуу</Text></Text>
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