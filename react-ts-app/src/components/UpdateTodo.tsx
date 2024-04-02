import { useState } from "react";
import { Todo } from "../model/todo";
import { useStore } from "../store/manage";

function UpdateTodo() {
  const [todo, setTodo] = useState(new Todo({}));
  const addTodo = useStore((state) => state.addTodo);

  return (
    <form className="border p-3 rounded-3">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={todo.title}
          placeholder="Enter title"
          onChange={(e) => {
            setTodo({ ...todo, title: e.target.value });
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          id="description"
          placeholder="Enter description"
          value={todo.description}
          onChange={(e) => {
            setTodo({ ...todo, description: e.target.value });
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="completed" className="form-label">
          Completed
        </label>
        <div className="form-check">
          <input
            className="form-check-input"
            id="yes"
            type="radio"
            value="Yes"
            checked={todo.completed === true}
            onChange={(_) => {
              setTodo({ ...todo, completed: true });
            }}
          />
          <label htmlFor="yes" className="form-check-label">
            Yes
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            id="no"
            type="radio"
            value="No"
            checked={todo.completed === false}
            onChange={(_) => {
              setTodo({ ...todo, completed: false });
            }}
          />
          <label htmlFor="no" className="form-check-label">
            No
          </label>
        </div>
      </div>
      <button
        className="btn btn-success w-100"
        onClick={() => {
          addTodo(todo);
          setTodo(new Todo({}));
        }}
      >
        Add
      </button>
    </form>
  );
}

export default UpdateTodo;
