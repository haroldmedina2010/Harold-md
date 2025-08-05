let handler = async (m, { conn, isOwner, isAdmin, isROwner }) => {
    if (!m.isGroup) return conn.reply(m.chat, '⚠️ *Este comando solo puede usarse en grupos*', m)

    if (!isAdmin && !isOwner && !isROwner) {
        return conn.reply(m.chat, '🚫 *Solo los administradores pueden usar este comando*', m)
    }

    try {
        let chat = global.db.data.chats[m.chat]

        // Restablecer todas las configuraciones del grupo
        chat.isBanned = false
        chat.welcome = true
        chat.autolevelup = false
        chat.autoresponder = false
        chat.delete = false
        chat.autoAceptar = false
        chat.autoRechazar = false
        chat.autosticker = false
        chat.detect = true
        chat.antiBot = false
        chat.antiBot2 = false
        chat.modoadmin = false
        chat.antiLink = false
        chat.antifake = false
        chat.reaction = false
        chat.nsfw = false
        chat.expired = 0
        chat.antiLag = false
        chat.per = []
        chat.sAutoresponder = ''

        // Eliminar razón de baneo si existe
        if (chat.banReason) delete chat.banReason
        if (chat.primaryBot) delete chat.primaryBot

        await conn.reply(m.chat, `✅ *CONFIGURACIONES RESTABLECIDAS*

📋 *Se han restablecido todas las configuraciones del grupo:*

🔧 *Configuraciones básicas:*
• Welcome: ✅ Activado
• Detect: ✅ Activado
• Antilink: ❌ Desactivado
• Antibot: ❌ Desactivado
• Antifake: ❌ Desactivado
• NSFW: ❌ Desactivado
• Autosticker: ❌ Desactivado
• Autoresponder: ❌ Desactivado
• Modo Admin: ❌ Desactivado

🚫 *Sanciones eliminadas:*
• Ban del grupo: ❌ Removido
• Razón de ban: ❌ Eliminada

> Todas las configuraciones han sido restablecidas a sus valores por defecto

*Bot:* 𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 ოძ 𝘽 ꂦ Ꮏ`, m)

    } catch (e) {
        console.error('Error en resetconfig:', e)
        await conn.reply(m.chat, `❌ Error al restablecer configuración: ${e.message}`, m)
    }
}

handler.help = ['resetconfig']
handler.tags = ['admin', 'config']
handler.command = ['resetconfig', 'restablecer', 'resetear']
handler.group = true
handler.admin = true
handler.register = true

export default handler