const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
      .setName("example")
      .setDescription("simple example"),

    async execute(interaction, client) {
        // your code
    }
}