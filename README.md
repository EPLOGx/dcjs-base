# dcjsv14-base

The discord.js v14 base that I use for all my bots.

## Stats
<img alt="GitHub all releases" src="https://img.shields.io/github/downloads/EPLOGx/dcjsv14-base/total?color=36c7fc&style=for-the-badge"> <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/EPLOGx/dcjsv14-base?color=36c7fc&style=for-the-badge">


## Requirements
* Node.js

## Installation ##
 
* Setup package:<br>
  `npm init -y` <br>
  `change in the package.json "main" from "index.js" to "src/bot.js"` <br>
  `change in the package.json "test" from "echo \"Error: no test specified\" && exit 1" to "node ."`

* Node.js modules:<br>
  `npm i discord.js discord-api-types @discordjs/rest dotenv chalk@5.3.0`
* Create a .env file in the base folder and paste it there:
 
	  token=YOUR_DISCORD_TOKEN
	  clientId=YOUR_APP_ID
  
* Run bot:<br>
  `npm run test` 
