import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface Step2QuantidadeProps {
  onNext: (quantity: string, unit: string) => void;
  onBack: () => void;
  initialQuantity?: string;
  initialUnit?: string;
}

const Step2Quantidade: React.FC<Step2QuantidadeProps> = ({
  onNext,
  onBack,
  initialQuantity = '',
  initialUnit = 'comprimidos',
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [unit, setUnit] = useState(initialUnit);

  const handleNext = () => {
    if (quantity.trim() === '' || isNaN(Number(quantity))) {
      Alert.alert('Erro', 'Por favor, insira uma quantidade válida (apenas números).');
      return;
    }
    onNext(quantity, unit);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Quantidade</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Digite a quantidade"
          value={quantity}
          onChangeText={(text) => {
            if (/^\d*$/.test(text)) {
              setQuantity(text);
            }
          }}
          keyboardType="numeric"
        />
        <View style={[styles.pickerContainer, { flex: 1 }]}>
          <Picker
            selectedValue={unit}
            onValueChange={(itemValue) => setUnit(itemValue)}
          >
            <Picker.Item label="Comprimidos" value="comprimidos" />
            <Picker.Item label="ml" value="ml" />
          </Picker>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.nextButton, quantity.trim() === '' && styles.disabledButton]}
          onPress={handleNext}
          disabled={quantity.trim() === ''}
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
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

export default Step2Quantidade;