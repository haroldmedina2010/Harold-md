
let handler = async (m, { conn, args, isOwner, isROwner }) => {
    if (!isOwner && !isROwner) {
        return conn.reply(m.chat, '🚫 *Solo el propietario puede banear chats*', m)
    }
    
    let chat = global.db.data.chats[m.chat]
    let reason = args.join(' ') || 'Sin razón especificada'
    
    if (chat.isBanned) {
        return conn.reply(m.chat, '⚠️ *Este chat ya está baneado*', m)
    }
    
    chat.isBanned = true
    chat.banReason = reason
    
    await conn.reply(m.chat, `🚫 *CHAT BANEADO*

📋 *Información:*
• Chat: ${m.isGroup ? 'Grupo' : 'Privado'}
• Razón: ${reason}
• Por: ${conn.getName(m.sender)}

⚠️ *El bot no responderá a comandos en este chat hasta ser desbaneado*`, m)
    
    console.log(`Chat baneado: ${m.chat} | Razón: ${reason}`)
}

handler.help = ['banchat <razón>']
handler.tags = ['owner']
handler.command = ['banchat', 'banchats']
handler.owner = true
handler.register = true

export default handler
