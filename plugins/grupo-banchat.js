
let handler = async (m, { conn, args, isAdmin, isOwner, isROwner }) => {
    // Verificar permisos
    if (!isAdmin && !isOwner && !isROwner) {
        return conn.reply(m.chat, '🚫 *Solo administradores pueden banear el bot del grupo*', m)
    }
    
    if (!m.isGroup) {
        return conn.reply(m.chat, '❌ *Este comando solo funciona en grupos*', m)
    }
    
    try {
        let chat = global.db.data.chats[m.chat]
        let reason = args.join(' ') || 'Baneado por administrador del grupo'
        
        if (chat.isBanned) {
            return conn.reply(m.chat, '⚠️ *Este chat ya está baneado*', m)
        }
        
        chat.isBanned = true
        chat.banReason = reason
        
        await conn.reply(m.chat, `🚫 *𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 ოძ  𝘽 ꂦ Ꮏ BANEADO*

📋 *Información:*
• Chat: ${await conn.getName(m.chat)}
• Razón: ${reason}
• Por: ${await conn.getName(m.sender)}
• Fecha: ${new Date().toLocaleString()}

⚠️ *El bot no responderá a comandos en este chat hasta ser desbaneado*`, m)
        
        console.log(`Chat baneado: ${m.chat} | Razón: ${reason}`)
        
    } catch (e) {
        console.error('Error en banchat:', e)
        await conn.reply(m.chat, `❌ Error al banear chat: ${e.message}`, m)
    }
}

handler.help = ['banchat <razón>']
handler.tags = ['group']
handler.command = ['banchat', 'banbot', 'banearbot']
handler.group = true
handler.admin = true

export default handler
