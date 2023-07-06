import React from "react"
import { Todo } from "../../schema"
import "./styles.css"


type Props = {
    todo: Todo
    onToggleTodo: (todoId: string) => void
}

function TodoCard({todo, onToggleTodo}: Props) {
    return (
        <li>
            <p>{todo.text}</p>
            <input 
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => onToggleTodo(todo.id)} 
            />
        </li>
    )
}

export default TodoCard