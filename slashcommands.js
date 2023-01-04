const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId } = require(`./config.json`);
const { token } = require("./data.json")

const slashes = [];


const slashFolders = fs.readdirSync('./slashes');
for (const folder of slashFolders) {
const slashFiles = fs.readdirSync(`./slashes/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of slashFiles) {
		const command = require(`./slashes/${folder}/${file}`);
  slashes.push(command.data.toJSON())
}
}


const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationCommands(clientId), {
				body: slashes
			}
			
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();