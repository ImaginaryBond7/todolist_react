import { useState, useEffect } from "react";
import { render } from "react-dom";
import  axios  from "axios";
let i = 0

const AddTodo = () => {
    const [todos, setTodos] = useState([]);
    const [item, setItem] = useState("");
  

    if (item === "") {
      alert("empty item. pls add something");
    } else {
      // i = i + 1;
      // not using if (item === "") waala condition here because even if we try to add blank nothing gets added but i increases
      
      // IMPORTANT- we use variable to do the processing because if we keep it inside setTodos as
      //  setTodos[...todos, { id: i, text: item }] then javascript says tum apna time lo and goes to next
      // line to execute and there we setItem at local storage while setTodos hasn't updated the todos yet 
      // so it remains blank
      const addTodoItem = async () => {
        const todoData= await axios.post('http://localhost:3001/todos', { "title": item });
        console.log(todoData.data) 
        setTodos(todoData.data)
      }
    }
      setItem("");

  };

export default AddTodo;