
let handler = async (m, { conn, isOwner, isROwner }) => {
    if (!isOwner && !isROwner) {
        return conn.reply(m.chat, '🚫 *Solo el propietario puede desbanear chats*', m)
    }
    
    let chat = global.db.data.chats[m.chat]
    
    if (!chat.isBanned) {
        return conn.reply(m.chat, '⚠️ *Este chat no está baneado*', m)
    }
    
    let previousReason = chat.banReason || 'Sin razón registrada'
    
    chat.isBanned = false
    delete chat.banReason
    
    await conn.reply(m.chat, `✅ *CHAT DESBANEADO*

📋 *Información:*
• Chat: ${m.isGroup ? 'Grupo' : 'Privado'}
• Razón anterior: ${previousReason}
• Desbaneado por: ${conn.getName(m.sender)}

🎉 *El bot volverá a responder comandos normalmente*`, m)
    
    console.log(`Chat desbaneado: ${m.chat}`)
}

handler.help = ['unbanchat']
handler.tags = ['owner']
handler.command = ['unbanchat', 'desbanchat']
handler.owner = true
handler.register = true

export default handler
