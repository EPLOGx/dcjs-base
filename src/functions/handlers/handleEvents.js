const fs = require("fs");

module.exports = (client) => {
  try {
    client.handleEvents = async () => {
      const eventFolders = fs.readdirSync("./src/events");
      for (const folder of eventFolders) {
        const eventFiles = fs
          .readdirSync(`./src/events/${folder}`)
          .filter((file) => file.endsWith(".js"));
        switch (folder) {
          case "client":
            for (const file of eventFiles) {
              const event = require(`../../events/${folder}/${file}`);
              console.log(
                `[EventHandler] ${event.customname} wird versucht zu laden...`
              );
              if (event.once)
                client.once(
                  event.name,
                  (...args) => event.execute(...args, client),
                  console.log(
                    `[EventHandler] ${event.customname} wurde einmalig geladen.`
                  )
                );
              else
                client.on(
                  event.name,
                  (...args) => event.execute(...args, client),
                  console.log(
                    `[EventHandler] ${event.customname} wurde dauerhaft geladen.`
                  )
                );
            }
            break;

          default:
            break;
        }
      }
    };
  } catch (e) {
    console.log(e);
  }
};
