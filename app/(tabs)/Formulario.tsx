import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Step1Nome from '@/components/FormSteps/Step1Nome';
import Step2Quantidade from '@/components/FormSteps/Step2Quantidade';
import Step3DosesPorDia from '@/components/FormSteps/Step3DosesPorDia';
import Step4PrimeiraToma from '@/components/FormSteps/Step4PrimeiraToma';
import Step5DataLimite from '@/components/FormSteps/Step5DataLimite';
import Step6Descricao from '@/components/FormSteps/Step6Descricao';
import Header from '@/components/Header';
import { useRouter } from 'expo-router';

const Formulario: React.FC = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    unit: 'comprimidos',
    dosage: '',
    firstDoseTime: '',
    limitDate: '',
    description: '',
  });

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleNextStep = (step: number, data: any) => {
    setFormData({ ...formData, ...data }); 
    setCurrentStep(step + 1);
  };

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      setFormData({
        name: '',
        quantity: '',
        unit: 'comprimidos',
        dosage: '',
        firstDoseTime: '',
        limitDate: '',
        description: '',
      });
      
      router.push('/home');
    }
  };

  const handleFinish = () => {
    console.log('Dados do formulário:', formData);

    setFormData({
      name: '',
      quantity: '',
      unit: 'comprimidos',
      dosage: '',
      firstDoseTime: '',
      limitDate: '',
      description: '',
    });

    setCurrentStep(1);
    router.push('/home');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="MediCheck" />
      <View style={styles.view}>
        {currentStep === 1 && (
          <Step1Nome
            onNext={(name) => handleNextStep(1, { name })}
            onBack={handleBackStep}
            initialName={formData.name}
          />
        )}
        {currentStep === 2 && (
          <Step2Quantidade
            onNext={(quantity, unit) => handleNextStep(2, { quantity, unit })}
            onBack={handleBackStep}
            initialQuantity={formData.quantity}
            initialUnit={formData.unit} 
          />
        )}
        {currentStep === 3 && (
          <Step3DosesPorDia
            onNext={(dosage) => handleNextStep(3, { dosage })}
            onBack={handleBackStep}
            initialDosage={formData.dosage}
          />
        )}
        {currentStep === 4 && (
          <Step4PrimeiraToma
            onNext={(times) => handleNextStep(4, { times })}
            onBack={handleBackStep}
            initialFirstDoseTime={formData.firstDoseTime}
            dosage={Number(formData.dosage)}
          />
        )}
        {currentStep === 5 && (
          <Step5DataLimite
            onNext={(limitDate) => handleNextStep(5, { limitDate })}
            onBack={handleBackStep}
            initialLimitDate={formData.limitDate}
          />
        )}
        {currentStep === 6 && (
          <Step6Descricao
            onFinish={handleFinish}
            onBack={handleBackStep}
            formData={formData}
            initialDescription={formData.description}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  view: {
    flex: 1,
  },
});

export default Formulario;