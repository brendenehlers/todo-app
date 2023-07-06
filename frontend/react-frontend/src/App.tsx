import React, { useEffect, useState } from 'react'
import './App.css'
import { Todo } from './schema'
import { getTodos } from './api/api'
import TodoCard from './components/TodoCard/TodoCard'

function App() {
  const [ todos, setTodos ] = useState<Todo[]>([])

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
                onToggleTodo={handleTodoToggle}
              />
            })
          }
        </ul>
      </section>
    </main>
  )
}

export default App
