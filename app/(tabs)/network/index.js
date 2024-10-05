import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Pressable,
    FlatList,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { jwtDecode } from "jwt-decode";
  import axios from "axios";
  import { AntDesign } from "@expo/vector-icons";
  import { Entypo } from "@expo/vector-icons";
  import UserProfile from "../../../components/UserProfile";
 
  import { useRouter } from "expo-router";
  
  const index = () => {
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState();
    const [users, setUsers] = useState([]);
    const router = useRouter()
    const [connectionRequests, setConnectionRequests] = useState([]);
    useEffect(() => {
      const fetchUser = async () => {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        setUserId(userId);
      };
  
      fetchUser();
    }, []);
    useEffect(() => {
      if (userId) {
        fetchUserProfile();
      }
    }, [userId]);
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/profile/${userId}`
        );
        const userData = response.data.user;
        setUser(userData);
      } catch (error) {
        console.log("error fetching user profile", error);
      }
    };
    useEffect(() => {
      if (userId) {
        fetchUsers();
      }
    }, [userId]);
    const fetchUsers = async () => {
      axios
        .get(`http://localhost:3000/users/${userId}`)
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    useEffect(() => {
      if (userId) {
        fetchFriendRequests();
      }
    }, [userId]);
    const fetchFriendRequests = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/connection-request/${userId}`
        );
        if (response.status === 200) {
          const connectionRequestsData = response.data?.map((friendRequest) => ({
            _id: friendRequest._id,
            name: friendRequest.name,
            email: friendRequest.email,
            image: friendRequest.profileImage,
          }));
  
          setConnectionRequests(connectionRequestsData);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    console.log(connectionRequests);
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "#212332" }}>
        <Pressable
        onPress={() => router.push("/network/connections")}
          style={{
            marginTop: 10,
            marginHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text 
            style={{ textAlign: "center", color: "#fff", fontWeight: "600" }}
            
            >
            Manage My Network
          </Text>
          <AntDesign name="arrowright" size={22} color="#71747d" />
        </Pressable>
  
        <View
          style={{ borderColor: "#000", borderWidth: 2, marginVertical: 10 }}
        />
  
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text 
            style={{ textAlign: "center", color: "#fff", fontWeight: "600" }}
            
            >
            Invitations (0)</Text>
          <AntDesign name="arrowright" size={22} color="#71747d" />
        </View>
  
        <View
          style={{ borderColor: "#000", borderWidth: 2, marginVertical: 10 }}
        />
  
        <View>{/* show all of the request connections */}</View>
  
        <View style={{ marginHorizontal: 15 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text 
            style={{ textAlign: "center", color: "#fff", fontWeight: "600" }}
            
            >    
                Find digital work faster</Text>
            <Entypo name="cross" size={24} color="#71747d" />
          </View>
  
          <Text
          style={{ textAlign: "left", color: "#71747d", fontWeight: "600" }}
          >
            Use AiMA and find the best digital work opportunities. Instantly find out when there's new work and where to go!
          </Text>
          <View
            style={{
              backgroundColor: "#fff",
              width: 150,
              paddingHorizontal: 15,
              paddingVertical: 5,
              borderRadius: 25,
              marginTop: 8,
            }}
          >
            <Text
              style={{ textAlign: "center", color: "#000", fontWeight: "900" }}
            >
              Try AiMA for free
            </Text>
          </View>
        </View>
        <FlatList
          data={users}
          columnWrapperStyle={{justifyContent:"space-between"}}
          numColumns={2}
          keyExtractor={(item) => item._id}
          renderItem={({ item, key }) => (
            <UserProfile userId={userId} item={item} key={index} />
          )}
        />
        </ScrollView>
    )
  }
  
  export default index;
  
  const styles = StyleSheet.create({});
  