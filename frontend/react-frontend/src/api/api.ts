import { Todo } from '../schema'

// temp while we build the front-end
const todos: Todo[] = [
    {
        id: "1",
        text: "the first todo",
        isCompleted: true,
        isEditing: false,
    },
    {
        id: "2",
        text: "the second todo",
        isCompleted: false,
        isEditing: false,
    },
    {
        id: "3",
        text: "the third todo",
        isCompleted: false,
        isEditing: true,
    },
]

export function getTodos(): Promise<Todo[]> {
    return Promise.resolve(todos)
}

export function getTodo(id: string): Promise<Todo> {
    const todo = todos.find(it => it.id === id)
    if (todo) return Promise.resolve(todo)
    return Promise.reject("unable to find todo with that id")
}

function updateTodo(id: string, todo: Partial<Todo>): Promise<Todo> {
    const newTodoIndex = todos.findIndex(it => it.id === id)
    if (newTodoIndex < 0) Promise.reject("unable to find todo with that id")
    const newTodo: Todo = {...todos[newTodoIndex], ...todo}
    todos.splice(newTodoIndex, 1, newTodo)
    return Promise.resolve(newTodo)
}

export function updateTodoText(id: string, text: string): Promise<Todo> {
    return updateTodo(id, {text})
}

export function updateTodoCompleteStatus(id: string, isCompleted: boolean): Promise<Todo> {
    return updateTodo(id, {isCompleted})
}

export default {
    getTodos,
    getTodo,
    updateTodoText,
    updateTodoCompleteStatus,
}