const fs = require("fs");
const { Routes } = require("discord-api-types/v10");
const { REST } = require("@discordjs/rest");

module.exports = (client) => {
  try {
    client.handleCommands = async () => {
      const commandFolders = fs.readdirSync("./src/commands");
      for (const folder of commandFolders) {
        const commandFiles = fs
          .readdirSync(`./src/commands/${folder}`)
          .filter((file) => file.endsWith(".js"));

        const { commands, commandArray } = client;
        for (const file of commandFiles) {
          const command = require(`../../commands/${folder}/${file}`);
          commands.set(command.data.name, command);
          commandArray.push(command.data.toJSON());
          console.log(
            `[CommandHandler] ${command.data.name} wurde erfolgreich geladen.`
          );
        }
      }
      const { clientId } = process.env;
      const rest = new REST({ version: "10" }).setToken(process.env.token);
      try {
        console.log("[CommandHandler] SlashCommands werden syncronisiert...");

        await rest.put(Routes.applicationCommands(clientId), {
          body: client.commandArray,
        });

        console.log(
          "[CommandHandler] SlashCommands wurden erfolgreich syncronisiert!"
        );
      } catch (error) {
        console.error(error);
      }
    };
  } catch (e) {
    console.log(e);
  }
};
