window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
import commands from './commands';
export class Speech {

    private _recognition = new window.SpeechRecognition();
    private _state = {
        isStop: true
    }

    constructor() {
        this._recognition.interimResults = false;
        this._recognition.maxAlternatives = 10;
        this._recognition.continuous = true;
        this._recognition.lang = 'es-ES';
    }

    start(): void {
        this._recognition.start();
        this.setState({ isStop: false });
        this.listening();
    };

    stop(): void {
        this.setState({ isStop: true });
        this._recognition.stop();
    };

    private setState(newState) {
        this._state = newState;
    }

    private getState() {
        return this._state;
    }

    private listening() {
        this._recognition.onresult = event => {
            for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
                this.executeCommand(event.results[i][0].transcript.trim().toLowerCase());
            }
        }
    }

    get loadCommands() {
        return commands.commands;
    };

    private executeCommand(command: string): void {
        console.log(command)
        const commands = this.loadCommands;
        console.log(commands)
        if (commands[command]) {
            commands[command]();
        }

    };
}