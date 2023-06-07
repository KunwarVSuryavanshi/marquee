// Dashboard.tsx
import React, { useContext, useState } from 'react';
import { Todo, TodoContext } from '../../context/TodoContext';
import './Dashboard.css';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Dashboard: React.FC = () => {
  const [newTodo, setNewTodo] = useState('');
  const [parentID, setParentID] = useState<number | undefined>(undefined);
  const [subTask, setSubTask] = useState<string>('');
  const { todos, addTodo } = useContext(TodoContext);
  const [prevId, setPrevId] = useState<number | undefined>(undefined);
  const navigate = useNavigate();
  const { setAuthInfo } = useContext(AuthContext);

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
      <div key={todo.id} className='task-list'>
        {
          todo.text &&
          <div className='list'>
            <div className="list-item">
              <span>{todo.text}</span>
              <button className='btn' onClick={() => handleAddSubtask(todo.id)}>Add Subtask</button>
            </div>
          </div>
        }
        {parentID === todo.id && (
          <TextField
            id="outlined-basic"
            label="Subtask"
            variant="outlined"
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

  const handleLogout = () => {
    localStorage.removeItem('authDetails');
    navigate('/login')
    setAuthInfo(false)
  };

  return (
    <div id="dashboard" className='dashboard_root'>
      <div className="header">
        <h1>Welcome to your Dashboard</h1>
      </div>
      <div className='field-btn'>
        <TextField
          id="outlined-basic"
          label="Task"
          variant="outlined"
          type="text"
          placeholder="Enter your task here"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="btn" onClick={handleAddTodo}>Add Todo</button>
      </div>
      <div className='todo-list'>
        {renderTodos(todos)}
      </div>
      <div className='logout'>Done with list? <u className="lg" onClick={handleLogout}>Logout</u></div>
    </div>
  );
};

export default Dashboard;
