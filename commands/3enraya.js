const TicTacToe = require("discord-tictactoe")
const { token } = require("../data.json")

new TicTacToe({
    token: token,
    language: "es",
    command: "tictactoe",
    commandOptionName: "opponent",
    textCommand: "d!tictactoe",
    
})
.login()
.then(() => console.log("El Bot esta Online"))