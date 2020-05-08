window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
import commands from './commands';

interface State {
    isStop: boolean;
}
interface Config {
    showSpeech?: boolean,
    lang?: string
}

export class Speech {

    private _recognition = new window.SpeechRecognition();
    private _state: State = {
        isStop: true
    }

    private _config: Config = {
        showSpeech: false,
        lang: 'en-EN'
    }

    constructor(config?: Config) {
        this._recognition.interimResults = false;
        this._recognition.maxAlternatives = 10;
        this._recognition.continuous = true;
        this._recognition.lang = 'es-ES';
        this._config = { ...this._config, ...config };
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
        const commands = this.loadCommands;
        this.log(`Command used ==>  ${command}`);
        if (commands[command]) {
            commands[command]();
        } else {
            this.log(`No commands available`);
        }
    };

    private log(text: string) {
        if (this._config.showSpeech) {
            console.log(text)
        }
    }
}