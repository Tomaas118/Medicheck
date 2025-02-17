import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const FloatingButton: React.FC = () => {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.floatingButton} onPress={() => router.push('/Formulario')}>
      <Ionicons name="add" size={32} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#0047AB',
    padding: 15,
    borderRadius: 50,
  },
});

export default FloatingButton;