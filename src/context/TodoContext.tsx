import { ReactNode, createContext, useState } from 'react';

export interface Todo {
  id: number;
  text: string;
  subTasks?: Todo[];
}

interface TodoContextProps {
  todos: Todo[];
  addTodo: (text: string, parentID?: number) => void;
}

export const TodoContext = createContext<TodoContextProps>({
  todos: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addTodo: () => { },
});

const searchTodo = (todos: Todo[], id: number): Todo | undefined => {
  let result = todos.find((todo) => todo.id === id);
  if (!result) {
    todos.forEach((todo) => {
      if (todo.subTasks) {
        result = searchTodo(todo.subTasks, id);
      }
    });
  }
  return result;
}

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string, parentID?: number) => {
    const newTodo: Todo = {
      id: Date.now(),
      text: text,
    };
    if (parentID) {
      const parentTodo = searchTodo(todos, parentID);
      if (parentTodo) {
        if (parentTodo.subTasks) {
          parentTodo.subTasks.push(newTodo);
        } else {
          parentTodo.subTasks = [newTodo];
        }
      }
    } else {
      setTodos([...todos, newTodo]);
    }
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
