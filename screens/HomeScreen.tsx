import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import DateSelector from '../components/DateSelector';
import MedicationList from '../components/MedicationList';
import FloatingButton from '../components/FloatingButton';

const medications = [
  { id: '1', time: '08:00' },
  { id: '2', time: '20:00' },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    console.log('Data selecionada:', date);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="MediCheck" />
      <DateSelector onDateSelect={handleDateSelect} selectedDate={selectedDate} />
      <MedicationList medications={medications} />
      <FloatingButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});