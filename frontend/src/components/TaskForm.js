import React, { useState } from 'react';
import './stylesComponent/TaskForm.css';

const TaskForm = ({ addTask }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(taskName);
    setTaskName('');
  };

  return (
    <form onSubmit={handleSubmit} >
      <input
        type="text"
        placeholder="Digite a tarefa..."
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        className='input'
      />
      <button type="submit" className='label' >Adicionar Tarefa</button>
    </form>
  );
};

export default TaskForm;
