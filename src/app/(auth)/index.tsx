import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import Button from "@/components/Button";
import Colors from "@/constants/Colors";
import { supabase } from "@/lib/supabase";

const authScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useLocalSearchParams();

  const validateInput = () => {
    let isError;
    let newErrors: string[] = [];
    if (!email) {
      newErrors.push("Email is required");
      isError = true;
    }
    if (!password) {
      newErrors.push("Password is required");
      isError = true;
    }

    setErrors([...newErrors]);

    return !isError;
  };

  const resetFields = () => {
    setEmail("");
    setPassword("");
  };

  const onSubmit = () => {
    isSignUp ? signUpWithEmail() : signIn();
  };

  const signUpWithEmail = async () => {
    if (!validateInput()) return;
    setIsLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setIsLoading(false);

    resetFields();
  };

  const signIn = () => {
    if (!validateInput()) return;
    console.warn("updating product");
    resetFields();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: isSignUp ? "Sign Up" : "Sign In",
          headerTitleAlign: "center",
        }}
      />
      <Text style={styles.label}>email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="email"
        style={styles.input}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      {errors.length
        ? errors.map((err) => (
            <Text key={err} style={{ color: "red" }}>
              {err}
            </Text>
          ))
        : null}
      <Button
        onPress={onSubmit}
        disabled={isLoading}
        text={isSignUp ? "Create Account" : "Sign In"}
        style={{ backgroundColor: isLoading ? "grey" : Colors.light.tint }}
      />
      <Text onPress={() => setIsSignUp(!isSignUp)} style={styles.textBtn}>
        {isSignUp ? "Sign In" : "Create Account"}
      </Text>
    </View>
  );
};

export default authScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  textBtn: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
  errorText: {
    color: "red",
  },
});
