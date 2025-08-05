
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
            chat = global.db.data.chats[m.chat]
        }
        
        if (chat.isBanned) {
            return conn.reply(m.chat, '⚠️ *Este chat ya está baneado*', m)
        }
        
        chat.isBanned = true
        
        await conn.reply(m.chat, `🚫 *CHAT BANEADO*

El bot dejará de responder a comandos en este chat.

*Baneado por:* @${m.sender.split('@')[0]}
*Fecha:* ${new Date().toLocaleString()}

Para desbanear usa: .unbanchat

*Bot:* 𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 ოძ 𝘽 ꂦ Ꮏ`, m, { mentions: [m.sender] })

    } catch (e) {
        console.error('Error en banchat:', e)
        await conn.reply(m.chat, `❌ Error al banear el chat: ${e.message}`, m)
    }
}

handler.help = ['banchat']
handler.tags = ['admin']
handler.command = ['banchat', 'banchat']
handler.admin = true
handler.group = true
handler.register = true

export default handler
