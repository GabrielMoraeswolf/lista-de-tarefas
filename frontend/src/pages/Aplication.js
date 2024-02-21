import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import axios from 'axios';
import './styles.css';
import Footer from './footer/Footer';

const Aplication = () => {
  const [tasks, setTasks] = useState([]);
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [filterStatus, setFilterStatus] = useState(null);

  useEffect(() => {
    if (showAllTasks) {
      fetchTasks();
    }
  }, [showAllTasks]);

  const fetchTasks = async () => {
    try {
      let url = 'http://localhost:3001/tarefas';
      if (filterStatus) {
        url = `http://localhost:3001/tarefas/status/${filterStatus}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Erro ao obter tarefas:', error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, [filterStatus]); 

  const addTask = async (taskName) => {
    try {
      const response = await fetch('http://localhost:3001/tarefas', {  
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

  const editTask = async (taskId, updatedTaskName, updatedStatus) => {
    try {
      const response = await axios.put(`http://localhost:3001/tarefas/${taskId}`, {
        descricao: updatedTaskName,
        status: updatedStatus,
      });
      setTasks(tasks.map((task) => (task.id === taskId ? response.data : task)));
    } catch (error) {
      console.error('Erro ao editar tarefa:', error);
    }
  };

  const removeTask = async (taskId) => {
    try {
      await fetch(`http://localhost:3001/tarefas/${taskId}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Erro ao remover tarefa:', error);
    }
  };
  const showAllTasksHandler = () => {
    setShowAllTasks(true); // Ativa a exibição de todas as tarefas
  };
  const filterStatusHandler = (selectedStatus) => {
    setFilterStatus(selectedStatus);
    setShowAllTasks(false);
  };
  const clearFilterHandler = () => {
    filterStatusHandler(null);
    showAllTasksHandler();
  };

  return (
    <div className="container">
        <div className="containerBox">
            <h2 className="titule">Lista de Tarefas</h2>
            <TaskForm addTask={addTask} />
            <button onClick={showAllTasksHandler} className='buttonList'>Lista de Tarefas</button>
            <div>
                <h4>Filtrar Tarefas</h4>
                <div>
                    <label >
                        <input
                            type="radio"
                            value="Pendente"
                            checked={filterStatus === 'Pendente'}
                            onChange={() => filterStatusHandler('Pendente')}                    
                        /> Pendente
                    </label>

                    <label>
                        <input
                            type="radio"
                            value="Finalizada"
                            checked={filterStatus === 'Finalizada'}
                            onChange={() => filterStatusHandler('Finalizada')}
                        /> Finalizada
                    </label>

                    <label>
                     <input
                        type="radio"
                        value="Cancelada"
                        checked={filterStatus === 'Cancelada'}
                        onChange={() => filterStatusHandler('Cancelada')}
                    /> Cancelada
                    </label>
                </div>
                <button onClick={showAllTasksHandler} className='buttonFilter'>Filtrar Tarefas</button>
                <button  onClick={clearFilterHandler} className='buttonFilterClean'> Limpar Filtro</button>
            </div>
            {showAllTasks && <TaskList tasks={tasks} editTask={editTask} removeTask={removeTask} />}
        </div>
        <div className="footer">
            <Footer />
        </div> 
    </div>
  );
};

export default Aplication;