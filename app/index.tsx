import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import RootLayout from './_layout';

const Home: React.FC = () => {
  // Nomes das variáveis para corresponder aos nomes esperados no treino-back
  const [name, setName] = useState(''); // Nome do aluno
  const [gender, setGender] = useState(''); // Sexo (Masculino/Feminino)
  const [age, setAge] = useState(''); // Idade
  const [height, setHeight] = useState(''); // Altura
  const [weight, setWeight] = useState(''); // Peso
  const [objective, setObjective] = useState(''); // Objetivo
  const [level, setLevel] = useState(''); // Nível de Atividade
  const [respostaTreino, setRespostaTreino] = useState<any>(null); // Resposta do treino (agora com tipo 'any')

  const handleGerarTreino = async () => {
    // Dados do aluno a serem enviados para o backend
    const dadosAluno = {
      name,
      gender,
      age,
      height,
      weight,
      objective,
      level,
    };

    try {
      // Requisição para o backend
      const response = await fetch('http://192.168.100.106:3333/create', { // Substitua com o IP correto
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosAluno), // Envia os dados como JSON
      });

      if (!response.ok) {
        throw new Error('Erro ao gerar treino');
      }

      // Receber a resposta do treino gerado do backend
      const resposta = await response.json();
      setRespostaTreino(resposta.data || 'Treino não gerado'); // Agora acessando a resposta corretamente
    } catch (error) {
      console.error('Erro:', error);
      setRespostaTreino('Erro ao gerar o treino. Tente novamente mais tarde.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Aluno</Text>
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Sexo (Masculino/Feminino)"
        value={gender}
        onChangeText={setGender}
        style={styles.input}
      />
      <TextInput
        placeholder="Idade"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Altura (m)"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Peso (kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Objetivo (Ex: emagrecer)"
        value={objective}
        onChangeText={setObjective}
        style={styles.input}
      />
      <TextInput
        placeholder="Nível de Atividade (Ex: sedentário)"
        value={level}
        onChangeText={setLevel}
        style={styles.input}
      />
      <Button title="Gerar Treino" onPress={handleGerarTreino} />
      {respostaTreino && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Treino Gerado:</Text>
          {typeof respostaTreino === 'string' ? (
            <Text>{respostaTreino}</Text>
          ) : (
            <View>
              <Text>Nome: {respostaTreino.nome}</Text>
              <Text>Idade: {respostaTreino.idade} anos</Text>
              <Text>Peso: {respostaTreino.peso} kg</Text>
              <Text>Altura: {respostaTreino.altura} m</Text>
              <Text>Objetivo: {respostaTreino.objetivo}</Text>
              <Text>Exercícios:</Text>
              {respostaTreino.exercicios.map((exercicio: any, index: number) => (
                <View key={index}>
                  <Text>{exercicio.nome}</Text>
                  <Text>Séries: {exercicio.series}</Text>
                  <Text>Repetições: {exercicio.repeticoes}</Text>
                  <Text>Descanso: {exercicio.descanso}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 5,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Home;
