const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const config = require('../config.json');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('eska')
    .setDescription('Gra radio Eska'),
  async execute(interaction) {
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return interaction.reply({ content: 'Wejdź najpierw na kanał głosowy!', ephemeral: true });
    }
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });
    const player = createAudioPlayer();
    const resource = createAudioResource(config.autoPlayUrl);
    connection.subscribe(player);
    player.play(resource);
    await interaction.reply('🔊 Gram radio Eska!');
  },
};
