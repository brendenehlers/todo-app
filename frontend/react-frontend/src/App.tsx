import React, { useEffect, useState } from 'react'
import './App.css'
import { Todo } from './schema'
import { getTodos } from './api/api'
import TodoCard from './components/TodoCard/TodoCard'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [ todos, setTodos ] = useState<Todo[]>([])
  const [ editingTodo, setEditingTodo ] = useState(false)

  useEffect(() => {
    (async () => {
      const newTodos = await getTodos()
      setTodos(newTodos)
    })()
  }, [])

  function handleTodoToggle(todoId: string) {
    const todoIndex = todos.findIndex(it => it.id === todoId)
    if (todoIndex === -1) return

    setTodos(prevTodos => {
      const newTodos = [...prevTodos]
      newTodos.splice(todoIndex, 1, {...newTodos[todoIndex], isCompleted: !newTodos[todoIndex].isCompleted})
      return newTodos
    })
  }

  function handleUpdateTodoText(todoId: string, text: string) {
    console.log("updating todo text to " + text)
    const todoIndex = todos.findIndex(it => it.id === todoId)
    if (todoIndex === -1) return

    setTodos(prevTodos => {
      const newTodos = [...prevTodos]
      newTodos.splice(todoIndex, 1, {...newTodos[todoIndex], text})
      return newTodos
    })
  }

  function handleToggleTodoEditable(todoId: string) {
    const todoIndex = todos.findIndex(it => it.id === todoId)
    if (todoIndex === -1) return

    if (todos[todoIndex].isEditing) {
      setEditingTodo(false)
    } else {
      setEditingTodo(true)
    }

    setTodos(prevTodos => {
      const newTodos = [...prevTodos]
      newTodos.splice(todoIndex, 1, {...newTodos[todoIndex], isEditing: !newTodos[todoIndex].isEditing})
      return newTodos
    })
  }

  function handleAddTodo() {
    const newTodo: Todo = {
      text: 'my new todo',
      id: uuidv4(),
      isCompleted: false,
      isEditing: true,
    }
    setEditingTodo(true)
    setTodos(prevTodos => {
      const newTodos = [...prevTodos]
      newTodos.push(newTodo)
      return newTodos
    })
  }

  useEffect(() => {
    console.log(todos)
  }, [todos])

  return (
    <main className="App">
      <section>
        <h1>Todos</h1>
        <ul>
          {
            todos.map(todo => {
              return <TodoCard 
                key={todo.id} 
                todo={todo}
                editingTodo={editingTodo}
                onToggleTodoCompleted={handleTodoToggle}
                onUpdateTodoText={handleUpdateTodoText}
                onToggleTodoEditable={handleToggleTodoEditable}
              />
            })
          }
          {!editingTodo && 
            <li className="addTodo">
              <button onClick={handleAddTodo}>Add Todo</button>
            </li>
          }
        </ul>
      </section>
    </main>
  )
}

export default App
