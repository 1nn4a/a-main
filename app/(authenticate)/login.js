import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  useEffect(() => {
    const checkLoginStatus = async () => {
        try{
            const token = await AsyncStorage.getItem("authToken");
            if(token){
                router.replace("/(tabs)/home")
            }
        } catch(error){
            console.log(error);
        }
    }

    checkLoginStatus();
  },[])
  const handleLogin = () => {
      const user = {
          email: email,
          password: password
      }

      axios.post("http://localhost:3000/login", user).then((response) => {
          console.log(response);
          const token = response.data.token;
          AsyncStorage.setItem("authToken",token);
          router.replace("/(tabs)/home")
      })
  }
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#212332", alignItems: "center" }}
    >
      <View>
        <Image
          style={{ width: 200, height: 100, resizeMode: "contain" }}
          source={{
            uri: "https://db3pap005files.storage.live.com/y4mKYxPxE760EQ1DNZj0CcM3SrniMFC8QPGeusQH5oBNw5si6_hyO-qxsQvIlrDilk1AzVTh941SDpW06wnqgHIYRqOoBn6l0EiFXEK7xIGvc0O62r8MGlGLUzcYGQABcFf13G2sPJUtTHiPk1SbrgfjnNJfMXDcDBxwkvzuxLRWn1OAj177DzWMONqBkxr1pDlbgJ87GA1z1MAt6LgJCWzLcMhtvTqVAwIuPASStd2T64?encodeFailures=1&width=1910&height=483",
          }}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "thin",
              marginTop: 5,
              color: "#fff",
            }}
          >
            Log in to your Account
          </Text>
        </View>

        <View style={{ marginTop: 70 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#0B0C11",
              paddingVertical: 5,
              borderRadius: 30,
              marginTop: 30,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="white"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "#fff",
                marginVertical: 5,
                width: 300,
                fontSize: email ? 12 : 12,
              }}
              placeholder=""
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#2F3347",
                paddingVertical: 5,
                borderRadius: 30,
                marginTop: 10,
              }}
            >
              <AntDesign
                style={{ marginLeft: 8 }}
                name="lock1"
                size={24}
                color="white"
              />
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                style={{
                  color: "#1a1a26",
                  marginVertical: 5,
                  width: 300,
                  fontSize: password ? 12 : 12,
                }}
                placeholder=""
              />
            </View>
          </View>

          <View
            style={{
              marginTop: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text>Keep me logged in</Text>

            <Text style={{ color: "blue", fontWeight: "200" }}>
              Forgot Password
            </Text>
          </View>

          <View style={{ marginTop: 80 }} />

          <Pressable
          onPress={handleLogin}
            style={{
              width: 200,
              backgroundColor: "navy",
              borderRadius: 15,
              marginLeft: "auto",
              marginRight: "auto",
              padding: 15,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Login
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.replace("/register")}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", color: "blue", fontSize: 14 }}>
              Don't have an account? Sign Up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({});
