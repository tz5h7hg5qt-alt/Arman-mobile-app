import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../theme/colors';

export const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Салам, Арман 👋</Text>
          <Text style={styles.subGreeting}>Каржылык абалыңыз</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Жалпы баланс</Text>
        <Text style={styles.cardBalance}>450,000 ₸</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>↓ Киреше</Text>
            <Text style={styles.statIncome}>+ 600,000 ₸</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>↑ Чыгым</Text>
            <Text style={styles.statExpense}>- 150,000 ₸</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Акыркы операциялар</Text>
        
        <View style={styles.txItem}>
          <View style={styles.txIcon}>
            <Text style={styles.txEmoji}>🛒</Text>
          </View>
          <View style={styles.txInfo}>
            <Text style={styles.txTitle}>Supermarket</Text>
            <Text style={styles.txDate}>Бүгүн, 14:20</Text>
          </View>
          <Text style={styles.txExpense}>- 12,500 ₸</Text>
        </View>

        <View style={styles.txItem}>
          <View style={styles.txIcon}>
            <Text style={styles.txEmoji}>💼</Text>
          </View>
          <View style={styles.txInfo}>
            <Text style={styles.txTitle}>Айлык</Text>
            <Text style={styles.txDate}> Кечээ, 10:00</Text>
          </View>
          <Text style={styles.txIncome}>+ 350,000 ₸</Text>
        </View>

        <View style={styles.txItem}>
          <View style={styles.txIcon}>
            <Text style={styles.txEmoji}>☕</Text>
          </View>
          <View style={styles.txInfo}>
            <Text style={styles.txTitle}>Coffee Shop</Text>
            <Text style={styles.txDate}>Кечээ, 18:30</Text>
          </View>
          <Text style={styles.txExpense}>- 2,200 ₸</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
  },
  subGreeting: {
    fontSize: 14,
    color: colors.textMuted,
  },
  card: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  cardTitle: {
    color: colors.accent,
    fontSize: 14,
  },
  cardBalance: {
    color: colors.white,
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.15)',
  },
  statItem: {
    flex: 1,
  },
  divider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginHorizontal: 10,
  },
  statLabel: {
    color: colors.accent,
    fontSize: 12,
  },
  statIncome: {
    color: '#81C784',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 2,
  },
  statExpense: {
    color: '#E57373',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 2,
  },
  section: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 16,
  },
  txItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  txIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  txEmoji: {
    fontSize: 20,
  },
  txInfo: {
    flex: 1,
  },
  txTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  txDate: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  txIncome: {
    color: '#2E7D32',
    fontWeight: 'bold',
    fontSize: 15,
  },
  txExpense: {
    color: '#C62828',
    fontWeight: 'bold',
    fontSize: 15,
  },
});