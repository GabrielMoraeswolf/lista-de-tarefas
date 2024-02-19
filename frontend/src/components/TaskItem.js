import React, { useState } from 'react';

const TaskItem = ({ task, editTask, removeTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTaskName, setUpdatedTaskName] = useState(task.name);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTask(task.id, updatedTaskName);
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
          />
          <button onClick={handleSave}>Salvar</button>
        </>
      ) : (
        <>
          {task.name} ({task.status})
          <button onClick={handleEdit}>Editar</button>
          <button onClick={() => removeTask(task.id)}>Remover</button>
        </>
      )}
    </li>
  );
};

export default TaskItem;
