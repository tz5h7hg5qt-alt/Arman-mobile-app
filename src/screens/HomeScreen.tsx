
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { colors } from '../theme/colors';
import { useLanguage } from '../i18n/LanguageContext';
import { useTransactions } from '../context/TransactionContext';
import { useSavings } from '../context/SavingsContext';

interface Props {
  onAddTransaction: () => void;
  onOpenTransactions: () => void;
}

type Tab = 'home' | 'stats' | 'transfers' | 'savings' | 'profile';

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

  const {
    goals,
    loading: savingsLoading,
    addGoal,
    addDeposit,
    deleteGoal,
    updateGoal,
  } = useSavings();

  const [activeTab, setActiveTab] = useState<Tab>('home');

  const [showGoalForm, setShowGoalForm] = useState(false);
  const [goalTitle, setGoalTitle] = useState('');
  const [goalTarget, setGoalTarget] = useState('');

  const [depositGoalId, setDepositGoalId] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState('');
  const [depositNote, setDepositNote] = useState('');

  const [historyGoalId, setHistoryGoalId] = useState<string | null>(null);

  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editTarget, setEditTarget] = useState('');

  const isRu = language === 'ru';
  const isKk = language === 'kk';

  const label = (kk: string, ru: string, en: string) =>
    isRu ? ru : isKk ? kk : en;

  const formatMoney = (amount: number) =>
    `${amount.toLocaleString('ru-RU')} ₸`;

  const formatDateTime = (date: string) =>
    new Date(date).toLocaleString(
      isRu ? 'ru-RU' : isKk ? 'kk-KZ' : 'en-US',
      {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }
    );

  const getTransactionTitle = (item: typeof transactions[number]) => {
    if (item.type === 'transfer_in') {
      return item.counterparty || label(
        'Кіріс аударымы',
        'Входящий перевод',
        'Incoming transfer'
      );
    }

    if (item.type === 'transfer_out') {
      return item.counterparty || label(
        'Шығыс аударымы',
        'Исходящий перевод',
        'Outgoing transfer'
      );
    }

    return item.description || item.category;
  };

  const getTransactionType = (type: string) => {
    switch (type) {
      case 'income':
        return label('Кіріс', 'Доход', 'Income');
      case 'expense':
        return label('Шығыс', 'Расход', 'Expense');
      case 'transfer_in':
        return label('Сізге аударылды', 'Вам перевели', 'Received');
      case 'transfer_out':
        return label('Сіз аудардыңыз', 'Вы перевели', 'Sent');
      default:
        return '';
    }
  };

  const isPositive = (type: string) =>
    type === 'income' || type === 'transfer_in';

  const renderTransaction = (item: typeof transactions[number]) => (
    <View style={styles.txItem} key={item.id}>
      <View style={styles.txIcon}>
        <Ionicons
          name={
            item.type === 'income'
              ? 'arrow-down-circle-outline'
              : item.type === 'expense'
              ? 'cart-outline'
              : 'swap-horizontal-outline'
          }
          size={25}
          color={colors.primary}
        />
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
        style={isPositive(item.type) ? styles.txIncome : styles.txExpense}
        numberOfLines={1}
      >
        {isPositive(item.type) ? '+' : '-'}
        {formatMoney(item.amount)}
      </Text>
    </View>
  );

  const renderHome = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          {t('greeting')} 👋
        </Text>

        <Text style={styles.subGreeting}>
          {label(
            'Қаржылық жағдайыңыз',
            'Ваше финансовое положение',
            'Your financial overview'
          )}
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
        <Ionicons name="add-circle-outline" size={22} color="#FFFFFF" />
        <Text style={styles.addButtonText}>
          {label('Операция қосу', 'Добавить операцию', 'Add transaction')}
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
              {label('Барлығы', 'Все', 'See all')}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>

        {loading ? (
          <Text style={styles.emptyText}>
            {label('Жүктелуде...', 'Загрузка...', 'Loading...')}
          </Text>
        ) : transactions.length === 0 ? (
          <Text style={styles.emptyText}>
            {label(
              'Әзірге операция жоқ. Бірінші операцияңызды қосыңыз.',
              'Операций пока нет. Добавьте первую операцию.',
              'No transactions yet. Add your first transaction.'
            )}
          </Text>
        ) : (
          transactions.slice(0, 10).map(renderTransaction)
        )}
      </View>
    </>
  );

  const renderStats = () => (
    <View>
      <Text style={styles.pageTitle}>
        {label('Статистика', 'Статистика', 'Statistics')}
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('balance')}</Text>
        <Text style={styles.cardBalance}>{formatMoney(balance)}</Text>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="trending-up" size={25} color="#2E7D32" />
        <Text style={styles.infoTitle}>{t('income')}</Text>
        <Text style={styles.statIncomeLarge}>
          + {formatMoney(totalIncome)}
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="trending-down" size={25} color="#C62828" />
        <Text style={styles.infoTitle}>{t('expense')}</Text>
        <Text style={styles.statExpenseLarge}>
          - {formatMoney(totalExpense)}
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>
          {label('Барлық операция саны', 'Всего операций', 'Total transactions')}
        </Text>
        <Text style={styles.pageTitle}>
          {transactions.length}
        </Text>
      </View>
    </View>
  );

  const renderTransfers = () => {
    const transfers = transactions.filter(
      item =>
        item.type === 'transfer_in' ||
        item.type === 'transfer_out'
    );

    return (
      <View>
        <Text style={styles.pageTitle}>
          {label('Аударымдар', 'Переводы', 'Transfers')}
        </Text>

        {transfers.length === 0 ? (
          <Text style={styles.emptyText}>
            {label('Әзірге аударым жоқ', 'Пока нет переводов', 'No transfers yet')}
          </Text>
        ) : (
          transfers.map(renderTransaction)
        )}
      </View>
    );
  };

  const handleAddGoal = async () => {
    const amount = Number(goalTarget.replace(',', '.'));

    if (!goalTitle.trim() || !Number.isFinite(amount) || amount <= 0) {
      Alert.alert(
        label('Қате', 'Ошибка', 'Error'),
        label(
          'Мақсат атауы мен дұрыс соманы енгіз.',
          'Введите название цели и правильную сумму.',
          'Enter a goal name and a valid amount.'
        )
      );
      return;
    }

    try {
      await addGoal(goalTitle, amount);
      setGoalTitle('');
      setGoalTarget('');
      setShowGoalForm(false);

      Alert.alert(
        label('Дайын!', 'Готово!', 'Done!'),
        label('Жинақ мақсаты қосылды.', 'Цель накопления добавлена.', 'Savings goal added.')
      );
    } catch (error) {
      Alert.alert(
        label('Қате', 'Ошибка', 'Error'),
        error instanceof Error ? error.message : String(error)
      );
    }
  };

  const handleAddDeposit = async (goalId: string) => {
    const amount = Number(depositAmount.replace(',', '.'));

    if (!Number.isFinite(amount) || amount <= 0) {
      Alert.alert(
        label('Қате', 'Ошибка', 'Error'),
        label('Дұрыс соманы енгіз.', 'Введите правильную сумму.', 'Enter a valid amount.')
      );
      return;
    }

    try {
      await addDeposit(goalId, amount, depositNote);

      setDepositAmount('');
      setDepositNote('');
      setDepositGoalId(null);

      Alert.alert(
        label('Дайын!', 'Готово!', 'Done!'),
        label('Ақша жинаққа қосылды.', 'Деньги добавлены в накопление.', 'Money added to savings.')
      );
    } catch (error) {
      Alert.alert(
        label('Қате', 'Ошибка', 'Error'),
        error instanceof Error ? error.message : String(error)
      );
    }
  };

  const handleEditGoal = async (goalId: string) => {
    const amount = Number(editTarget.replace(',', '.'));

    if (!editTitle.trim() || !Number.isFinite(amount) || amount <= 0) {
      Alert.alert(
        label('Қате', 'Ошибка', 'Error'),
        label('Атауы мен сомасын дұрыс енгіз.', 'Введите правильное название и сумму.', 'Enter a valid name and amount.')
      );
      return;
    }

    try {
      await updateGoal(goalId, editTitle, amount);
      setEditingGoalId(null);
      setEditTitle('');
      setEditTarget('');
    } catch (error) {
      Alert.alert(
        label('Қате', 'Ошибка', 'Error'),
        error instanceof Error ? error.message : String(error)
      );
    }
  };

  const confirmDeleteGoal = (goalId: string) => {
    Alert.alert(
      label('Жинақты өшіру', 'Удалить накопление', 'Delete savings goal'),
      label(
        'Бұл мақсат пен оның ақша салу тарихы өшіріледі. Жалғастырасыз ба?',
        'Цель и история пополнений будут удалены. Продолжить?',
        'This goal and its deposit history will be deleted. Continue?'
      ),
      [
        {
          text: label('Болдырмау', 'Отмена', 'Cancel'),
          style: 'cancel',
        },
        {
          text: label('Өшіру', 'Удалить', 'Delete'),
          style: 'destructive',
          onPress: () => {
            deleteGoal(goalId).catch(error => {
              Alert.alert('Error', String(error));
            });
          },
        },
      ]
    );
  };

  const renderSavings = () => (
    <View>
      <Text style={styles.pageTitle}>
        {label('Менің жинақтарым', 'Мои накопления', 'My savings')}
      </Text>

      <View style={styles.savingsIntro}>
        <Ionicons name="trophy-outline" size={38} color={colors.primary} />

        <Text style={styles.infoTitle}>
          {label('Арманың үшін ақша жина!', 'Копи на свою мечту!', 'Save for your dream!')}
        </Text>

        <Text style={styles.subGreeting}>
          {label(
            'Мақсат қой, ақша қос және нәтижені бақыла.',
            'Поставь цель, добавляй деньги и следи за результатом.',
            'Set a goal, add money and track your progress.'
          )}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setShowGoalForm(!showGoalForm);
          setEditingGoalId(null);
          setDepositGoalId(null);
        }}
      >
        <Ionicons name="add-circle-outline" size={22} color="#FFFFFF" />
        <Text style={styles.addButtonText}>
          {label('Жаңа мақсат қосу', 'Добавить новую цель', 'Add a new goal')}
        </Text>
      </TouchableOpacity>

      {showGoalForm && (
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>
            {label('Жаңа жинақ мақсаты', 'Новая цель накопления', 'New savings goal')}
          </Text>

          <TextInput
            style={styles.input}
            value={goalTitle}
            onChangeText={setGoalTitle}
            placeholder={label('Мысалы: iPhone 17', 'Например: iPhone 17', 'Example: iPhone 17')}
            placeholderTextColor="#82958B"
          />

          <TextInput
            style={styles.input}
            value={goalTarget}
            onChangeText={setGoalTarget}
            placeholder={label('Қажетті сома (₸)', 'Нужная сумма (₸)', 'Target amount (₸)')}
            placeholderTextColor="#82958B"
            keyboardType="decimal-pad"
          />

          <View style={styles.formButtons}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowGoalForm(false)}
            >
              <Text style={styles.cancelButtonText}>
                {label('Болдырмау', 'Отмена', 'Cancel')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleAddGoal}
            >
              <Text style={styles.saveButtonText}>
                {label('Сақтау', 'Сохранить', 'Save')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {savingsLoading ? (
        <Text style={styles.emptyText}>
          {label('Жинақтар жүктелуде...', 'Загрузка накоплений...', 'Loading savings...')}
        </Text>
      ) : goals.length === 0 ? (
        <Text style={styles.emptyText}>
          {label(
            'Әзірге жинақ мақсаты жоқ. Бірінші мақсатыңды қос!',
            'Пока нет целей. Добавь свою первую цель!',
            'No savings goals yet. Add your first goal!'
          )}
        </Text>
      ) : (
        goals.map(goal => {
          const totalSaved = goal.deposits.reduce(
            (sum, deposit) => sum + deposit.amount,
            0
          );

          const remaining = Math.max(goal.targetAmount - totalSaved, 0);
          const progress = Math.min(
            (totalSaved / goal.targetAmount) * 100,
            100
          );
          const remainingPercent = Math.max(100 - progress, 0);

          return (
            <View style={styles.goalCard} key={goal.id}>
              <View style={styles.goalHeader}>
                <View style={styles.goalIcon}>
                  <Ionicons name="wallet-outline" size={25} color={colors.primary} />
                </View>

                <View style={styles.goalNameContainer}>
                  <Text style={styles.goalTitle}>{goal.title}</Text>
                  <Text style={styles.goalDate}>
                    {label('Мақсат сомасы:', 'Цель:', 'Target:')} {formatMoney(goal.targetAmount)}
                  </Text>
                </View>
              </View>

              <View style={styles.goalMoneyRow}>
                <View>
                  <Text style={styles.goalSmallLabel}>
                    {label('Жиналды', 'Накоплено', 'Saved')}
                  </Text>
                  <Text style={styles.goalSaved}>
                    {formatMoney(totalSaved)}
                  </Text>
                </View>

                <View style={styles.goalRemainingBox}>
                  <Text style={styles.goalSmallLabel}>
                    {label('Қалды', 'Осталось', 'Remaining')}
                  </Text>
                  <Text style={styles.goalRemaining}>
                    {formatMoney(remaining)}
                  </Text>
                </View>
              </View>

              <View style={styles.progressBackground}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${progress}%` },
                  ]}
                />
              </View>

              <View style={styles.percentRow}>
                <Text style={styles.percentText}>
                  {label('Жиналды:', 'Собрано:', 'Completed:')} {progress.toFixed(1)}%
                </Text>
                <Text style={styles.percentText}>
                  {label('Қалды:', 'Осталось:', 'Left:')} {remainingPercent.toFixed(1)}%
                </Text>
              </View>

              {editingGoalId === goal.id ? (
                <View style={styles.formCard}>
                  <Text style={styles.formTitle}>
                    {label('Мақсатты өзгерту', 'Изменить цель', 'Edit goal')}
                  </Text>

                  <TextInput
                    style={styles.input}
                    value={editTitle}
                    onChangeText={setEditTitle}
                    placeholder={label('Мақсат атауы', 'Название цели', 'Goal name')}
                    placeholderTextColor="#82958B"
                  />

                  <TextInput
                    style={styles.input}
                    value={editTarget}
                    onChangeText={setEditTarget}
                    placeholder={label('Қажетті сома', 'Нужная сумма', 'Target amount')}
                    keyboardType="decimal-pad"
                    placeholderTextColor="#82958B"
                  />

                  <View style={styles.formButtons}>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => setEditingGoalId(null)}
                    >
                      <Text style={styles.cancelButtonText}>
                        {label('Болдырмау', 'Отмена', 'Cancel')}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={() => handleEditGoal(goal.id)}
                    >
                      <Text style={styles.saveButtonText}>
                        {label('Сақтау', 'Сохранить', 'Save')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}

              {depositGoalId === goal.id && (
                <View style={styles.formCard}>
                  <Text style={styles.formTitle}>
                    {label('Ақша қосу', 'Пополнить накопление', 'Add money')}
                  </Text>

                  <TextInput
                    style={styles.input}
                    value={depositAmount}
                    onChangeText={setDepositAmount}
                    placeholder={label('Сома (₸)', 'Сумма (₸)', 'Amount (₸)')}
                    keyboardType="decimal-pad"
                    placeholderTextColor="#82958B"
                  />

                  <TextInput
                    style={styles.input}
                    value={depositNote}
                    onChangeText={setDepositNote}
                    placeholder={label('Ескерту (міндетті емес)', 'Заметка (необязательно)', 'Note (optional)')}
                    placeholderTextColor="#82958B"
                  />

                  <Text style={styles.dateHint}>
                    <Ionicons name="time-outline" size={14} color={colors.textMuted} />
                    {' '}{label(
                      'Күн мен уақыт автоматты түрде сақталады.',
                      'Дата и время сохраняются автоматически.',
                      'Date and time are saved automatically.'
                    )}
                  </Text>

                  <View style={styles.formButtons}>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => setDepositGoalId(null)}
                    >
                      <Text style={styles.cancelButtonText}>
                        {label('Болдырмау', 'Отмена', 'Cancel')}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={() => handleAddDeposit(goal.id)}
                    >
                      <Text style={styles.saveButtonText}>
                        {label('Ақша қосу', 'Добавить', 'Add')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              <View style={styles.goalActions}>
                <TouchableOpacity
                  style={styles.goalActionButton}
                  onPress={() => {
                    setDepositGoalId(depositGoalId === goal.id ? null : goal.id);
                    setEditingGoalId(null);
                    setDepositAmount('');
                    setDepositNote('');
                  }}
                >
                  <Ionicons name="add-circle-outline" size={18} color={colors.primary} />
                  <Text style={styles.goalActionText}>
                    {label('Ақша қосу', 'Пополнить', 'Add')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.goalActionButton}
                  onPress={() => setHistoryGoalId(
                    historyGoalId === goal.id ? null : goal.id
                  )}
                >
                  <Ionicons name="time-outline" size={18} color={colors.primary} />
                  <Text style={styles.goalActionText}>
                    {label('Тарих', 'История', 'History')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.goalActionButton}
                  onPress={() => {
                    setEditingGoalId(goal.id);
                    setEditTitle(goal.title);
                    setEditTarget(String(goal.targetAmount));
                    setDepositGoalId(null);
                  }}
                >
                  <Ionicons name="create-outline" size={18} color={colors.primary} />
                  <Text style={styles.goalActionText}>
                    {label('Өзгерту', 'Изменить', 'Edit')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.goalActionButton}
                  onPress={() => confirmDeleteGoal(goal.id)}
                >
                  <Ionicons name="trash-outline" size={18} color="#C62828" />
                  <Text style={[styles.goalActionText, { color: '#C62828' }]}>
                    {label('Өшіру', 'Удалить', 'Delete')}
                  </Text>
                </TouchableOpacity>
              </View>

              {historyGoalId === goal.id && (
                <View style={styles.historyBox}>
                  <Text style={styles.historyTitle}>
                    {label('Ақша салу тарихы', 'История пополнений', 'Deposit history')}
                  </Text>

                  {goal.deposits.length === 0 ? (
                    <Text style={styles.emptyHistory}>
                      {label('Әзірге ақша салынбаған.', 'Пополнений пока нет.', 'No deposits yet.')}
                    </Text>
                  ) : (
                    goal.deposits.map(deposit => (
                      <View style={styles.depositItem} key={deposit.id}>
                        <View style={styles.depositInfo}>
                          <Text style={styles.depositAmount}>
                            + {formatMoney(deposit.amount)}
                          </Text>
                          <Text style={styles.depositDate}>
                            {formatDateTime(deposit.date)}
                          </Text>
                          {deposit.note ? (
                            <Text style={styles.depositNote}>{deposit.note}</Text>
                          ) : null}
                        </View>
                      </View>
                    ))
                  )}
                </View>
              )}
            </View>
          );
        })
      )}
    </View>
  );

  const renderProfile = () => (
    <View>
      <Text style={styles.pageTitle}>
        {label('Профиль', 'Профиль', 'Profile')}
      </Text>

      <View style={styles.infoCard}>
        <Ionicons
          name="person-circle-outline"
          size={55}
          color={colors.primary}
        />

        <Text style={styles.infoTitle}>
          {label('Жеке кабинет', 'Личный кабинет', 'Personal account')}
        </Text>

        <Text style={styles.subGreeting}>
          {label('Тіл:', 'Язык:', 'Language:')} {language.toUpperCase()}
        </Text>
      </View>

      <Text style={styles.emptyText}>
        {label(
          'Профиль баптауларын келесі кезеңде қосамыз.',
          'Настройки профиля добавим на следующем этапе.',
          'Profile settings will be added in the next stage.'
        )}
      </Text>
    </View>
  );

  const tabs: {
    key: Tab;
    icon: React.ComponentProps<typeof Ionicons>['name'];
    activeIcon: React.ComponentProps<typeof Ionicons>['name'];
    title: string;
  }[] = [
    {
      key: 'home',
      icon: 'home-outline',
      activeIcon: 'home',
      title: label('Басты', 'Главная', 'Home'),
    },
    {
      key: 'stats',
      icon: 'stats-chart-outline',
      activeIcon: 'stats-chart',
      title: label('Статистика', 'Статистика', 'Stats'),
    },
    {
      key: 'transfers',
      icon: 'swap-horizontal-outline',
      activeIcon: 'swap-horizontal',
      title: label('Аударым', 'Переводы', 'Transfers'),
    },
    {
      key: 'savings',
      icon: 'wallet-outline',
      activeIcon: 'wallet',
      title: label('Жинақ', 'Накопления', 'Savings'),
    },
    {
      key: 'profile',
      icon: 'person-outline',
      activeIcon: 'person',
      title: label('Профиль', 'Профиль', 'Profile'),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {activeTab === 'home' && renderHome()}
        {activeTab === 'stats' && renderStats()}
        {activeTab === 'transfers' && renderTransfers()}
        {activeTab === 'savings' && renderSavings()}
        {activeTab === 'profile' && renderProfile()}
      </ScrollView>

      <View style={styles.bottomBar}>
        {tabs.map(tab => {
          const active = activeTab === tab.key;

          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabButton}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={active ? tab.activeIcon : tab.icon}
                size={24}
                color={active ? colors.primary : '#82958B'}
              />

              <Text
                numberOfLines={1}
                style={[
                  styles.tabTitle,
                  active && styles.activeTabTitle,
                ]}
              >
                {tab.title}
              </Text>

              {active && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 28,
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
    flexDirection: 'row',
    gap: 9,
    marginBottom: 20,
    minHeight: 58,
    elevation: 3,
  },
  addButtonText: {
    color: colors.white,
    fontSize: 16,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  allButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E7F1EB',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  allButtonText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: 'bold',
    marginRight: 4,
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
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8EEE9',
    paddingTop: 9,
    paddingBottom: 8,
    minHeight: 70,
    elevation: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
  },
  tabTitle: {
    fontSize: 10,
    color: '#82958B',
    marginTop: 5,
    textAlign: 'center',
  },
  activeTabTitle: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  activeIndicator: {
    width: 18,
    height: 3,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginTop: 4,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 35,
    marginBottom: 22,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    marginBottom: 14,
    gap: 10,
  },
  infoTitle: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  statIncomeLarge: {
    color: '#2E7D32',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statExpenseLarge: {
    color: '#C62828',
    fontSize: 24,
    fontWeight: 'bold',
  },
  savingsIntro: {
    backgroundColor: colors.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    marginBottom: 18,
    gap: 10,
  },
  formCard: {
    backgroundColor: '#F4F8F5',
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    color: colors.text,
    marginBottom: 12,
  },
  formButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#E7EEE9',
    borderRadius: 12,
    padding: 13,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: colors.primary,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 13,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  goalCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  goalIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#E7F1EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  goalNameContainer: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.text,
  },
  goalDate: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 5,
  },
  goalMoneyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  goalRemainingBox: {
    alignItems: 'flex-end',
  },
  goalSmallLabel: {
    color: colors.textMuted,
    fontSize: 12,
    marginBottom: 5,
  },
  goalSaved: {
    color: '#2E7D32',
    fontSize: 17,
    fontWeight: 'bold',
  },
  goalRemaining: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: 'bold',
  },
  progressBackground: {
    height: 10,
    backgroundColor: '#E4EBE6',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2E8B57',
    borderRadius: 10,
  },
  percentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 9,
    marginBottom: 16,
  },
  percentText: {
    fontSize: 11,
    color: colors.textMuted,
  },
  goalActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
    gap: 8,
  },
  goalActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F5F1',
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 10,
    gap: 4,
  },
  goalActionText: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: '600',
  },
  historyBox: {
    backgroundColor: '#F5F8F6',
    borderRadius: 12,
    padding: 13,
    marginTop: 14,
  },
  historyTitle: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyHistory: {
    color: colors.textMuted,
    fontSize: 13,
    paddingVertical: 8,
  },
  depositItem: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 10,
  },
  depositInfo: {
    flex: 1,
  },
  depositAmount: {
    color: '#2E7D32',
    fontSize: 15,
    fontWeight: 'bold',
  },
  depositDate: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
  depositNote: {
    color: colors.text,
    fontSize: 12,
    marginTop: 4,
  },
  dateHint: {
    color: colors.textMuted,
    fontSize: 12,
    marginBottom: 12,
  },
});
