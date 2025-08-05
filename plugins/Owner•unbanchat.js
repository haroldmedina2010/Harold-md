
let handler = async (m, { conn, text, isROwner }) => {
    if (!isROwner) {
        return conn.reply(m.chat, '❌ Solo el propietario puede usar este comando.', m)
    }
    
    let chat = text || m.chat
    
    try {
        if (!global.db.data.chats[chat]) {
            return conn.reply(m.chat, '❌ Este chat no existe en la base de datos.', m)
        }
        
        if (!global.db.data.chats[chat].isBanned) {
            return conn.reply(m.chat, '⚠️ Este chat no está baneado.', m)
        }
        
        let previousReason = global.db.data.chats[chat].banReason || 'Sin razón registrada'
        
        global.db.data.chats[chat].isBanned = false
        delete global.db.data.chats[chat].banReason
        
        await conn.reply(m.chat, `✅ *𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 ოძ  𝘽 ꂦ Ꮏ - CHAT DESBANEADO*

*Chat:* ${chat}
*Razón anterior:* ${previousReason}
*Estado:* Activo
*Fecha:* ${new Date().toLocaleString()}`, m)
        
    } catch (e) {
        console.error('Error en unbanchat:', e)
        await conn.reply(m.chat, `❌ Error al desbanear chat: ${e.message}`, m)
    }
}

handler.help = ['unbanchat <chat>']
handler.tags = ['owner']
handler.command = /^unbanchat$/i
handler.rowner = true

export default handler
