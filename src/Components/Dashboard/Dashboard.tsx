// Dashboard.tsx
import React, { useContext, useState } from 'react';
import { Todo, TodoContext } from '../../context/TodoContext';

const Dashboard: React.FC = () => {
  const [newTodo, setNewTodo] = useState('');
  const [parentID, setParentID] = useState<number | undefined>(undefined);
  const [subTask, setSubTask] = useState<string>('');
  const { todos, addTodo } = useContext(TodoContext);
  const [prevId, setPrevId] = useState<number | undefined>(undefined);

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      addTodo(newTodo);
      setNewTodo('');
    }
  };

  const handleAddSubtask = (id: number) => {
    if (prevId !== id) {
      setParentID(id);
      setPrevId(id);
      addTodo(subTask, id);
      setSubTask('');
    }
    if (prevId === id && subTask.trim() !== '') {
      addTodo(subTask, id);
      setSubTask('');
    }
  };

  const renderTodos = (todos: Todo[]): JSX.Element[] => {
    return todos.map((todo) => (
      <div key={todo.id}>
        {
          todo.text &&
          <div>
            <span>{todo.text}</span>
            <button onClick={() => handleAddSubtask(todo.id)}>Add Subtask</button>
          </div>
        }
        {parentID === todo.id && (
          <input
            type="text"
            placeholder="Enter your subtask here"
            value={subTask}
            onChange={(e) => setSubTask(e.target.value)}
          />
        )}
        {todo.subTasks && renderTodos(todo.subTasks)}
      </div>
    ));
  };

  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      <div>
        <input
          type="text"
          placeholder="Enter your task here"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <div>
        {renderTodos(todos)}
      </div>
    </div>
  );
};

export default Dashboard;
