
let handler = async (m, { conn, text, isROwner }) => {
    if (!isROwner) return conn.reply(m.chat, '❌ Solo el propietario puede usar este comando.', m)
    
    let chat = text || m.chat
    let reason = text ? 'Sin razón específica' : 'Baneado por admin'
    
    try {
        if (!global.db.data.chats[chat]) {
            global.db.data.chats[chat] = {
                isBanned: false,
                welcome: true,
                detect: true,
                antiLink: false,
                antiLink2: false,
                antifake: false,
                antiBot: false,
                nsfw: false,
                expired: 0
            }
        }
        
        global.db.data.chats[chat].isBanned = true
        global.db.data.chats[chat].banReason = reason
        
        await conn.reply(m.chat, `✅ *CHAT BANEADO*\n\n*Chat:* ${chat}\n*Razón:* ${reason}\n*Fecha:* ${new Date().toLocaleString()}`, m)
        
        if (chat === m.chat) {
            await conn.reply(m.chat, '🚫 Este chat ha sido baneado. El bot se retirará.', m)
            setTimeout(() => conn.groupLeave(m.chat), 3000)
        }
    } catch (e) {
        console.error('Error en banchat:', e)
        await conn.reply(m.chat, `❌ Error al banear chat: ${e.message}`, m)
    }
}

handler.help = ['banchat <chat>']
handler.tags = ['owner']
handler.command = /^banchat$/i
handler.rowner = true

export default handler
