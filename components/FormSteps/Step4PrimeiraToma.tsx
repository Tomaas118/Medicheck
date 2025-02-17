import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Step4PrimeiraTomaProps {
  onNext: (times: string[]) => void;
  onBack: () => void;
  initialFirstDoseTime?: string;
  dosage: number;
}

const Step4PrimeiraToma: React.FC<Step4PrimeiraTomaProps> = ({
  onNext,
  onBack,
  initialFirstDoseTime = '',
  dosage,
}) => {
  const calculateInitialTimes = () => {
    const interval = 24 / dosage;
    const times = [];
    for (let i = 0; i < dosage; i++) {
      const hour = Math.floor(interval * i);
      times.push(new Date(`1970-01-01T${hour}:00:00+01:00`));
    }
    return times;
  };

  const [times, setTimes] = useState<Date[]>(calculateInitialTimes());
  const [showPicker, setShowPicker] = useState<number | null>(null);

  const handleNext = () => {
    const formattedTimes = times.map((time) => {
      const hours = time.getHours().toString().padStart(2, '0');
      const minutes = time.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    });

    onNext(formattedTimes);
  };

  const handleTimeChange = (index: number, event: any, date?: Date) => {
    if (date) {
      const newTimes = [...times];
      newTimes[index] = date; 
      setTimes(newTimes);
    }
    setShowPicker(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Horários das Tomas</Text>

      {times.map((time, index) => (
        <View key={index}>
          <TouchableOpacity
            style={styles.timePickerButton}
            onPress={() => setShowPicker(index)}
          >
            <Text style={styles.timePickerText}>
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </TouchableOpacity>

          {showPicker === index && (
            <DateTimePicker
              value={time}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, date) => handleTimeChange(index, event, date)}
            />
          )}
        </View>
      ))}

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
  timePickerButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  timePickerText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
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

export default Step4PrimeiraToma;