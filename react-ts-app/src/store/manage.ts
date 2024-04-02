import create from "zustand";
import { Todo } from "../model/todo";

interface State {
  todos: Todo[];
  getTodos: () => Todo[];
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, todo: Todo) => void;
}

const addToLC = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFromLC = (key: string) => {
  return JSON.parse(localStorage?.getItem(key) || "[]");
};

const editFromLC = (id: number, todo: Todo) => {
  const todos = getFromLC("todos");
  todos.forEach((t: Todo, index: number) => {
    if (t.id === id) {
      todos[index] = todo;
    }
  });
  addToLC("todos", todos);
};

const deleteFromLC = (id: number) => {
  const todos = getFromLC("todos");
  const updatedTodos = todos.filter((todo: Todo) => todo.id !== id);
  addToLC("todos", updatedTodos);
};


const useStore = create<State>((set) => ({
  todos: getFromLC("todos"),
  getTodos: () => getFromLC("todos"),
  addTodo: (todo: Todo) =>
    set((state) => {
      const updatedTodos = [...state.todos, todo];
      addToLC("todos", updatedTodos);
      return { todos: updatedTodos };
    }),
  deleteTodo: (id: number) =>
    set((state) => {
      const updatedTodos = state.todos.filter((todo) => todo.id !== id);
      deleteFromLC(id);
      return { todos: updatedTodos };
    }),
  editTodo: (id: number, todo: Todo) =>
    set((state) => {
      const updatedTodos = state.todos.map((t) =>
        t.id === id ? { ...t, ...todo } : t
      );
      editFromLC(id, todo);
      return { todos: updatedTodos };
    }),
}));

export { useStore };
