
let handler = async (m, { conn, text, isROwner }) => {
    if (!isROwner) return conn.reply(m.chat, '❌ Solo el propietario puede usar este comando.', m)
    
    let chat = text || m.chat
    
    try {
        if (!global.db.data.chats[chat]) {
            return conn.reply(m.chat, '❌ Este chat no existe en la base de datos.', m)
        }
        
        if (!global.db.data.chats[chat].isBanned) {
            return conn.reply(m.chat, '⚠️ Este chat no está baneado.', m)
        }
        
        global.db.data.chats[chat].isBanned = false
        delete global.db.data.chats[chat].banReason
        
        await conn.reply(m.chat, `✅ *CHAT DESBANEADO*\n\n*Chat:* ${chat}\n*Estado:* Activo\n*Fecha:* ${new Date().toLocaleString()}`, m)
        
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
