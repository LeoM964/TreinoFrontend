import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import RootLayout from './_layout';

const Home: React.FC = () => {
  //dados do aluno
  const [name, setName] = useState(''); // Nome do aluno
  const [gender, setGender] = useState(''); // Sexo (Masculino/Feminino)
  const [age, setAge] = useState(''); // Idade
  const [height, setHeight] = useState(''); // Altura
  const [weight, setWeight] = useState(''); // Peso
  const [objective, setObjective] = useState(''); // Objetivo do treino
  const [level, setLevel] = useState(''); // Nível de atividade física
  const [respostaTreino, setRespostaTreino] = useState<any>(null); // Resposta do treino gerado

  // Função para envio dos dados e geração do treino
  const handleGerarTreino = async () => {
    // Monta os dados do aluno a serem enviados para o backend
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
      //requisição POST para o backend na rota /create
      const response = await fetch('http://192.XXX.XXX.XXX:3333/create', { //Coloque o seu IPv4 local
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
        },
        body: JSON.stringify(dadosAluno), // Converte os dados do aluno para JSON
      });

      // Verifica se a resposta não foi bem-sucedida
      if (!response.ok) {
        throw new Error('Erro ao gerar treino'); // Lança um erro em caso de resposta inválida
      }

      //recebe a resposta do backend
      const resposta = await response.json();
      setRespostaTreino(resposta.data || 'Treino não gerado'); // Atualiza a resposta ou exibe mensagem padrão
    } catch (error) {
      console.error('Erro:', error); // Loga o erro no console para depuração
      setRespostaTreino('Erro ao gerar o treino. Tente novamente mais tarde.'); // Mensagem de erro para o usuario
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Título do formulário */}
      <Text style={styles.title}>Cadastro de Aluno</Text>

      {/* Campo para nome */}
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      {/* Campo para sexo */}
      <TextInput
        placeholder="Sexo (Masculino/Feminino)"
        value={gender}
        onChangeText={setGender}
        style={styles.input}
      />

      {/* Campo para idade */}
      <TextInput
        placeholder="Idade"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric" 
        style={styles.input}
      />

      {/* Campo para altura */}
      <TextInput
        placeholder="Altura (m)"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric" 
        style={styles.input}
      />

      {/* Campo para peso */}
      <TextInput
        placeholder="Peso (kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric" 
        style={styles.input}
      />

      {/* Campo para objetivo */}
      <TextInput
        placeholder="Objetivo (Ex: emagrecer)"
        value={objective}
        onChangeText={setObjective}
        style={styles.input}
      />

      {/* Campo para nível de atividade */}
      <TextInput
        placeholder="Nível de Atividade (Ex: sedentário)"
        value={level}
        onChangeText={setLevel}
        style={styles.input}
      />

      {/* Botão para gerar o treino */}
      <Button title="Gerar Treino" onPress={handleGerarTreino} />

      {/* Exibição do treino gerado ou mensagem de erro */}
      {respostaTreino && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Treino Gerado:</Text>
          {typeof respostaTreino === 'string' ? (
            // Exibe a mensagem diretamente se for uma string
            <Text>{respostaTreino}</Text>
          ) : (
            // Exibe os detalhes do treino se for um objeto.
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
  // Estilo do container principal
  container: {
    padding: 20,
  },
  // Estilo do título
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  // Estilo dos campos de entrada de texto
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  // Estilo do container de resultados
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 5,
  },
  // Estilo do título dos resultados
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Home;
