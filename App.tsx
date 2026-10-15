import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
type Screen =
  | 'home'
  | 'massage'
  | 'duration'
  | 'booking'
  | 'bookings'
  | 'profile';
type Massage = {
  id: string;
  name: string;
  icon: string;
  description: string;
  prices: {
    '15': number;
    '30': number;
    '60': number;
  };
};
const massages: Massage[] = [
  {
    id: '1',
    name: 'Классикалық массаж',
    icon: '💆',
    description: 'Денені босаңсытып, бұлшықеттерді демалдырады.',
    prices: {
      '15': 3000,
      '30': 5000,
      '60': 8000,
    },
  },
  {
    id: '2',
    name: 'Релакс массаж',
    icon: '🌿',
    description: 'Стрессті азайтып, толық демалуға көмектеседі.',
    prices: {
      '15': 3500,
      '30': 6000,
      '60': 10000,
    },
  },
  {
    id: '3',
    name: 'Спорттық массаж',
    icon: '💪',
    description: 'Белсенді өмір салты бар адамдарға арналған.',
    prices: {
      '15': 4000,
      '30': 7000,
      '60': 12000,
    },
  },
  {
    id: '4',
    name: 'Антистресс массаж',
    icon: '✨',
    description: 'Шаршауды азайтып, жеңілдік сезімін береді.',
    prices: {
      '15': 3000,
      '30': 5500,
      '60': 9000,
    },
  },
];
const formatPrice = (price: number) => {
  return `${price.toLocaleString('ru-RU')} ₸`;
};
function HomeScreen({
  goToMassage,
}: {
  goToMassage: () => void;
}) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Қош келдіңіз 👋</Text>
          <Text style={styles.logo}>RoseRelax</Text>
        </View>
        <View style={styles.headerCircle}>
          <Text style={styles.headerEmoji}>💆</Text>
        </View>
      </View>
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>
          Өзіңізге уақыт бөліңіз
        </Text>
        <Text style={styles.bannerText}>
          Кәсіби массаж маманын үйіңізге шақырыңыз.
          Ыңғайлы уақытта және өзіңіз таңдаған жерде.
        </Text>
        <TouchableOpacity
          style={styles.bannerButton}
          onPress={goToMassage}
          activeOpacity={0.8}
        >
          <Text style={styles.bannerButtonText}>
            Массаж таңдау
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>
        Массаж қызметтері
      </Text>
      {massages.map((massage) => (
        <TouchableOpacity
          key={massage.id}
          style={styles.card}
          onPress={goToMassage}
          activeOpacity={0.8}
        >
          <View style={styles.cardIconBox}>
            <Text style={styles.cardIcon}>
              {massage.icon}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>
              {massage.name}
            </Text>
            <Text style={styles.cardDuration}>
              15 / 30 / 60 минут
            </Text>
          </View>
          <Text style={styles.cardArrow}>›</Text>
        </TouchableOpacity>
      ))}
      <View style={styles.infoBox}>
        <Text style={styles.infoIcon}>🏠</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.infoTitle}>
            Үйге массаж
          </Text>
          <Text style={styles.infoText}>
            Маман сіз көрсеткен мекенжайға келеді.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
function MassageScreen({
  selectMassage,
}: {
  selectMassage: (massage: Massage) => void;
}) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={styles.pageTitle}>
        Массаж түрлері
      </Text>
      <Text style={styles.pageSubtitle}>
        Массаж түрін таңдаңыз
      </Text>
      {massages.map((massage) => (
        <TouchableOpacity
          key={massage.id}
          style={styles.bigCard}
          onPress={() => selectMassage(massage)}
          activeOpacity={0.85}
        >
          <View style={styles.bigTop}>
            <View style={styles.bigIconBox}>
              <Text style={styles.bigIcon}>
                {massage.icon}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.bigTitle}>
                {massage.name}
              </Text>
              <Text style={styles.description}>
                {massage.description}
              </Text>
            </View>
          </View>
          <View style={styles.pricePreview}>
            <View>
              <Text style={styles.previewLabel}>
                15 мин
              </Text>
              <Text style={styles.previewPrice}>
                {formatPrice(massage.prices['15'])}
              </Text>
            </View>
            <View>
              <Text style={styles.previewLabel}>
                30 мин
              </Text>
              <Text style={styles.previewPrice}>
                {formatPrice(massage.prices['30'])}
              </Text>
            </View>
            <View>
              <Text style={styles.previewLabel}>
                60 мин
              </Text>
              <Text style={styles.previewPrice}>
                {formatPrice(massage.prices['60'])}
              </Text>
            </View>
          </View>
          <View style={styles.chooseFullButton}>
            <Text style={styles.chooseFullText}>
              Таңдау
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
function DurationScreen({
  massage,
  selectedDuration,
  setSelectedDuration,
  continueBooking,
}: {
  massage: Massage;
  selectedDuration: '15' | '30' | '60';
  setSelectedDuration: (
    duration: '15' | '30' | '60'
  ) => void;
  continueBooking: () => void;
}) {
  const durations: Array<'15' | '30' | '60'> = [
    '15',
    '30',
    '60',
  ];
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={styles.pageTitle}>
        Уақытты таңдаңыз
      </Text>
      <Text style={styles.pageSubtitle}>
        {massage.name}
      </Text>
      <View style={styles.selectedMassageBox}>
        <Text style={styles.selectedMassageIcon}>
          {massage.icon}
        </Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.selectedMassageName}>
            {massage.name}
          </Text>
          <Text style={styles.selectedMassageInfo}>
            Массаж ұзақтығын таңдаңыз
          </Text>
        </View>
      </View>
      {durations.map((duration) => {
        const active =
          selectedDuration === duration;
        return (
          <TouchableOpacity
            key={duration}
            style={[
              styles.durationCard,
              active && styles.durationCardActive,
            ]}
            onPress={() =>
              setSelectedDuration(duration)
            }
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.radio,
                active && styles.radioActive,
              ]}
            >
              {active && (
                <View style={styles.radioDot} />
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.durationTitle,
                  active && styles.activeText,
                ]}
              >
                {duration} минут
              </Text>
              <Text style={styles.durationSubtitle}>
                Массаж сеансы
              </Text>
            </View>
            <Text
              style={[
                styles.durationPrice,
                active && styles.activeText,
              ]}
            >
              {formatPrice(
                massage.prices[duration]
              )}
            </Text>
          </TouchableOpacity>
        );
      })}
      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>
          Таңдалған қызмет
        </Text>
        <Text style={styles.totalName}>
          {massage.name}
        </Text>
        <View style={styles.totalRow}>
          <Text style={styles.totalDuration}>
            {selectedDuration} минут
          </Text>
          <Text style={styles.totalPrice}>
            {formatPrice(
              massage.prices[selectedDuration]
            )}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.mainButton}
        onPress={continueBooking}
        activeOpacity={0.8}
      >
        <Text style={styles.mainButtonText}>
          Жалғастыру
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
function BookingScreen({
  massage,
  duration,
  name,
  phone,
  address,
  date,
  time,
  setName,
  setPhone,
  setAddress,
  setDate,
  setTime,
  bookMassage,
}: {
  massage: Massage;
  duration: '15' | '30' | '60';
  name: string;
  phone: string;
  address: string;
  date: string;
  time: string;
  setName: (value: string) => void;
  setPhone: (value: string) => void;
  setAddress: (value: string) => void;
  setDate: (value: string) => void;
  setTime: (value: string) => void;
  bookMassage: () => void;
}) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.pageTitle}>
          Брондау
        </Text>
        <Text style={styles.pageSubtitle}>
          Ақпараттарыңызды енгізіңіз
        </Text>
        <View style={styles.bookingSummary}>
          <View style={styles.summaryIconBox}>
            <Text style={styles.summaryIcon}>
              {massage.icon}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.summaryTitle}>
              {massage.name}
            </Text>
            <Text style={styles.summaryInfo}>
              {duration} минут
            </Text>
          </View>
          <Text style={styles.summaryPrice}>
            {formatPrice(
              massage.prices[duration]
            )}
          </Text>
        </View>
        <Text style={styles.inputLabel}>
          Аты-жөніңіз
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Мысалы: Арман Мухаммеджанов"
          placeholderTextColor="#AAA"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          autoCorrect={false}
          returnKeyType="next"
        />
        <Text style={styles.inputLabel}>
          Телефон нөмірі
        </Text>
        <TextInput
          style={styles.input}
          placeholder="+7 700 000 00 00"
          placeholderTextColor="#AAA"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          returnKeyType="next"
        />
        <Text style={styles.inputLabel}>
          Мекенжай
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Алматы, Абая көшесі 10"
          placeholderTextColor="#AAA"
          value={address}
          onChangeText={setAddress}
          returnKeyType="next"
        />
        <Text style={styles.inputLabel}>
          Күн
        </Text>
        <TextInput
          style={styles.input}
          placeholder="08.10.2026"
          placeholderTextColor="#AAA"
          value={date}
          onChangeText={setDate}
          keyboardType="numbers-and-punctuation"
          returnKeyType="next"
        />
        <Text style={styles.inputLabel}>
          Уақыт
        </Text>
        <TextInput
          style={styles.input}
          placeholder="18:00"
          placeholderTextColor="#AAA"
          value={time}
          onChangeText={setTime}
          keyboardType="numbers-and-punctuation"
          returnKeyType="done"
        />
        <TouchableOpacity
          style={styles.mainButton}
          onPress={bookMassage}
          activeOpacity={0.8}
        >
          <Text style={styles.mainButtonText}>
            Бронь жасау
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
function BookingsScreen({
  name,
  phone,
  address,
  date,
  time,
  massage,
  duration,
}: {
  name: string;
  phone: string;
  address: string;
  date: string;
  time: string;
  massage: Massage;
  duration: '15' | '30' | '60';
}) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={styles.pageTitle}>
        Менің броньдарым
      </Text>
      <Text style={styles.pageSubtitle}>
        Сіздің тапсырысыңыз
      </Text>
      {name ? (
        <View style={styles.bookingCard}>
          <View style={styles.bookingTop}>
            <View style={styles.bookingIconBox}>
              <Text style={styles.bookingIcon}>
                {massage.icon}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.bookingTitle}>
                {massage.name}
              </Text>
              <Text style={styles.bookingStatus}>
                ✓ Бронь расталды
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <Text style={styles.bookingInfo}>
            ⏱ {duration} минут
          </Text>
          <Text style={styles.bookingInfo}>
            💰 {formatPrice(
              massage.prices[duration]
            )}
          </Text>
          <Text style={styles.bookingInfo}>
            👤 {name}
          </Text>
          <Text style={styles.bookingInfo}>
            📞 {phone}
          </Text>
          <Text style={styles.bookingInfo}>
            📍 {address}
          </Text>
          <Text style={styles.bookingInfo}>
            📅 {date}     🕐 {time}
          </Text>
        </View>
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>📅</Text>
          <Text style={styles.emptyTitle}>
            Бронь жоқ
          </Text>
          <Text style={styles.emptyText}>
            Массаж таңдап, бронь жасаңыз
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
function ProfileScreen({
  name,
  phone,
  address,
  setPhone,
  setAddress,
}: {
  name: string;
  phone: string;
  address: string;
  setPhone: (value: string) => void;
  setAddress: (value: string) => void;
}) {
  const [editingPhone, setEditingPhone] =
    useState(false);
  const [editingAddress, setEditingAddress] =
    useState(false);
  const [notifications, setNotifications] =
    useState(true);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={styles.pageTitle}>
        Профиль
      </Text>
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            👤
          </Text>
        </View>
        <Text style={styles.profileName}>
          {name || 'Қолданушы'}
        </Text>
        <Text style={styles.profilePhone}>
          {phone || 'Телефон енгізілмеген'}
        </Text>
      </View>
      {/* МЕКЕНЖАЙ */}
      <View style={styles.profileBox}>
        <View style={styles.profileRow}>
          <View style={styles.profileIconBox}>
            <Text style={styles.profileItemIcon}>
              📍
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.profileItemText}>
              Мекенжай
            </Text>
            {!editingAddress && (
              <Text style={styles.profileValue}>
                {address ||
                  'Мекенжай енгізілмеген'}
              </Text>
            )}
          </View>
          <TouchableOpacity
            onPress={() =>
              setEditingAddress(
                !editingAddress
              )
            }
          >
            <Text style={styles.editText}>
              {editingAddress
                ? 'Сақтау'
                : 'Өзгерту'}
            </Text>
          </TouchableOpacity>
        </View>
        {editingAddress && (
          <TextInput
            style={styles.profileInput}
            placeholder="Алматы, Абая 10"
            placeholderTextColor="#AAA"
            value={address}
            onChangeText={setAddress}
          />
        )}
      </View>
      {/* ТЕЛЕФОН */}
      <View style={styles.profileBox}>
        <View style={styles.profileRow}>
          <View style={styles.profileIconBox}>
            <Text style={styles.profileItemIcon}>
              📞
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.profileItemText}>
              Телефон нөмірі
            </Text>
            {!editingPhone && (
              <Text style={styles.profileValue}>
                {phone ||
                  'Телефон енгізілмеген'}
              </Text>
            )}
          </View>
          <TouchableOpacity
            onPress={() =>
              setEditingPhone(!editingPhone)
            }
          >
            <Text style={styles.editText}>
              {editingPhone
                ? 'Сақтау'
                : 'Өзгерту'}
            </Text>
          </TouchableOpacity>
        </View>
        {editingPhone && (
          <TextInput
            style={styles.profileInput}
            placeholder="+7 700 000 00 00"
            placeholderTextColor="#AAA"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        )}
      </View>
      {/* ХАБАРЛАМАЛАР */}
      <View style={styles.profileBox}>
        <View style={styles.profileRow}>
          <View style={styles.profileIconBox}>
            <Text style={styles.profileItemIcon}>
              🔔
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.profileItemText}>
              Хабарламалар
            </Text>
            <Text style={styles.profileValue}>
              {notifications
                ? 'Қосулы'
                : 'Өшірулі'}
            </Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{
              false: '#DDD',
              true: '#E8B4B8',
            }}
            thumbColor={
              notifications
                ? '#B76E79'
                : '#FFF'
            }
          />
        </View>
      </View>
    </ScrollView>
  );
}
export default function App() {
  const [screen, setScreen] =
    useState<Screen>('home');
  const [selectedMassage, setSelectedMassage] =
    useState<Massage>(massages[0]);
  const [selectedDuration, setSelectedDuration] =
    useState<'15' | '30' | '60'>('60');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const selectMassage = (massage: Massage) => {
    setSelectedMassage(massage);
    setSelectedDuration('60');
    setScreen('duration');
  };
  const continueBooking = () => {
    setScreen('booking');
  };
  const bookMassage = () => {
    if (
      !name.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !date.trim() ||
      !time.trim()
    ) {
      Alert.alert(
        'Ақпарат толық емес',
        'Барлық жолдарды толтырыңыз.'
      );
      return;
    }
    Alert.alert(
      'Бронь расталды 🎉',
      `${selectedMassage.name}\n${selectedDuration} минут — ${formatPrice(
        selectedMassage.prices[selectedDuration]
      )}\n${date} — ${time}`,
      [
        {
          text: 'Жақсы',
          onPress: () => setScreen('bookings'),
        },
      ]
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        {screen === 'home' && (
          <HomeScreen
            goToMassage={() =>
              setScreen('massage')
            }
          />
        )}
        {screen === 'massage' && (
          <MassageScreen
            selectMassage={selectMassage}
          />
        )}
        {screen === 'duration' && (
          <DurationScreen
            massage={selectedMassage}
            selectedDuration={selectedDuration}
            setSelectedDuration={
              setSelectedDuration
            }
            continueBooking={
              continueBooking
            }
          />
        )}
        {screen === 'booking' && (
          <BookingScreen
            massage={selectedMassage}
            duration={selectedDuration}
            name={name}
            phone={phone}
            address={address}
            date={date}
            time={time}
            setName={setName}
            setPhone={setPhone}
            setAddress={setAddress}
            setDate={setDate}
            setTime={setTime}
            bookMassage={bookMassage}
          />
        )}
        {screen === 'bookings' && (
          <BookingsScreen
            name={name}
            phone={phone}
            address={address}
            date={date}
            time={time}
            massage={selectedMassage}
            duration={selectedDuration}
          />
        )}
        {screen === 'profile' && (
          <ProfileScreen
            name={name}
            phone={phone}
            address={address}
            setPhone={setPhone}
            setAddress={setAddress}
          />
        )}
      </View>
      {/* ТӨМЕНГІ МЕНЮ */}
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setScreen('home')}
        >
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navText}>
            Басты бет
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setScreen('massage')}
        >
          <Text style={styles.navIcon}>💆</Text>
          <Text style={styles.navText}>
            Массаж
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setScreen('bookings')}
        >
          <Text style={styles.navIcon}>📅</Text>
          <Text style={styles.navText}>
            Бронь
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setScreen('profile')}
        >
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navText}>
            Профиль
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F5',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  welcome: {
    fontSize: 14,
    color: '#888',
  },
  logo: {
    fontSize: 29,
    fontWeight: '800',
    color: '#B76E79',
    marginTop: 3,
  },
  headerCircle: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: '#F1D7D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerEmoji: {
    fontSize: 27,
  },
  banner: {
    backgroundColor: '#E8B4B8',
    borderRadius: 25,
    padding: 25,
    marginBottom: 25,
  },
  bannerTitle: {
    fontSize: 25,
    fontWeight: '800',
    color: '#4B292D',
  },
  bannerText: {
    fontSize: 15,
    lineHeight: 21,
    color: '#5F4144',
    marginTop: 9,
  },
  bannerButton: {
    backgroundColor: '#5E3439',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 13,
    alignSelf: 'flex-start',
    marginTop: 18,
  },
  bannerButtonText: {
    color: '#FFF',
    fontWeight: '800',
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#333',
    marginBottom: 14,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  cardIconBox: {
    width: 55,
    height: 55,
    borderRadius: 15,
    backgroundColor: '#FFF0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },
  cardIcon: {
    fontSize: 29,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  cardDuration: {
    color: '#999',
    marginTop: 5,
    fontSize: 13,
  },
  cardArrow: {
    fontSize: 28,
    color: '#B76E79',
  },
  infoBox: {
    backgroundColor: '#F1D7D9',
    borderRadius: 18,
    padding: 17,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  infoIcon: {
    fontSize: 30,
    marginRight: 13,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#5E3439',
  },
  infoText: {
    color: '#6F5558',
    fontSize: 13,
    marginTop: 3,
  },
  pageTitle: {
    fontSize: 29,
    fontWeight: '800',
    color: '#333',
    marginTop: 22,
  },
  pageSubtitle: {
    color: '#888',
    fontSize: 14,
    marginTop: 5,
    marginBottom: 20,
  },
  bigCard: {
    backgroundColor: '#FFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 15,
    elevation: 2,
  },
  bigTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bigIconBox: {
    width: 65,
    height: 65,
    borderRadius: 18,
    backgroundColor: '#FFF0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },
  bigIcon: {
    fontSize: 36,
  },
  bigTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#333',
  },
  description: {
    color: '#888',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
  },
  pricePreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF8F5',
    borderRadius: 14,
    padding: 13,
    marginTop: 17,
  },
  previewLabel: {
    color: '#999',
    fontSize: 11,
    textAlign: 'center',
  },
  previewPrice: {
    color: '#B76E79',
    fontSize: 14,
    fontWeight: '800',
    marginTop: 3,
  },
  chooseFullButton: {
    backgroundColor: '#B76E79',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  chooseFullText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '800',
  },
  selectedMassageBox: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  selectedMassageIcon: {
    fontSize: 38,
    marginRight: 14,
  },
  selectedMassageName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#333',
  },
  selectedMassageInfo: {
    color: '#999',
    marginTop: 4,
  },
  durationCard: {
    backgroundColor: '#FFF',
    borderRadius: 17,
    padding: 17,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#EEE',
  },
  durationCardActive: {
    borderColor: '#B76E79',
    backgroundColor: '#FFF4F4',
  },
  radio: {
    width: 23,
    height: 23,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },
  radioActive: {
    borderColor: '#B76E79',
  },
  radioDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: '#B76E79',
  },
  durationTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#333',
  },
  durationSubtitle: {
    fontSize: 12,
    color: '#999',
    marginTop: 3,
  },
  durationPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#555',
  },
  activeText: {
    color: '#B76E79',
  },
  totalBox: {
    backgroundColor: '#F1D7D9',
    borderRadius: 18,
    padding: 18,
    marginTop: 8,
    marginBottom: 18,
  },
  totalLabel: {
    fontSize: 12,
    color: '#806568',
  },
  totalName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#5E3439',
    marginTop: 4,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 13,
  },
  totalDuration: {
    color: '#6F5558',
    fontWeight: '600',
  },
  totalPrice: {
    color: '#5E3439',
    fontSize: 20,
    fontWeight: '900',
  },
  bookingSummary: {
    backgroundColor: '#F1D7D9',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },
  summaryIconBox: {
    width: 55,
    height: 55,
    borderRadius: 15,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  summaryIcon: {
    fontSize: 29,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#5E3439',
  },
  summaryInfo: {
    color: '#806568',
    marginTop: 4,
  },
  summaryPrice: {
    color: '#5E3439',
    fontWeight: '900',
    fontSize: 15,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#444',
    marginBottom: 7,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 16,
    fontSize: 15,
    color: '#333',
    borderWidth: 1,
    borderColor: '#EEE',
  },
  mainButton: {
    backgroundColor: '#B76E79',
    paddingVertical: 17,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 5,
  },
  mainButtonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '800',
  },
  bookingCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    elevation: 2,
  },
  bookingTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookingIconBox: {
    width: 55,
    height: 55,
    borderRadius: 15,
    backgroundColor: '#FFF0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },
  bookingIcon: {
    fontSize: 28,
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#333',
  },
  bookingStatus: {
    color: '#2D8A4B',
    fontSize: 13,
    marginTop: 4,
    fontWeight: '700',
  },
  line: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 17,
  },
  bookingInfo: {
    fontSize: 14,
    color: '#555',
    marginBottom: 11,
  },
  empty: {
    alignItems: 'center',
    marginTop: 70,
    padding: 30,
  },
  emptyIcon: {
    fontSize: 60,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#333',
    marginTop: 15,
  },
  emptyText: {
    color: '#888',
    marginTop: 6,
  },
  profile: {
    backgroundColor: '#FFF',
    borderRadius: 22,
    alignItems: 'center',
    padding: 25,
    marginTop: 5,
    marginBottom: 15,
    elevation: 2,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#F1D7D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 42,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#333',
    marginTop: 12,
  },
  profilePhone: {
    color: '#888',
    marginTop: 5,
  },
  profileBox: {
    backgroundColor: '#FFF',
    borderRadius: 17,
    padding: 16,
    marginBottom: 11,
    elevation: 1,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIconBox: {
    width: 45,
    height: 45,
    borderRadius: 13,
    backgroundColor: '#FFF0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileItemIcon: {
    fontSize: 22,
  },
  profileItemText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  profileValue: {
    color: '#888',
    fontSize: 13,
    marginTop: 5,
    paddingRight: 5,
  },
  editText: {
    color: '#B76E79',
    fontSize: 13,
    fontWeight: '800',
  },
  profileInput: {
    backgroundColor: '#FFF8F5',
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#E8B4B8',
    color: '#333',
  },
  navbar: {
    height: 73,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: 22,
  },
  navText: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
  },
});