const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const { exec } = require('child_process')

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

  if (interaction.commandName === 'status') {
    const command = interaction.options.getString('systemctl is-active meshcentral');

    runCommand(command, (error, output) => {
      if (error) {
        interaction.reply(`Error: ${error}`);
      } else {
        interaction.reply(`Output: \`\`\`${output}\`\`\``);
      }
});

function runCommand(command, callback) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error}`);
      return callback(error);
    }
    if (stderr) {
      console.error(`Command stderr: ${stderr}`);
      return callback(stderr);
    }
    callback(null, stdout);
  });
}

client.login(token);