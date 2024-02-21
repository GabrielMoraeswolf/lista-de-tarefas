import React, { useState } from 'react';
import './stylesComponent/TaskItem.css';

const TaskItem = ({ task, editTask, removeTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTaskName, setUpdatedTaskName] = useState(task.descricao);
  const [updatedStatus, setUpdatedStatus] = useState(task.status);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTask(task.id, updatedTaskName, updatedStatus);
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
         <>
         <input
           type="text"
           value={updatedTaskName}
           onChange={(e) => setUpdatedTaskName(e.target.value)}
           className='input'
         />
         <div>
           <label>
             <input
               type="radio"
               value="Pendente"
               checked={updatedStatus === 'Pendente'}
               onChange={() => setUpdatedStatus('Pendente')}
             />
             Pendente
           </label>
           <label>
             <input
               type="radio"
               value="Finalizada"
               checked={updatedStatus === 'Finalizada'}
               onChange={() => setUpdatedStatus('Finalizada')}
             />
             Finalizada
           </label>
           <label>
             <input
               type="radio"
               value="Cancelada"
               checked={updatedStatus === 'Cancelada'}
               onChange={() => setUpdatedStatus('Cancelada')}
             />
             Cancelada
           </label>
         </div>
         <button onClick={handleSave} className='buttonSave'>Salvar</button>
        </>
      ) : (
        <>
          {task.descricao} ({task.status})
          <button onClick={handleEdit} className='button'>Editar</button>
          <button onClick={() => removeTask(task.id)} className='button'>Remover</button>
        </>
      )}
    </li>
  );
};

export default TaskItem;
