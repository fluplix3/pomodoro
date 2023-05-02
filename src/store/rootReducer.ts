export interface Todo {
    title: string;
    time: number;
    completed: boolean;
    id: number;
}

interface ChangeTime {
    id: number;
    time: number;
}

interface DeleteTodo {
    id: number;
}

interface EditTodo {
    id: number,
    title: string,
}

export interface TodoState {
    todos: Todo[];
}

export const editTodo = ({ id, title }: EditTodo) => ({
    type: "EDIT_TODO",
    payload: {
        id,
        title,
    }
})

export const deleteTodo = ({ id }: DeleteTodo) => ({
    type: "DELETE_TODO",
    payload: {
        id,
    }
})

export const updateTime = ({ id, time }: ChangeTime) => ({
    type: "UPDATE_TIME",
    payload: {
        id,
        time,
    }
})

export const addTodo = (title: string) => ({
    type: "ADD_TODO",
    payload: {
        title,
        time: 1,
        completed: false,
        id: Math.floor(Math.random() * (100000 - 1) + 1), // генерируем уникальный id для задачи
    },
});

const initialState: TodoState = {
    todos: [],
};

export const rootReducer = (state = initialState, action: { type: string; payload: Todo }): TodoState => {
    switch (action.type) {
        case "ADD_TODO":
            return {
                ...state,
                todos: [...state.todos, action.payload],
            };
        case "UPDATE_TIME":
            const updatedTodos = state.todos.map((todo) =>
                todo.id === action.payload.id ? { ...todo, time: action.payload.time } : todo
            );
            return {
                ...state,
                todos: updatedTodos,
            };
        case "EDIT_TODO":
            const editingTodos = state.todos.map((todo) =>
                todo.id === action.payload.id ? { ...todo, title: action.payload.title} : todo
            );
            return {
                ...state,
                todos: editingTodos,
            }
        case "DELETE_TODO":
            const filteredTodos = state.todos.filter((todo) =>
                todo.id !== action.payload.id
            );
            return {
                ...state,
                todos: filteredTodos,
            }
        default:
            return state;
    }
};