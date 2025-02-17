import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface DateSelectorProps {
  onDateSelect: (date: string) => void;
  selectedDate: string;
}

const DateSelector: React.FC<DateSelectorProps> = ({ onDateSelect, selectedDate }) => {
  const getNextDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date.toISOString().split('T')[0]);
    }
    return days;
  };

  const days = getNextDays();

  return (
    <View style={styles.container}>
      {days.map((day, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.dayButton,
            day === selectedDate && styles.selectedDayButton,
          ]}
          onPress={() => onDateSelect(day)}
        >
          <Text style={styles.dayText}>{new Date(day).getDate()}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#002F6C',
    paddingVertical: 10,
  },
  dayButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  selectedDayButton: {
    backgroundColor: '#0047AB',
  },
  dayText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DateSelector;