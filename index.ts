import { Speech } from './speech';

const startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', start)

function start() {
    const speech = new Speech();
    speech.start();
}