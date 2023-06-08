import { ReactNode, createContext, useState } from 'react';

export interface Todo {
  id: number;
  text: string;
  subTasks?: Todo[];
  expanded: boolean;
  status: boolean;
}

interface TodoContextProps {
  todos: Todo[];
  addTodo: (text: string, parentID?: number) => void; //for adding tasks
  expandTodo: (id: number) => void; //for maintaining the expanded state of a task
  markTodo: (id: number) => void; //for marking a task as done
}

export const TodoContext = createContext<TodoContextProps>({
  todos: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addTodo: () => { },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  expandTodo: () => { },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  markTodo: () => { },
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

const markDone = (todos: Todo): void => {
  if (todos && todos.subTasks) {
    todos.subTasks.forEach((subTask) => {
      subTask.status = todos.status;
      if (subTask.subTasks)
        markDone(subTask);
    });
  }
}


export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string, parentID?: number) => {
    const newTodo: Todo = {
      id: Date.now(),
      text: text,
      expanded: true,
      status: false,
    };
    if (parentID) {
      const parentTodo = searchTodo(todos, parentID);
      if (parentTodo) {
        if (parentTodo.subTasks) {
          parentTodo.subTasks.push(newTodo);
          parentTodo.status = false;
        } else {
          parentTodo.subTasks = [newTodo];
          parentTodo.status = false;
        }
      }
    } else {
      setTodos([...todos, newTodo]);
    }
  };

  const expandTodo = (id: number) => {
    if (id) {
      const todo = searchTodo(todos, id);
      if (todo) {
        todo.expanded = !todo.expanded;
        setTodos([...todos]);
      }
    }
  };

  const markTodo = (id: number) => {
    if (id) {
      const todo = searchTodo(todos, id);
      if (todo) {
        todo.status = !todo.status;
        if (todo.subTasks) {
          // todo.subTasks.forEach((subTask) => {
          //   subTask.status = todo.status;
          // });
          markDone(todo);
        }
        setTodos([...todos]);
      }
    }
  };
  return (
    <TodoContext.Provider value={{ todos, addTodo, expandTodo, markTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
