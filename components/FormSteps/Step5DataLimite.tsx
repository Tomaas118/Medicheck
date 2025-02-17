import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Step5DataLimiteProps {
  onNext: (limitDate: string) => void;
  onBack: () => void;
  initialLimitDate?: string;
}

const Step5DataLimite: React.FC<Step5DataLimiteProps> = ({
  onNext,
  onBack,
  initialLimitDate = '',
}) => {
  const initialDate = initialLimitDate
    ? new Date(initialLimitDate)
    : new Date();

  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [showPicker, setShowPicker] = useState(false);

  const handleNext = () => {
    const today = new Date();
    const minDate = new Date();
    minDate.setDate(today.getDate() + 3);

    if (selectedDate <= minDate) {
      Alert.alert(
        'Erro',
        'A data limite deve ser no futuro e ter pelo menos 3 dias de duração.',
      );
      return;
    }

    const year = selectedDate.getFullYear();
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = selectedDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    onNext(formattedDate);
  };

  const handleDateChange = (event: any, date?: Date) => {
    if (date) {
      setSelectedDate(date);
    }
    setShowPicker(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Data Limite da Medicação</Text>

      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowPicker(true)}
      >
        <Text style={styles.datePickerText}>
          {selectedDate.toLocaleDateString('pt-BR')}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          minimumDate={new Date()}
          onChange={handleDateChange}
        />
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.buttonText}>Próximo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  datePickerText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  nextButton: {
    backgroundColor: '#0047AB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Step5DataLimite;