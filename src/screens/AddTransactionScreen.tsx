
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

import { colors } from '../theme/colors';
import { useTransactions } from '../context/TransactionContext';
import { TransactionType } from '../types/transaction';

interface Props {
  onBack: () => void;
}

export const AddTransactionScreen = ({ onBack }: Props) => {
  const { addTransaction } = useTransactions();

  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [counterparty, setCounterparty] = useState('');

  const types: { label: string; value: TransactionType }[] = [
    { label: 'Кіріс', value: 'income' },
    { label: 'Шығыс', value: 'expense' },
    { label: 'Маған аударылды', value: 'transfer_in' },
    { label: 'Мен аудардым', value: 'transfer_out' },
  ];

  const handleSave = async () => {
    const numericAmount = Number(amount.replace(',', '.'));

    if (!numericAmount || numericAmount <= 0) {
      Alert.alert('Қате', 'Дұрыс соманы енгізіңіз');
      return;
    }

    if (!category.trim()) {
      Alert.alert('Қате', 'Санатты енгізіңіз');
      return;
    }

    try {
      await addTransaction({
        id: Date.now().toString(),
        type,
        amount: numericAmount,
        category: category.trim(),
        description: description.trim(),
        date: new Date().toISOString(),
        counterparty: counterparty.trim() || undefined,
        source: 'manual',
      });

      Alert.alert('Дайын', 'Операция сақталды');
      onBack();
    } catch {
      Alert.alert('Қате', 'Операцияны сақтау мүмкін болмады');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Операция қосу</Text>

      <Text style={styles.label}>Операция түрі</Text>

      {types.map(item => (
        <TouchableOpacity
          key={item.value}
          style={[
            styles.typeButton,
            type === item.value && styles.selected,
          ]}
          onPress={() => setType(item.value)}
        >
          <Text
            style={[
              styles.typeText,
              type === item.value && styles.selectedText,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.label}>Сома (₸)</Text>
      <TextInput
        style={styles.input}
        placeholder="Мысалы: 15000"
        keyboardType="decimal-pad"
        value={amount}
        onChangeText={setAmount}
      />

      <Text style={styles.label}>Санат</Text>
      <TextInput
        style={styles.input}
        placeholder="Мысалы: Азық-түлік"
        value={category}
        onChangeText={setCategory}
      />

      {(type === 'transfer_in' || type === 'transfer_out') && (
        <>
          <Text style={styles.label}>Адамның аты</Text>
          <TextInput
            style={styles.input}
            placeholder="Аты-жөні"
            value={counterparty}
            onChangeText={setCounterparty}
          />
        </>
      )}

      <Text style={styles.label}>Түсініктеме</Text>
      <TextInput
        style={styles.input}
        placeholder="Қосымша ақпарат"
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Сақтау</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>Артқа</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 25,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
  },
  typeButton: {
    padding: 14,
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeText: {
    color: colors.text,
    fontSize: 15,
  },
  selectedText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: 17,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 25,
  },
  saveText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    padding: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  backText: {
    color: colors.textMuted,
    fontSize: 15,
  },
});
