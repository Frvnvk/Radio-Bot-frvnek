const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('eska')
    .setDescription('Odtwarza radio ESKA na kanale głosowym'),

  async execute(interaction) {
    const voiceChannel = interaction.member.voice.channel;

    if (!voiceChannel) {
      return interaction.reply({ content: '❗ Musisz być na kanale głosowym!', ephemeral: true });
    }

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });

    const player = createAudioPlayer();
    const resource = createAudioResource('http://n-04.eska.pl/eska48.aac');

    player.play(resource);
    connection.subscribe(player);

    player.on(AudioPlayerStatus.Playing, () => {
      console.log('🎧 Radio ESKA gra!');
    });

    player.on('error', error => {
      console.error(`Błąd: ${error.message}`);
    });

    await interaction.reply('▶️ Odtwarzam **Radio ESKA**!');
  },
};
