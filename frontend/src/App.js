import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (taskName) => {
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        name: taskName,
        status: 'Pendente', // Pode adicionar mais estados se necessário
      },
    ]);
  };

  const editTask = (taskId, updatedTaskName) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, name: updatedTaskName } : task
      )
    );
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="App">
      <h1>Lista de Tarefas</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} editTask={editTask} removeTask={removeTask} />
    </div>
  );
};

export default App;