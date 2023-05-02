import { Link } from 'react-router-dom';
import './errorPage.css';

function ErrorPage() {
    return (
        <div className='errorBlock'>
            <p className='errorMessage'>Упс! Страница не найдена</p>
            <Link to={'/pomodoro'}><button className='btnBack'>Назад</button></Link>
        </div>
    );
}

export default ErrorPage;