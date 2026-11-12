
import React from 'react';
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
  onAddTransaction: () => void;
  onOpenTransactions: () => void;
}

export const HomeScreen = ({
  onAddTransaction,
  onOpenTransactions,
}: Props) => {
  const { t, language } = useLanguage();

  const {
    transactions,
    balance,
    totalIncome,
    totalExpense,
    loading,
  } = useTransactions();

  const isRu = language === 'ru';
  const isKk = language === 'kk';

  const formatMoney = (amount: number) =>
    `${amount.toLocaleString('ru-RU')} ₸`;

  const getTransactionTitle = (item: typeof transactions[number]) => {
    if (item.type === 'transfer_in') {
      return item.counterparty || (
        isRu ? 'Входящий перевод' : 'Кіріс аударымы'
      );
    }

    if (item.type === 'transfer_out') {
      return item.counterparty || (
        isRu ? 'Исходящий перевод' : 'Шығыс аударымы'
      );
    }

    return item.description || item.category;
  };

  const getTransactionType = (type: string) => {
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

  const addButtonLabel = isRu
    ? 'Добавить операцию'
    : isKk
    ? 'Операция қосу'
    : 'Add transaction';

  const allButtonLabel = isRu
    ? 'Все'
    : isKk
    ? 'Барлығы'
    : 'All';

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>
          {t('greeting')} 👋
        </Text>

        <Text style={styles.subGreeting}>
          {isRu
            ? 'Ваше финансовое положение'
            : isKk
            ? 'Қаржылық жағдайыңыз'
            : 'Your financial overview'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('balance')}</Text>

        <Text style={styles.cardBalance}>
          {formatMoney(balance)}
        </Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>
              ↓ {t('income')}
            </Text>

            <Text style={styles.statIncome}>
              + {formatMoney(totalIncome)}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.statItem}>
            <Text style={styles.statLabel}>
              ↑ {t('expense')}
            </Text>

            <Text style={styles.statExpense}>
              - {formatMoney(totalExpense)}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={onAddTransaction}
        activeOpacity={0.8}
      >
        <Text style={styles.addButtonText}>
          + {addButtonLabel}
        </Text>
      </TouchableOpacity>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {t('recent')}
          </Text>

          <TouchableOpacity
            style={styles.allButton}
            onPress={onOpenTransactions}
            activeOpacity={0.7}
          >
            <Text style={styles.allButtonText}>
              {allButtonLabel}
            </Text>
            <Text style={styles.allButtonArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <Text style={styles.emptyText}>
            {isRu ? 'Загрузка...' : isKk ? 'Жүктелуде...' : 'Loading...'}
          </Text>
        ) : transactions.length === 0 ? (
          <Text style={styles.emptyText}>
            {isRu
              ? 'Операций пока нет. Добавьте первую операцию.'
              : isKk
              ? 'Әзірге операция жоқ. Бірінші операцияңызды қосыңыз.'
              : 'No transactions yet. Add your first transaction.'}
          </Text>
        ) : (
          transactions.slice(0, 10).map(item => (
            <View style={styles.txItem} key={item.id}>
              <View style={styles.txIcon}>
                <Text style={styles.txEmoji}>
                  {item.type === 'income'
                    ? '💰'
                    : item.type === 'expense'
                    ? '🛒'
                    : '💸'}
                </Text>
              </View>

              <View style={styles.txInfo}>
                <Text style={styles.txTitle} numberOfLines={1}>
                  {getTransactionTitle(item)}
                </Text>

                <Text style={styles.txDate}>
                  {getTransactionType(item.type)} ·{' '}
                  {new Date(item.date).toLocaleDateString(
                    isRu ? 'ru-RU' : isKk ? 'kk-KZ' : 'en-US'
                  )}
                </Text>
              </View>

              <Text
                style={
                  isPositive(item.type)
                    ? styles.txIncome
                    : styles.txExpense
                }
                numberOfLines={1}
              >
                {isPositive(item.type) ? '+' : '-'}
                {formatMoney(item.amount)}
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginTop: 40,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  subGreeting: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 6,
  },
  card: {
    backgroundColor: colors.primary,
    borderRadius: 22,
    padding: 22,
    marginBottom: 22,
  },
  cardTitle: {
    color: colors.accent,
    fontSize: 15,
  },
  cardBalance: {
    color: colors.white,
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.15)',
  },
  statItem: {
    flex: 1,
    minWidth: 0,
  },
  divider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginHorizontal: 12,
  },
  statLabel: {
    color: colors.accent,
    fontSize: 13,
  },
  statIncome: {
    color: '#81C784',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 6,
  },
  statExpense: {
    color: '#E57373',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 6,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    minHeight: 58,
    elevation: 3,
  },
  addButtonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: 'bold',
  },
  section: {
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
    gap: 10,
  },
  sectionTitle: {
    flex: 1,
    flexShrink: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  allButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E7F1EB',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 12,
    flexShrink: 0,
  },
  allButtonText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: 'bold',
  },
  allButtonArrow: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,
    marginTop: -2,
  },
  txItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  txIcon: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  txEmoji: {
    fontSize: 21,
  },
  txInfo: {
    flex: 1,
    minWidth: 0,
  },
  txTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  txDate: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 5,
  },
  txIncome: {
    color: '#2E7D32',
    fontWeight: 'bold',
    fontSize: 13,
    marginLeft: 6,
  },
  txExpense: {
    color: '#C62828',
    fontWeight: 'bold',
    fontSize: 13,
    marginLeft: 6,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
    padding: 20,
  },
});
