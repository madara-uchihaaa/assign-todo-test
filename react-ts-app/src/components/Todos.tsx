import React, { useState } from "react";
import { Todo } from "../model/todo";
import { useStore } from "../store/manage";

function Todos() {
  const [searchTerm, setSearchTerm] = useState("");
  const todos = useStore((state) => state.todos);

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(e.target.value);
  };

  const deleteTodo = useStore((state) => state.deleteTodo);
  const handleDelete = (id: number) => {
    if (confirm(`Are you sure you want to delete todo with id ${id}?`)) {
      deleteTodo(id);
    }
  };

  // Function to edit a todo
  const editTodo = useStore((state) => state.editTodo);
  const edit = (field: string, todo: Todo) => {
    const value = prompt(`Enter new ${field}`);
    if (value) {
      editTodo(
        todo.id,
        new Todo({
          ...todo,
          [field]: value,
        })
      );
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          placeholder="Search by title"
          className="form-control"
          onChange={handleSearch}
        />
      </div>
      <table className="table table-striped border p-3 rounded-3">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Completed</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredTodos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>
                {todo.title}
                <button
                  className="btn btn-sm btn-outline-primary"
                  style={{ marginLeft: "5px" }}
                  onClick={() => edit("title", todo)}
                >
                  Edit
                </button>
              </td>
              <td>
                {todo.description}
                <button
                  className="btn btn-sm btn-outline-primary ml-2"
                  style={{ marginLeft: "5px" }}
                  onClick={() => edit("description", todo)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className={
                    todo.completed
                      ? "btn btn-sm btn-outline-success"
                      : "btn btn-sm btn-outline-danger"
                  }
                  onClick={(_) => {
                    editTodo(
                      todo.id,
                      new Todo({
                        ...todo,
                        completed: !todo.completed,
                      })
                    );
                  }}
                >
                  {todo.completed ? "Yes" : "No"}
                </button>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Todos;
