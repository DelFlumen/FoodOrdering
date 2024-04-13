import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import Button from "@/components/Button";
import { defaultPizzaIMG } from "@/constants/Images";
import Colors from "@/constants/Colors";
import { useInsertProduct, useProduct, useUpdateProduct } from "@/api/products";

const handleCreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const { id: idString } = useLocalSearchParams();
  const id = +(typeof idString === "string" ? idString : idString?.[0]);
  const router = useRouter();
  const isUpdating = !!id;

  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { data: productToUpdate, error, isLoading } = useProduct(id);

  useEffect(() => {
    if (productToUpdate) {
      setName(productToUpdate.name);
      setPrice(productToUpdate.price.toString());
      setImage(productToUpdate.image);
    }
  }, [productToUpdate]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch a product</Text>;
  }

  const validateInput = () => {
    let isError;
    let newErrors: string[] = [];
    if (!name) {
      newErrors.push("Name is required");
      isError = true;
    }
    if (!price) {
      newErrors.push("Price is required");
      isError = true;
    } else if (isNaN(parseFloat(price))) {
      newErrors.push("Price is not a number");
      isError = true;
    }

    setErrors([...newErrors]);

    return !isError;
  };

  const resetFields = () => {
    setName("");
    setPrice("");
  };

  const onSubmit = () => {
    isUpdating ? handleUpdateProduct() : handleCreateProduct();
  };

  const handleCreateProduct = () => {
    if (!validateInput()) return;
    insertProduct(
      { name, price: parseFloat(price), image },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };

  const handleUpdateProduct = () => {
    if (!validateInput()) return;
    updateProduct(
      { id, name, image, price: parseFloat(price) },
      {
        onSuccess: () => {
          router.back();
        },
      }
    );
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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: (isUpdating ? "Update " : "Create ") + "Product",
          headerTitleAlign: "center",
        }}
      />
      <Image source={{ uri: image || defaultPizzaIMG }} style={styles.image} />
      <Text onPress={pickImage} style={styles.textBtn}>
        Select image
      </Text>

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
      <Button onPress={onSubmit} text={isUpdating ? "Update" : "Create"} />
      {isUpdating && (
        <Text onPress={confirmDelete} style={styles.deleteBtn}>
          Delete
        </Text>
      )}
    </View>
  );
};

export default handleCreateProductScreen;

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
  deleteBtn: {
    alignSelf: "center",
    fontWeight: "bold",
    color: "red",
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
