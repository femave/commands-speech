# Speech web to commands

> SWC is a tool for speech to website and use it to add comands, like navigation or everything you want.

## Project description

The idea is to adapt the web speech recognition to add commands in easy way.


## Usage

Need to load it by cdn (at the moment) ==> [SWC => Release 0.0.3](https://raw.githubusercontent.com/femave/commands-speech/master/dist/speech-commands.94cd7c40.js)

```
<script src="https://raw.githubusercontent.com/femave/commands-speech/master/dist/speech-commands.94cd7c40.js"></script>
```

Then you can use the main class Speech.

```
const speech = new Speech(config);
```

Config is optional and should be: 

```
interface Config {
    showSpeech?: boolean,
    lang?: string
}
```

And then all you need to do is call
```
speech.start();
```

## How to add commands

To add commands create commands.js that export an object with the commands like in [commands.ts](https://github.com/femave/commands-speech/blob/master/commands.ts)


## License

[MIT](https://opensource.org/licenses/mit-license)
