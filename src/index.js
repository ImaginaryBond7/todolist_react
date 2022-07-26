import { useState, useEffect } from "react";
import { render } from "react-dom";
import  axios  from "axios";
import "./style.css";


function App() {
  const [todos, setTodos] = useState([]);
  const [item, setItem] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [iTitle, setiTitle] = useState("");

// using it to call after each task to update the list and display the new array of lists
  const getTodo = async () => {
    const todoData= await axios.get('http://localhost:3001/todos');
    //console.log(todoData.data) 
    setTodos(todoData.data)
  }
  
// rendering data for first time page is loaded
  useEffect(() => {
    getTodo();
  }, [])

  //////////////////////////////////////////////////////////////////////////////
  // Add function
  const addTodo = () => {
    if (item === "") {
      alert("empty item. pls add something");
    } else {

      const addTodoItem = async () => {
        const todoData = await axios.post('http://localhost:3001/todos', { "title": item });
        //console.log(todoData.data)
        //setTodos(todoData.data) nhi krna h cause data sirf store kr rhe fir getTodo() line no 46 pe sb chorr de rhe
        getTodo()
        // getTodo await ke baad call krna pdd rha pta nhi kyu at  line = line+6(48) pe ye kaam nhi kr rha tha old value hi show ho jaa rhi thi mtlb add hone se pehle getTodo ho jaa rha tha
      }
      addTodoItem()
      
    }
      setItem("");
      // getTodo()
  };

  ///////////////////////////////////////////////////////////////////////////////
  // Delete function
  ////////////////////id//////
  const deleteTodo = (id) => {
    // filter function filters out whatever doesn't satisfy the condition
    const deleteTodoItem = async () => {
        await axios.delete(`http://localhost:3001/todos/${id}`);
        getTodo()

      }
      deleteTodoItem()
      
  };

  //////////////////////////////////////////////////////////////////////////////
  // Edit function
  const editSave = () => {
    alert('in development')
  }

  const editTodo = (title, id) => {
    console.log(id, title)
    document.getElementById("editText").value = title
    
  }

  // Check Todo items function
//   const checkTodo = (id) =>{
    
//   }

  let todoList = "";
  if (searchValue === '') {
    todoList = todos.map((todo) => (
        <div className="todo-upper">
              {/* <input type="checkbox" onClick={() => checkTodo(todo.id)}/> */}
              <span>{todo.title}</span>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              <button onClick={() => editTodo(todo.title, todo.id)}> Edit</button>
            </div>
    )
  )}
  else {
    todoList = todos.map((todo) => {
        if (todo.title.search(searchValue) !== -1) {
            return (
            <div className="todo-upper">
                {/* <input type="checkbox" onClick={() => checkTodo(todo.id)}/> */}
                <span>{todo.title}</span>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                <button onClick={() => editTodo(todo.title, todo.id)}> Edit</button>
            </div>
            )
        }
    })
  }

  return (
    <>
    <div className="todo-body">
        <div className="todo-search-box">
          <div className="search-bar">
          <span>Add Todo: </span>
            <input
              value={item}
              onChange={(e) => {
                setItem(e.target.value);
              }}
              type="text"
            />

            <button onClick={addTodo}>Add</button>
          </div>
        </div>
          <br />
          <br />
          <div className="edit-container">
            <span>Edit your Todo here: </span>
            <input
              id="editText"
              value={iTitle}
              onChange={(iTitle) => {
                setiTitle(iTitle.target.value);
              }}
              type="text"
            />
            <button onClick={editSave}>Save</button>
            </div>
          <br />
          <br />
          <span>Search: </span>
          <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          <div className="todoList">
            {todoList}
          </div>
      </div>
    </>
  );
}

render(<App />, document.getElementById("root"));
