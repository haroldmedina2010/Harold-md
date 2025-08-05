
let handler = async (m, { conn, isOwner, isAdmin, isROwner }) => {
    if (!(isAdmin || isOwner || isROwner)) {
        return conn.reply(m.chat, '🚫 *Solo los administradores pueden usar este comando*', m)
    }
    
    try {
        let chat = global.db.data.chats[m.chat]
        if (!chat) {
            global.db.data.chats[m.chat] = {
                isBanned: false,
                welcome: true,
                detect: true,
                antiLink: false,
                antiBot: false,
                antifake: false,
                nsfw: false,
                autosticker: false,
                autoresponder: false,
                delete: false,
                modoadmin: false,
                autolevelup: false,
                reaction: false
            }
            return conn.reply(m.chat, '✅ *Este chat no estaba baneado*', m)
        }
        
        if (!chat.isBanned) {
            return conn.reply(m.chat, '✅ *Este chat no está baneado*', m)
        }
        
        chat.isBanned = false
        
        await conn.reply(m.chat, `✅ *CHAT DESBANEADO*

El bot volverá a responder a comandos en este chat.

*Desbaneado por:* @${m.sender.split('@')[0]}
*Fecha:* ${new Date().toLocaleString()}

*Bot:* 𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 ოძ 𝘽 ꂦ Ꮏ`, m, { mentions: [m.sender] })

    } catch (e) {
        console.error('Error en unbanchat:', e)
        await conn.reply(m.chat, `❌ Error al desbanear el chat: ${e.message}`, m)
    }
}

handler.help = ['unbanchat']
handler.tags = ['admin']
handler.command = ['unbanchat', 'desbanchat', 'unban']
handler.admin = true
handler.group = true
handler.register = true

export default handler
