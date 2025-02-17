import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

interface Step1NomeProps {
  onNext: (name: string) => void;
  onBack: () => void;
  initialName?: string;
}

const Step1Nome: React.FC<Step1NomeProps> = ({ onNext, onBack, initialName = '' }) => {
  const [name, setName] = useState(initialName);

  const handleNext = () => {
    if (name.trim() === '') {
      alert('Por favor, preencha o nome do medicamento.');
      return;
    }
    onNext(name);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Medicamento</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do medicamento"
        value={name}
        onChangeText={setName}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.nextButton, name.trim() === '' && styles.disabledButton]}
          onPress={handleNext}
          disabled={name.trim() === ''}
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

export default Step1Nome;