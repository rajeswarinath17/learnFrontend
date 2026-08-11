import axios from "axios";
import React, { useEffect, useState } from 'react';

const App = () => {

  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)  

  // ----------- GET ------------
  const getTodos = async () => {
    const response = await axios.get("https://rncore.onrender.com/api/v2/rn_1b50db97fe17ac33d7cc674b5eca1cab/todos");
    setTodos(response.data.todos)
    console.log(response.data.todos)
    
  }


  // ------------POST-------------
  const createTodos = async () => {

    setLoading(true) 

     await axios.post(
      "https://rncore.onrender.com/api/v2/rn_1b50db97fe17ac33d7cc674b5eca1cab/todos",
       {
          title: title,
          isCompleted: true,
       }
      
    );
    getTodos()

    setLoading(false)

    setTitle("")
  };



  // ----------- DELETE ------------
  const dltTodos = async (id) =>{
    const response = await axios.delete(`https://rncore.onrender.com/api/v2/rn_1b50db97fe17ac33d7cc674b5eca1cab/todos/${id}`)

  //  setTodos([])
    getTodos()
  }

   useEffect(() => {
    getTodos()
  }, [])

  return (
    
  <div className="min-h-screen bg-gray-100 p-8">
    <div className="max-w-2xl mx-auto">

      <h1 className="text-3xl font-bold text-center mb-8">
        📝 My Todos
      </h1>

      {/* Add Todo */}
      <div className="bg-white p-5 rounded-xl shadow-md mb-6">
        <input
          type="text"
          onChange={(e)=>{
           setTitle(e.target.value)
          }}
          value={title}
          placeholder="Enter your todo..."
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-3 outline-none focus:border-blue-500"
          
        />

        <button
          onClick={createTodos}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600"
        >
          {loading? "adding..." : "addTodo"}
        </button>
      </div>

      {/* Todo List */}
      <div className="space-y-4">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className="bg-white p-5 rounded-xl shadow-md flex items-center justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold">
                {todo.title}
              </h2>

              <p className="text-sm text-gray-500">
                {todo.isCompleted ? "Completed ✅" : "Pending ⏳"}
              </p>
            </div>

            <button
              onClick={() => dltTodos(todo._id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Delete 
            </button>
          </div>
        ))}
      </div>

    </div>
  </div>
);
    
};

export default App;
