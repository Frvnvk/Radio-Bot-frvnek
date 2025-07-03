const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
require("./bot.js");
async function playEska24_7(guild) {
  try {
    const voiceChannel = guild.channels.cache.get(config.autoVoiceChannelId);
    if (!voiceChannel) {
      console.log('Nie znaleziono kanału głosowego dla autoodtwarzania Eska');
      return;
    }
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
    });
    const player = createAudioPlayer();
    const resource = createAudioResource(config.autoPlayUrl);
    connection.subscribe(player);
    player.play(resource);
    player.on(AudioPlayerStatus.Idle, () => {
      player.play(createAudioResource(config.autoPlayUrl));
    });
    console.log('Autoodtwarzanie Eska 24/7 uruchomione!');
  } catch (error) {
    console.error('Błąd autoodtwarzania:', error);
   }
}
client.once('ready', async () => {
  console.log('Bot gotowy!');
  const guild = client.guilds.cache.first();
  if (guild) {
    await playEska24_7(guild);
  }
});
client.on('messageCreate', async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === 'eska') {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Wejdź najpierw na kanał głosowy!');
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator,
    });
    const player = createAudioPlayer();
    const resource = createAudioResource(config.autoPlayUrl);
    connection.subscribe(player);
    player.play(resource);
    message.reply('🔊 Gram radio Eska!');
  }
});
