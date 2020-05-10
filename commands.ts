export default
    {
        "starter_command": "comando",
        "commands": {
            "marc": () => { console.log('Marc is the creator of web speech commands') },
            "hola": () => { console.log('Hello world!') },
            "list of commands": () => console.log(Object.keys(this.default.commands).map(key => key))
        }
    }