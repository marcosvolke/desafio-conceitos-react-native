import React, { useState, useEffect } from "react";
import api from './services/api';

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, [repositories]);

  async function handleLikeRepository(id) {
    // console.log(id);
    const response = await api.post(`repositories/${id}/like`);

    const index = repositories.findIndex(item => item.id === id);
    const allRepo = repositories;
    allRepo[index].likes = allRepo[index].likes + 1;

    setRepositories(allRepo);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>

        {repositories.map(repo => (
          // <Text key={repo.id} style={styles.repository}>{repo.title}</Text>
          <View key={repo.id} style={styles.repositoryContainer}>
            <Text style={styles.repository}>{repo.title}</Text>

            <View style={styles.techsContainer}>
              
              {repo.techs ? repo.techs.map(tech => (
                <View key={tech}>
                  <Text style={styles.tech}>
                    {tech}
                  </Text>
                </View>
              )) : null}
              
            </View>

            <View style={styles.likesContainer}>
              <Text
                style={styles.likeText}
                // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                testID={`repository-likes-1`}
              >
                {`${repo.likes} curtidas`}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleLikeRepository(1)}
              // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
              testID={`like-button-1`}
            >
              <Text style={styles.buttonText} onPress={() => {handleLikeRepository(repo.id)}}>Curtir</Text>
            </TouchableOpacity>
          </View>
        ))}

        
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
