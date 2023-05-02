import { useDispatch, useSelector } from 'react-redux';
import './addTask.css'
import { TodoState, editTodo } from '../../../../store/rootReducer';
import { useState } from 'react';
import Dropdown from './Dropdown/Dropdown';

function AddTask() {
    const todos = useSelector((state: TodoState) => state.todos);
    const dispatch = useDispatch();
    const [dropdownOpen, setDropdownOpen] = useState<boolean[]>(todos.map(() => false));
    const [editing, setEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(-1);
    const handleEditingChange = (editing: boolean) => {
        setEditing(editing);
        // dispatch(editTodo({ title: todos[index].title, id: todos[index].id  }))
    };

    const handleToggleDropdown = (index: number) => {
        setDropdownOpen(prevState => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
        setEditingIndex(index);
    };

    return (
        <ul>
            {todos.map((todo: any, index: number) => (
                <li className='cardTask' key={todo.id}>
                    <div className='leftCardTask'>
                        <span className='countTask'>{todo.time}</span>
                        <p>
                            {
                                editing && editingIndex === index
                                    ? <input type="text" className='InputEdit' value={todo.title} />
                                    : todo.title
                            }
                        </p>
                    </div>
                    <div className='rightCardTask'>
                        <button className='btnTask' onClick={() => handleToggleDropdown(index)}></button>
                        {dropdownOpen[index] && <Dropdown onEditingChange={handleEditingChange} onToggle={handleToggleDropdown} index={index} />}
                    </div>

                </li>
            ))}
        </ul >
    );
}

export default AddTask;
