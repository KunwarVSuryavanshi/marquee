// Dashboard.tsx
import React, { useContext, useState } from 'react';
import { Todo, TodoContext } from '../../context/TodoContext';
import './Dashboard.css';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import AddTaskIcon from '@mui/icons-material/AddTask';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import { sanatizeInput } from '../../utils';
import Checkbox from '@mui/material/Checkbox';

const Dashboard: React.FC = () => {
  const [newTodo, setNewTodo] = useState('');
  const [parentID, setParentID] = useState<number | undefined>(undefined);
  const [subTask, setSubTask] = useState<string>('');
  const { todos, addTodo, expandTodo, markTodo } = useContext(TodoContext);
  const [prevId, setPrevId] = useState<number | undefined>(undefined);
  const navigate = useNavigate();
  const { setAuthInfo } = useContext(AuthContext);

  const handleInput = (value: string, region: string) => {
    if (region === 'sub')
      setSubTask(sanatizeInput(value));
    else {
      setNewTodo(sanatizeInput(value));
    }
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      // for closing the subtask input field if user clicks on the main input field
      setParentID(undefined);
      setPrevId(undefined);
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
      setParentID(undefined);
      setPrevId(undefined);
      setSubTask('');
    }
  };

  // if user leaves the input field without entering any text, then remove the subtask
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    if (subTask.trim() === '') {
      e.preventDefault();
      setParentID(undefined);
      setPrevId(undefined);
    }
  };

  const handleExpand = (item: Todo) => {
    expandTodo(item?.id);
  };

  const handleDone = (id: number) => {
    markTodo(id)
  };

  const handleLogout = () => {
    sessionStorage.removeItem('authDetails');
    navigate('/login')
    setAuthInfo(false)
  };

  // for rendering todos subtasks recursively
  const renderTodos = (todos: Todo[], mr = 0): JSX.Element[] => {
    return todos.map((todo) => (
      <div key={todo.id} className='task-list' style={{ marginLeft: `${mr * 2}rem` }}>
        {
          todo.text &&
          <div className='list'>
            <span title="Adds Subtask to current task" style={{ display: 'inherit' }}><LowPriorityIcon className='btn subtask' onClick={() => handleAddSubtask(todo.id)} /></span>
            {todo?.text && <Checkbox className="doneIcon" checked={todo?.status} onClick={() => handleDone(todo.id)} />}
            {todo?.subTasks?.length && todo?.subTasks?.[todo?.subTasks?.length - 1]?.text &&
              <>
                <div className='drop_icon' onClick={() => handleExpand(todo)}>
                  {todo?.expanded ?
                    <>&#x25BC;</>
                    :
                    <>&#x25B6;</>
                  }
                </div>
              </>
            }
            <div className='list-text'>{todo.text}</div>
            {/* {todo?.text && !todo?.status && <DoneIcon className="doneIcon" onClick={() => handleDone(todo.id)} />} */}
          </div>
        }
        {parentID === todo.id && (
          <div className="subtask-field">
            <TextField
              id="outlined-basic"
              label="Subtask"
              variant="outlined"
              className='subtask-input'
              type="text"
              placeholder="Enter your subtask here"
              value={subTask}
              onChange={(e) => handleInput(e.target.value, 'sub')}
              onBlur={handleBlur}
            />
            {subTask?.trim()?.length ? <AddTaskIcon className="addIcon" onClick={() => handleAddSubtask(todo.id)} /> : null}
          </div>
        )}
        {todo.subTasks && todo?.expanded && <div className={`sub-lists sl-${mr}`}  > {renderTodos(todo.subTasks, mr + 1)}</div>}
      </div >
    ));
  };

  return (
    <div id="dashboard" className='dashboard_root'>
      <div className="header">
        <h1>Welcome to your Dashboard</h1>
      </div>
      <div className='logout'>Done with the list? <u className="lg" onClick={handleLogout}>Logout</u></div>
      <div className='field-btn'>
        <TextField
          id="outlined-basic"
          label="Task"
          variant="outlined"
          className='todo-input'
          type="text"
          placeholder="Enter your task here"
          value={newTodo}
          onChange={(e) => handleInput(e.target.value, 'todo')}
        />
        <button className="btn" onClick={handleAddTodo}>Add Todo</button>
      </div>
      <div className='todo-list'>
        {renderTodos(todos)}
      </div>
    </div>
  );
};

export default Dashboard;
