import { Header } from "../MainPage/Header";
import './statistic.css';

function Statistic() {
    return (
        <>
            <Header />
            <main className="mainStatistic">
                <div className="activity">
                    <p>Ваша активность</p>
                    <form>
                        <select className="activityChoice">
                            <option>Эта неделя</option>
                            <option>Прошедшая неделя</option>
                            <option>2 недели назад</option>
                        </select>
                    </form>
                </div>
                <div>
                    <div className="PomidorTimes">
                        <div className="totalTime"></div>
                        <div className="quanityPomidors"></div>
                    </div>
                    <div className="statistic">

                    </div>
                </div>
            </main>
        </>
    );
}

export default Statistic;