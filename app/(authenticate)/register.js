import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
  Alert
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios"

const register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();
  const handleRegister = () => {
      console.log("hello")
      const user = {
          name:name,
          email:email,
          password:password,
          profileImage:image
      }

      axios.post("http://192.168.1.136:3000/register",user).then((response) => {
          console.log(response);
          Alert.alert("Registration successful","You have been registered successfully");
          setName("");
          setEmail("");
          setPassword("");
          setImage("");
      }).catch((error) => {
          Alert.alert("Registration failed","An error occurred while registering");
          console.log("registration failed",error)
      });
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
              marginTop: 10,
              color: "#fff",
            }}
          >
            Register your Account
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 3,
              backgroundColor: "#0B0C11",
              paddingVertical: 5,
              borderRadius: 30,
              marginTop: 30,
            }}
          >
            <Ionicons
              name="person"
              size={24}
              color="white"
              style={{ marginLeft: 8 }}
            />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                color: "#fff",
                marginVertical: 5,
                width: 300,
                fontSize: name ? 12 : 12,
              }}
              placeholder=""
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 3,
              backgroundColor: "#2F3347",
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
                color: "#1a1a26",
                marginVertical: 5,
                width: 300,
                fontSize: name ? 12 : 12,
              }}
              placeholder=""
            />
          </View>


            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 3,
                backgroundColor: "#0B0C11",
                paddingVertical: 5,
                borderRadius: 30,
                marginTop: 30,
                
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
                  color: "#FFF",
                  marginVertical: 5,
                width: 300,
                fontSize: name ? 12 : 12,
                }}
                placeholder=""
              />
            </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 3,
              backgroundColor: "#2F3347",
              paddingVertical: 5,
              borderRadius: 30,
              marginTop: 30,
            }}
          >
            <Entypo name="image" size={24} color="white" style={{marginLeft:8}} />
            <TextInput
              value={image}
              onChangeText={(text) => setImage(text)}
              style={{
                color: "#1a1a26",
                marginVertical: 5,
                width: 300,
                fontSize: name ? 12 : 12,
              }}
              placeholder=""
            />
          </View>

        

          <View
            style={{
              marginTop: 12,
              flexDirection: "row",
              color: "#007FFF",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{color: "#007FFF"}}>Keep me logged in</Text>

          
              
          </View>

          <View style={{ marginTop: 80 }} />

          <Pressable
         onPress={handleRegister}
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
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Register
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.replace("/login")}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", color: "blue", fontSize: 13 }}>
              Already have an account? Sign up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default register;

const styles = StyleSheet.create({})
