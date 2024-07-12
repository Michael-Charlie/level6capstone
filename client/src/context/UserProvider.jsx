import React, { useState } from "react";
import axios from "axios";

export const UserContext = React.createContext();

const userAxios = axios.create();

userAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function UserProvider(props) {
  const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    pets: [],
    errMsg: "",
  };

  
  const [userState, setUserState] = useState(initState);
  

  const [allComments, setAllComments] = useState([]);

  const [allPets, setAllPets] = useState([]);

  function signup(credentials) {
    axios
      .post("/auth/signup", credentials)
      .then((res) => {
        const { user, token } = res.data;
        console.log(res.data)
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUserState((prevUserState) => ({
          ...prevUserState,
          user,
          token,
        }));
      })
      .catch((err) => handleAuthErr(err.response.data.errMsg));
    }
    console.log(userState);

  function login(credentials) {
    axios
      .post("/auth/login", credentials)
      .then((res) => {
        const { user, token } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUserState((prevUserState) => ({
          ...prevUserState,
          user,
          token,
        }));
      })
      .catch((err) => handleAuthErr(err.response.data.errMsg));
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserState({
      user: {},
      token: "",
      pets: [],
    });
  }

  function handleAuthErr(errMsg) {
    setUserState((prevState) => ({
      ...prevState,
      errMsg,
    }));
  }

  function resetAuthErr() {
    setUserState((prevState) => ({
      ...prevState,
      errMsg: "",
    }));
  }

  function getAllPets() {
    userAxios
      .get("/api/pets")
      .then((res) => setAllPets(res.data))
      .catch((err) => console.log(err));
  }

  function getUserPets() {
    userAxios
      .get("/api/pets/user")
      .then((res) => {
        setUserState((prevUserState) => ({
          ...prevUserState,
          pets: res.data,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }
  function addPet(newPet) {
    userAxios.post("/api/pets", newPet).then((res) => {
      setUserState((prevState) => ({
        ...prevState,
        pets: [...prevState.pets, res.data],
      }));
      setAllPets((prevPets) => [...prevPets, res.data]);
    });
  }

  function getAllComments() {
    userAxios
      .get("/api/comment")
      .then((res) => setAllComments(res.data))
      .catch((err) => console.log(err));
  }

  function addComment(input, petId) {
    userAxios
      .post(`/api/comment/${petId}`, input)
      .then((res) =>
        setAllComments((prevComments) => [...prevComments, res.data])
      )
      .catch((err) => console.log(err));
  }

  function upVotePet(petId) {
    userAxios
      .put(`/api/pets/upVote/${petId}`)
      .then((res) => {
        setAllPets((prevPets) =>
          prevPets.map((pet) => (petId !== pet._id ? pet : res.data))
        );
        setUserState((prevUserState) => ({
          ...prevUserState,
          pets: prevUserState.pets.map((pet) =>
            petId !== pet._id ? pet : res.data
          ),
        }));
      })
      .catch((err) => console.log(err));
  }

  function downVotePet(petId) {
    userAxios
      .put(`/api/pets/downVote/${petId}`)
      .then((res) => {
        setAllPets((prevPets) =>
          prevPets.map((pet) => (petId !== pet._id ? pet : res.data))
        );
        setUserState((prevUserState) => ({
          ...prevUserState,
          pets: prevUserState.pets.map((pet) =>
            petId !== pet._id ? pet : res.data
          ),
        }));
      })
      .catch((err) => console.log(err));
  }

  function deletePet(petId) {
    userAxios
      .delete(`/api/pets/${petId}`)
      .then((res) => {
        setAllPets((prevPets) => prevPets.filter((pet) => pet._id !== petId));
        setUserState((prevUserState) => ({
          ...prevUserState,
          pets: prevUserState.pets.filter((pet) => pet._id !== petId),
        }));
      })
      .catch((err) => console.log(err));
  }

  function editPet(updates, petId) {
    userAxios.put(`/api/pets/${petId}`, updates).then((res) => {
      setAllPets((prevPets) =>
        prevPets.map((pet) => (pet._id !== petId ? pet : res.data))
      );
      setUserState((prevUserState) => ({
        ...prevUserState,
        pets: prevUserState.pets.map((pet) =>
          pet._id !== petId ? pet : res.data
        )
      }));
    })
    .catch((err) => console.log(err))
  }

  return (
    <UserContext.Provider
      value={{
        ...userState,
        signup,
        login,
        logout,
        addPet,
        resetAuthErr,
        getAllComments,
        getUserPets,
        addComment,
        allComments,
        upVotePet,
        downVotePet,
        getAllPets,
        allPets,
        deletePet,
        handleEdit: editPet,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
