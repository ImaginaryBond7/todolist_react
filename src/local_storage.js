import { useState, useEffect } from "react";
import { render } from "react-dom";
import  axios  from "axios";
let i = 0;

function App() {
  const [todos, setTodos] = useState([]);
  const [item, setItem] = useState("");
  const [searchValue, setSearchValue] = useState("");

  // useEffect(() => {
  //   if (localStorage.getItem("todos")) {
  //       setTodos(JSON.parse(localStorage.getItem("todos")));
  //   }
  //   else{
  //       localStorage.setItem("todos", JSON.stringify([]))
  //   }
  // }, [])

  
    const getTodo = async () => {
      const to = await axios.get('http://localhost:3001/todos');
      console.log(to.data) 
    }
  
  useEffect(() => {
    getTodo();
  }, [])

  // Add function
  const addTodo = () => {
    if (item === "") {
      alert("empty item. pls add something");
    } else {
      i = i + 1;
      // not using if (item === "") waala condition here because even if we try to add blank nothing gets added but i increases
      
      // IMPORTANT- we use variable to do the processing because if we keep it inside setTodos as
      //  setTodos[...todos, { id: i, text: item }] then javascript says tum apna time lo and goes to next
      // line to execute and there we setItem at local storage while setTodos hasn't updated the todos yet 
      // so it remains blank
      let x = [...todos, { id: i, text: item }]
      setTodos(x);
      localStorage.setItem("todos", JSON.stringify(x))
    }
      setItem("");
  };

  // Delete function
  ////////////////////id//////
  const deleteTodo = (id) => {
    // filter function filters out whatever doesn't satisfy the condition
    let x = todos.filter((todo) => {
      return todo.id !== id;
    })
    setTodos(x);
    localStorage.setItem("todos", JSON.stringify(x))
  };

  // Check Todo items function
//   const checkTodo = (id) =>{
    
//   }

  let todoList = "";
  if (searchValue === '') {
    todoList = todos.map((todo) => (
        <div className="todo">
              {/* <input type="checkbox" onClick={() => checkTodo(todo.id)}/> */}
              <span>{todo.text}</span>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
    )
  )}
  else {
    todoList = todos.map((todo) => {
        if (todo.text.search(searchValue) !== -1) {
            return (
            <div className="todo">
                {/* <input type="checkbox" onClick={() => checkTodo(todo.id)}/> */}
                <span>{todo.text}</span>
                <a onClick={() => deleteTodo(todo.id)}>Delete</a>
            </div>
            )
        }
    })
  }

  return (
    <>
      <input
        value={item}
        onChange={(e) => {
          setItem(e.target.value);
        }}
        type="text"
      />
      {/* {item} */}
      <button onClick={addTodo}>Add</button> <br />
      <br />
      <span>Search: </span>
      <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
      <div className="todoList">
        {todoList}
      </div>
    </>
  );
}

render(<App />, document.getElementById("root"));
