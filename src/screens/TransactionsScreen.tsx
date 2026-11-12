
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { colors } from '../theme/colors';
import { useLanguage } from '../i18n/LanguageContext';
import { useTransactions } from '../context/TransactionContext';

interface Props {
  onBack: () => void;
}

type FilterType = 'all' | 'income' | 'expense' | 'transfers';

export const TransactionsScreen = ({ onBack }: Props) => {
  const { language } = useLanguage();
  const { transactions, loading } = useTransactions();

  const [filter, setFilter] = useState<FilterType>('all');

  const isRu = language === 'ru';
  const isKk = language === 'kk';

  const formatMoney = (amount: number) =>
    `${amount.toLocaleString('ru-RU')} ₸`;

  const filteredTransactions = transactions.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'income') return item.type === 'income';
    if (filter === 'expense') return item.type === 'expense';

    return (
      item.type === 'transfer_in' ||
      item.type === 'transfer_out'
    );
  });

  const getTitle = (item: typeof transactions[number]) => {
    if (item.type === 'transfer_in') {
      return item.counterparty || (isRu ? 'Входящий перевод' : 'Кіріс аударымы');
    }

    if (item.type === 'transfer_out') {
      return item.counterparty || (isRu ? 'Исходящий перевод' : 'Шығыс аударымы');
    }

    return item.description || item.category;
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'income':
        return isRu ? 'Доход' : isKk ? 'Кіріс' : 'Income';
      case 'expense':
        return isRu ? 'Расход' : isKk ? 'Шығыс' : 'Expense';
      case 'transfer_in':
        return isRu ? 'Вам перевели' : isKk ? 'Сізге аударылды' : 'Received';
      case 'transfer_out':
        return isRu ? 'Вы перевели' : isKk ? 'Сіз аудардыңыз' : 'Sent';
      default:
        return '';
    }
  };

  const isPositive = (type: string) =>
    type === 'income' || type === 'transfer_in';

  const filters: { label: string; value: FilterType }[] = [
    { label: isRu ? 'Все' : isKk ? 'Барлығы' : 'All', value: 'all' },
    { label: isRu ? 'Доходы' : isKk ? 'Кіріс' : 'Income', value: 'income' },
    { label: isRu ? 'Расходы' : isKk ? 'Шығыс' : 'Expenses', value: 'expense' },
    { label: isRu ? 'Переводы' : isKk ? 'Аударымдар' : 'Transfers', value: 'transfers' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backText}>‹ {isRu ? 'Назад' : 'Артқа'}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>
          {isRu ? 'История операций' : isKk ? 'Операциялар тарихы' : 'Transactions'}
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContainer}
      >
        {filters.map(item => (
          <TouchableOpacity
            key={item.value}
            style={[
              styles.filterButton,
              filter === item.value && styles.activeFilter,
            ]}
            onPress={() => setFilter(item.value)}
          >
            <Text style={[
              styles.filterText,
              filter === item.value && styles.activeFilterText,
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.list}>
        {loading ? (
          <Text style={styles.emptyText}>
            {isRu ? 'Загрузка...' : 'Жүктелуде...'}
          </Text>
        ) : filteredTransactions.length === 0 ? (
          <Text style={styles.emptyText}>
            {isRu ? 'Операций пока нет' : 'Операциялар әзірге жоқ'}
          </Text>
        ) : (
          filteredTransactions.map(item => (
            <View style={styles.item} key={item.id}>
              <View style={styles.icon}>
                <Text style={styles.emoji}>
                  {item.type === 'income'
                    ? '💰'
                    : item.type === 'expense'
                    ? '🛒'
                    : '💸'}
                </Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.name}>{getTitle(item)}</Text>

                <Text style={styles.details}>
                  {getTypeLabel(item.type)} · {new Date(item.date).toLocaleString(
                    isRu ? 'ru-RU' : isKk ? 'kk-KZ' : 'en-US'
                  )}
                </Text>
              </View>

              <Text style={[
                styles.amount,
                isPositive(item.type) ? styles.positive : styles.negative,
              ]}>
                {isPositive(item.type) ? '+' : '-'}
                {formatMoney(item.amount)}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 15,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backText: {
    color: colors.secondary,
    fontSize: 16,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  filterScroll: {
    maxHeight: 55,
    flexGrow: 0,
  },
  filterContainer: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeFilter: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    color: colors.text,
    fontWeight: '600',
  },
  activeFilterText: {
    color: colors.white,
  },
  list: {
    padding: 20,
    paddingBottom: 40,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  emoji: {
    fontSize: 20,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  details: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 5,
  },
  amount: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  positive: {
    color: '#2E7D32',
  },
  negative: {
    color: '#C62828',
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textMuted,
    marginTop: 40,
  },
});
