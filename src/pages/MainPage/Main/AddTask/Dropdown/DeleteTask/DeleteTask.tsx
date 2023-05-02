import { FormEvent } from 'react';
import './deleteTask.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TodoState, deleteTodo } from '../../../../../../store/rootReducer';

interface DeleteTaskProps {
    index: number;
    onToggle: () => void;
}

const DeleteTask = React.forwardRef<HTMLFormElement, DeleteTaskProps>(({ index, onToggle }, ref) => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    const dispatch = useDispatch();
    const todos = useSelector((state: TodoState) => state.todos);
    const handleDeleteClick = () => {
        dispatch(deleteTodo({ id: todos[index].id }));
        onToggle();
    }

    const handleCloseClick = () => {
        onToggle();
    }

    return (
        <div className='deleteBackground'>
            <form onSubmit={handleSubmit} ref={ref} className="formDelete">
                <button onClick={handleCloseClick} className='btnCross'></button>
                <div className='blockDelete'>
                    <p>Удалить задачу?</p>
                    <button onClick={handleDeleteClick} className="btnDelete">Удалить</button>
                    <button onClick={handleCloseClick} className='btnCancel'>Отмена</button>
                </div>
            </form>
        </div>
    );
});

export default DeleteTask;