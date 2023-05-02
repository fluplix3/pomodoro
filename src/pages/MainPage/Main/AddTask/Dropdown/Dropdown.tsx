import { useDispatch, useSelector } from 'react-redux';
import { TodoState, updateTime } from '../../../../../store/rootReducer';
import { useEffect, useRef, useState } from 'react';
import './dropdown.css';
import DeleteTask from './DeleteTask/DeleteTask';

interface DropdownProps {
    onToggle: (index: number) => void;
    index: number;
    onEditingChange: (editing: boolean) => void;
}

function Dropdown({ onToggle, index, onEditingChange }: DropdownProps) {
    const todos = useSelector((state: TodoState) => state.todos);
    const dispatch = useDispatch();
    const todo = todos[index];
    const [time, setTime] = useState(todo.time);
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const deleteRef = useRef<HTMLFormElement>(null);

    //Увеличение/уменьшение времени на задачи
    const handleTimeClick = (type: "increase" | "decrease") => {
        let newTime;
        if (type === "increase") {
            newTime = time + 1;
        } else {
            newTime = time - 1;
        }
        setTime(newTime);
        // вызываем новое действие "UPDATE_TIME" и передаем новое время и id задачи
        dispatch(updateTime({ id: todo.id, time: newTime }));
        onToggle(index);
    };

    //Редактирование задачи
    const handleEditClick = () => {
        setEditing(true);
        onEditingChange(true);
        onToggle(index);
    }

    //Вызов компонента <DeleteTask />
    const handleDeleteClick = () => {
        setDeleting(true);
    }

    //Передача пропов в компонент <DeleteTask />
    const handleToggle = () => {
        setDeleting(false);
        onToggle(index);
    };

    //Закрытие дропдауна при клике вне
    const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) && deleteRef.current &&
            !deleteRef.current.contains(e.target as Node)) {
            onToggle(index);
        }
    }

    //Закрытие формы удаления задачи
    const handleClickDeleteOutside = (e: MouseEvent) => {
        if (deleteRef.current && !deleteRef.current.contains(e.target as Node)) {
            onToggle(index);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickDeleteOutside);
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('mousedown', handleClickDeleteOutside);
        }
    }, [])

    return (
        <>
            <div ref={dropdownRef} className='dropdown'>
                <ul className='dropdownList'>
                    <li>
                        {
                            time > 8
                            ? <button className='btnIncrement btnDropdown' disabled onClick={() => handleTimeClick('increase')}>Увеличить</button>
                            : <button className='btnIncrement btnDropdown' onClick={() => handleTimeClick('increase')}>Увеличить</button>
                        }
                    </li>
                    <li>
                        {
                            time === 1
                                ? <button className='btnDecrement btnDropdown' disabled onClick={() => handleTimeClick('decrease')}>Уменьшить</button>
                                : <button className='btnDecrement btnDropdown' onClick={() => handleTimeClick('decrease')}>Уменьшить</button>
                        }
                    </li>
                    <li><button className='btnEdit btnDropdown' onClick={handleEditClick}>Редактировать</button></li>
                    <li><button className='btnDeleteItem btnDropdown' onClick={handleDeleteClick}>Удалить</button></li>
                </ul>
            </div>
            {deleting && <DeleteTask onToggle={handleToggle} ref={deleteRef} index={index} />}
        </>
    );
}

export default Dropdown;

