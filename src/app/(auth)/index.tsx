import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import Button from "@/components/Button";
import Colors from "@/constants/Colors";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [isSignUp, setIsSignUp] = useState(false);
  const { id } = useLocalSearchParams();

  const validateInput = () => {
    let isError;
    let newErrors: string[] = [];
    if (!name) {
      newErrors.push("Name is required");
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
    setName("");
    setPassword("");
  };

  const onSubmit = () => {
    isSignUp ? createAccount() : signIn();
  };

  const createAccount = () => {
    if (!validateInput()) return;
    console.warn("creating product");
    resetFields();
  };

  const signIn = () => {
    if (!validateInput()) return;
    console.warn("updating product");
    resetFields();
  };

  const onDelete = () => {
    console.warn("Delete");
  };

  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this product?", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: isSignUp ? "Sign Up" : "Sign In",
          headerTitleAlign: "center",
        }}
      />
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry={true}
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
        text={isSignUp ? "Create Account" : "Sign In"}
      />
      <Text onPress={() => setIsSignUp(!isSignUp)} style={styles.textBtn}>
        {isSignUp ? "Sign In" : "Create Account"}
      </Text>
    </View>
  );
};

export default CreateProductScreen;

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
