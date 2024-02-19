import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [showAllTasks, setShowAllTasks] = useState(false);

  useEffect(() => {
    if (showAllTasks) {
      fetchTasks();
    }
  }, [showAllTasks]);

  // Função para buscar tarefas do backend e atualizar o estado
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/tarefas'); 
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Erro ao obter tarefas:', error);
    }
  };

  // Chamada inicial para buscar tarefas quando o componente montar
  useEffect(() => {
    fetchTasks();
  }, []); // O array vazio assegura que a função só será chamada uma vez

  const addTask = async (taskName) => {
    try {
      const response = await fetch('http://localhost:3000/tarefas', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ descricao: taskName, status: 'Pendente' }),
      });
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  const editTask = async (taskId, updatedTaskName) => {
    try {
      const response = await axios.put(`http://localhost:3000/tarefas/${taskId}`, {
        descricao: updatedTaskName,
        // status: mantenha o status existente ou modifique conforme necessário
      });
      setTasks(tasks.map((task) => (task.id === taskId ? response.data : task)));
    } catch (error) {
      console.error('Erro ao editar tarefa:', error);
    }
  };

  const removeTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/tarefas/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Erro ao remover tarefa:', error);
    }
  };
  const showAllTasksHandler = () => {
    setShowAllTasks(true); // Ativa a exibição de todas as tarefas
  };
  return (
    <div className="App">
      <h1>Lista de Tarefas</h1>
      <TaskForm addTask={addTask} />
      <button onClick={showAllTasksHandler}>Lista de Tarefas</button>
      {showAllTasks && <TaskList tasks={tasks} editTask={editTask} removeTask={removeTask} />}
    </div>
  );
};

export default App;