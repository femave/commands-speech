window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
import commands from './commands';

interface State {
    isStop: boolean;
    isMatch: boolean;
}
interface Config {
    showSpeech?: boolean,
    lang?: string
}

export class Speech {

    private _recognition = new window.SpeechRecognition();
    private _state: State = {
        isStop: true,
        isMatch: false
    }

    private _config: Config = {
        showSpeech: false,
        lang: 'en-EN'
    }

    constructor(config?: Config) {
        this._recognition.interimResults = true;
        this._recognition.maxAlternatives = 1;
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
        this._recognition.onresult = async event => {
            if (!this.getState().isMatch) {
                for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
                    const isCommand = await this.executeCommand(event.results[i][0].transcript.trim().toLowerCase());
                    if (event.results[i].isFinal || isCommand) {
                        console.log('isFinal')
                        this.setState({ isMatch: false });

                    }
                }
            }
        }
    }

    get loadCommands() {
        return commands.commands;
    };

    get starterCommand(): string {
        return commands.starter_command;
    }

    private async executeCommand(command: string): Promise<boolean> {
        const commands = this.loadCommands;
        this.log(`Command used ==>  ${command}`);
        return new Promise(resolve => {
            if (commands[command]) {
                this.setState({ isMatch: true });
                commands[command]();
                resolve(true);
            } else {
                this.log(`No commands available`);
                resolve(false);
            }
        })
    };

    private log(text: string) {
        if (this._config.showSpeech) {
            console.log(text)
        }
    }
}