const { Collection, EmbedBuilder } = require("discord.js");

module.exports = {
  customname: "on_interactionCreate",
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const { cooldowns } = client;
      const command = commands.get(commandName);
      if (!command) return;

      if (!cooldowns.has(command.data.name)) {
        cooldowns.set(command.data.name, new Collection());
      }

      const now = Date.now();
      const timestamps = cooldowns.get(command.data.name);
      const defaultCooldownDuration = 3;
      const cooldownAmount =
        (command.cooldown ?? defaultCooldownDuration) * 1000;

      if (timestamps.has(interaction.user.id)) {
        const expirationTime =
          timestamps.get(interaction.user.id) + cooldownAmount;
        if (now < expirationTime) {
          const expiredTimestamp = Math.round(expirationTime / 1000);
          return interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setColor(0xa2b5ff)
                .setTitle("**Command is on cooldown!**")
                .setDescription(
                  `Please wait, you are on a cooldown for \`${command.data.name}\`.\n You can use it again <t:${expiredTimestamp}:R>.`
                ),
            ],
            ephemeral: true,
          });
        }
      }

      timestamps.set(interaction.user.id, now);
      setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

      try {
        if (command.useephermal) {
          await interaction.deferReply({ephemeral: true});
        } else {
          await interaction.deferReply({ephemeral: false});
        }
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.editReply({
          embeds: [
            new EmbedBuilder()
              .setColor(0xa2b5ff)
              .setTitle("Error")
              .setDescription(
                `**[CommandHandler]** couldn't execute ${commandName}!`
              ),
          ],
        });
      }
    }
  },
};
