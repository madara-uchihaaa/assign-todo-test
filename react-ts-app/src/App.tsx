import "./App.css";
import Form from "./components/UpdateTodo";
import Todos from "./components/Todos";

function App() {
  return (
    <>
      <div className="container mt-5">
        <div className="row gx-5">
          <div className="col-lg-6">
            <div className="todo-container">
              {/* <Form /> */}
              <Todos />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="todo-container">
              <Form />
              {/* <Todos /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
