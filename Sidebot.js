const fs = require('fs');

import { Client, Events, GatewayIntentBits } from 'discord.js';

fs.readFile('config.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading config file:', err);
    return;
  }

  try {
    const config = JSON.parse(data);
    const token = config.token;
    console.log('Token:', token);

  } catch (parseErr) {
    console.error('Error getting token in config file');
  }
});

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.ClientReady, readyClient => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login(token);