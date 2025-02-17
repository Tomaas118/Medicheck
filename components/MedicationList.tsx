import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

interface Medication {
  id: string;
  time: string;
}

interface MedicationListProps {
  medications: Medication[];
}

const MedicationList: React.FC<MedicationListProps> = ({ medications }) => {
  return (
    <FlatList
      data={medications}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.medicationContainer}>
          <Text style={styles.time}>{item.time}</Text>
          <View style={styles.medicationCard}>
            <Text style={styles.medicationText}>Nome do medicamento</Text>
            <Text style={styles.quantity}>Quantidade</Text>
            <Text style={styles.status}>
              Status (<Text style={{ color: 'blue' }}>a tomar</Text>/
              <Text style={{ color: 'red' }}>perdido</Text>/
              <Text style={{ color: 'green' }}>concluído</Text>)
            </Text>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  medicationContainer: {
    padding: 15,
  },
  time: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  medicationCard: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    marginTop: 5,
  },
  medicationText: {
    fontSize: 16,
    color: 'white',
  },
  quantity: {
    color: 'white',
    marginTop: 5,
  },
  status: {
    marginTop: 5,
    color: 'white',
  },
});

export default MedicationList;