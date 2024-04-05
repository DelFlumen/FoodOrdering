import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Button from "@/components/Button";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const validateInput = () => {
    let isError;
    let newErrors: string[] = [...errors];
    if (!name) {
      newErrors.push("Name is required");
      isError = true;
    } else {
      newErrors = newErrors.filter((err) => err !== "Name is required");
    }
    if (!price) {
      newErrors.push("Price is required");
      isError = true;
    } else if (isNaN(parseFloat(price))) {
      newErrors = newErrors.filter((err) => err !== "Price is required");
      newErrors.push("Price is not a number");
      isError = true;
    } else {
      newErrors = newErrors.filter((err) => !err.includes("Price"));
    }

    setErrors([...new Set([...newErrors])]);

    return !isError;
  };

  const resetFields = () => {
    setName("");
    setPrice("");
  };

  const handleCreate = () => {
    if (!validateInput()) return;
    console.warn("creating product");
    resetFields();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />
      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
      />
      {errors.length
        ? errors.map((err) => (
            <Text key={err} style={{ color: "red" }}>
              {err}
            </Text>
          ))
        : null}
      <Button onPress={handleCreate} text="Create" />
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
