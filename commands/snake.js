const Discord = module.require("discord.js");
const { Snake } = require("discord-gamecord")

module.exports = {
  name: "snake",
  description: "Juego de la serpiente en discord!",
  run: async (client, message, args) => {
          new Snake({
        message: message,
        embed: {
        title: 'SSnake',
        color: '#5865F2',
        OverTitle: "Game Over",
        },
        snake: { head: '🟢', body: '🟩', tail: '🟢' },
        emojis: {
          board: '⬛',
          food: '🍎',
          up: '⬆️',
          right: '➡️',
          down: '⬇️',
          left: '⬅️',
        },
        othersMessage: 'No tienes permisos para usar los botones!',
      }).startGame();
  },
};