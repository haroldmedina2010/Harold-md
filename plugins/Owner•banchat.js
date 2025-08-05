
let handler = async (m, { conn, text, isROwner }) => {
    if (!isROwner) {
        return conn.reply(m.chat, '❌ Solo el propietario puede usar este comando.', m)
    }
    
    let [chatId, ...reasonParts] = text ? text.split(' ') : [m.chat]
    let chat = chatId || m.chat
    let reason = reasonParts.join(' ') || 'Baneado por propietario'
    
    try {
        // Inicializar chat si no existe
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
        
        if (global.db.data.chats[chat].isBanned) {
            return conn.reply(m.chat, '⚠️ *Este chat ya está baneado*', m)
        }
        
        global.db.data.chats[chat].isBanned = true
        global.db.data.chats[chat].banReason = reason
        
        await conn.reply(m.chat, `✅ *𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 ოძ  𝘽 ꂦ Ꮏ - CHAT BANEADO*

*Chat:* ${chat}
*Razón:* ${reason}
*Fecha:* ${new Date().toLocaleString()}`, m)
        
        // Si es el chat actual, avisar antes de salir
        if (chat === m.chat && m.isGroup) {
            await conn.reply(m.chat, '🚫 Este chat ha sido baneado. El bot se retirará en 3 segundos.', m)
            setTimeout(async () => {
                try {
                    await conn.groupLeave(m.chat)
                } catch (e) {
                    console.error('Error al salir del grupo:', e)
                }
            }, 3000)
        }
        
    } catch (e) {
        console.error('Error en banchat:', e)
        await conn.reply(m.chat, `❌ Error al banear chat: ${e.message}`, m)
    }
}

handler.help = ['banchat <chat|razón>']
handler.tags = ['owner']
handler.command = /^banchat$/i
handler.rowner = true

export default handler
