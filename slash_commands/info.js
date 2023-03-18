const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Thông tin của bài hát hiện tại"),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)
        if (!queue) return await interaction.editReply("Chưa có bài hát nào trong hàng đợi")
        let bar = queue.createProgressBar({
            queue: false,
            length: 19
        })
        const song = queue.current
        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setThumbnail(song.thumbnail)
                    .setDescription(`Bài hát hiện tại là: [${song.title}]:(${song.url})\n\n` + bar)
            ]
        })
    }
}