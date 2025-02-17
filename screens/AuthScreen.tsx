import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleRegister = async() => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError("Conta criada com sucesso!");
    } catch(err: any) {
      setError(err.message);
    }
  };
  const handleLogin = async() => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError("Login efetuado com sucesso!");
    } catch(err: any) {
      setError(err.message);
    }
  };
  return (
    <View style={styles.container} >
      <TextInput placeholder=" Email " onChangeText={setEmail}
        value={email} style={styles.input} />
      <TextInput placeholder=" Password " secureTextEntry
        onChangeText={setPassword} value={password} style={styles.
          input} />
      <Button title=" Registar " onPress={handleRegister} />
      <Button title=" Entrar " onPress={handleLogin} />
      { error ? <Text style={styles.error} >{error} </ Text> : null }
    </View>
  );
}
const styles = StyleSheet . create ({
  container : { flex : 1, justifyContent : 'center', alignItems : 'center' },
  input : { width : 300, borderWidth : 1, margin : 10, padding : 10 },
  error : { color : 'red', marginTop : 10 }
});