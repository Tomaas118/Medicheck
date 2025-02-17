import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

interface Step3DosesPorDiaProps {
  onNext: (dosage: string) => void;
  onBack: () => void;
  initialDosage?: string; 
}

const Step3DosesPorDia: React.FC<Step3DosesPorDiaProps> = ({ onNext, onBack, initialDosage = '' }) => {
  const [dosage, setDosage] = useState(initialDosage);

  const handleNext = () => {
    if (dosage.trim() === '' || isNaN(Number(dosage))) {
      Alert.alert('Erro', 'Por favor, insira um número válido de tomas por dia.');
      return;
    }else if(parseInt(dosage.trim()) > 6 ){
      Alert.alert('Erro', 'Por favor, o numero maximo de tomas por dia é 6.');
      return;
    }
    onNext(dosage);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nº de Tomas por Dia</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o número de tomas"
        value={dosage}
        onChangeText={(text) => {
          // Permite apenas números
          if (/^\d*$/.test(text)) {
            setDosage(text);
          }
        }}
        keyboardType="numeric"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.nextButton, dosage.trim() === '' && styles.disabledButton]}
          onPress={handleNext}
          disabled={dosage.trim() === ''}
        >
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
    backgroundColor: '#fff',
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
  disabledButton: {
    backgroundColor: '#a6a6a6', 
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Step3DosesPorDia;