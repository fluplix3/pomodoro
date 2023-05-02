import { useDispatch } from 'react-redux';
import './main.css';
import { ChangeEvent, FormEvent, useState } from 'react';
import { addTodo } from '../../../store/rootReducer';
import AddTask from './AddTask/AddTask';

function Main() {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(addTodo(title))
        setTitle('')
    }

    return (
        <main className='main'>
            <div className="addTask">
                <p className="boldText">Ура! Теперь можно начать работать:</p>
                <ul className='instruction'>
                    <li>Выберите категорию и напишите название текущей задачи</li>
                    <li>Запустите таймер («помидор»)</li>
                    <li>Работайте пока «помидор» не прозвонит</li>
                    <li>Cделайте короткий перерыв (3-5 минут)</li>
                    <li>Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).</li>
                </ul>
                <form className='formAddTask' onSubmit={handleSubmit}>
                    <input placeholder='Название задачи' type='text' value={title} onChange={handleChange} />
                    <button className='btnAdd' disabled={title ? false : true}>Добавить</button>
                </form>
                <AddTask />
            </div>
            <div className="timer">
                <div className='headerTimer'>
                    <p className='taskTimer'>Сверстать сайт</p>
                    <p className='countPomidor'>Помидор 1</p>
                </div>
                <div className='mainTimer'>
                    <p className='time'>25:00</p>
                    {/* <button className="btnAddTime">+</button> */}
                    <p className='task'>Задача 1 - <span className='taskName'>Сверстать сайт</span></p>
                    <div className='btnsStartStop'>
                        <button className='btnStart'>Старт</button>
                        <button disabled className='btnStop'>Стоп</button>
                    </div>
                </div>
            </div>
        </main >
    );
}

export default Main;