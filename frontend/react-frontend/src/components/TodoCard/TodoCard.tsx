import React from "react"
import { Todo } from "../../schema"
import "./styles.css"


type Props = {
    todo: Todo
    editingTodo: boolean
    onToggleTodoCompleted: (todoId: string) => void
    onUpdateTodoText: (todoId: string, todoText: string) => void
    onToggleTodoEditable: (todoId: string) => void
}

function TodoCard({todo, ...props}: Props) {
    function handleUpdateText(text: string) {
        props.onUpdateTodoText(todo.id, text)
    }

    return (
        <li>
            {!todo.isEditing ?
            <section>
                <p>{todo.text}</p>
                <div
                    style={{
                        display: 'flex',
                        marginLeft: 'auto',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {!props.editingTodo && <button onClick={() => props.onToggleTodoEditable(todo.id)}>edit</button>}
                    <input 
                        type="checkbox"
                        checked={todo.isCompleted}
                        onChange={() => props.onToggleTodoCompleted(todo.id)} 
                    />
                </div>
            </section>
            :
            <section>
                <input 
                    value={todo.text}
                    onChange={(e) => handleUpdateText(e.target.value)}
                />
                <button onClick={() => props.onToggleTodoEditable(todo.id)}>Submit</button>
            </section>
            }
        </li>
    )
}

export default TodoCard