
let handler = async (m, { conn, isAdmin, isOwner, isROwner }) => {
    // Verificar permisos
    if (!isAdmin && !isOwner && !isROwner) {
        return conn.reply(m.chat, '🚫 *Solo administradores pueden desbanear el bot*', m)
    }
    
    if (!m.isGroup) {
        return conn.reply(m.chat, '❌ *Este comando solo funciona en grupos*', m)
    }
    
    try {
        let chat = global.db.data.chats[m.chat]
        
        if (!chat.isBanned) {
            return conn.reply(m.chat, '⚠️ *Este chat no está baneado*', m)
        }
        
        let previousReason = chat.banReason || 'Sin razón registrada'
        
        chat.isBanned = false
        delete chat.banReason
        
        await conn.reply(m.chat, `✅ *𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 ოძ  𝘽 ꂦ Ꮏ DESBANEADO*

📋 *Información:*
• Chat: ${await conn.getName(m.chat)}
• Razón anterior: ${previousReason}
• Desbaneado por: ${await conn.getName(m.sender)}
• Fecha: ${new Date().toLocaleString()}

🎉 *El bot volverá a responder comandos normalmente*`, m)
        
        console.log(`Chat desbaneado: ${m.chat}`)
        
    } catch (e) {
        console.error('Error en unbanchat:', e)
        await conn.reply(m.chat, `❌ Error al desbanear chat: ${e.message}`, m)
    }
}

handler.help = ['unbanchat']
handler.tags = ['group']
handler.command = ['unbanchat', 'desbanchat', 'unbanbot']
handler.group = true
handler.admin = true

export default handler
