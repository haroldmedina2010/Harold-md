
let handler = async (m, { conn, isAdmin, isOwner }) => {
    if (!m.isGroup) return conn.reply(m.chat, '❌ Este comando solo funciona en grupos.', m)
    if (!(isAdmin || isOwner)) return conn.reply(m.chat, '❌ Solo los administradores pueden usar este comando.', m)
    
    try {
        // Configuración por defecto para grupos
        const defaultConfig = {
            isBanned: false,
            welcome: true,
            detect: true,
            antiLink: false,
            antiLink2: false,
            antifake: false,
            antiBot: false,
            antiBot2: false,
            autosticker: false,
            autoresponder: false,
            reaction: false,
            nsfw: false,
            delete: false,
            modoadmin: false,
            autolevelup: false,
            expired: 0,
            sAutoresponder: '',
            autoAceptar: false,
            autoRechazar: false,
            per: []
        }
        
        // Restablecer configuración del chat
        global.db.data.chats[m.chat] = { ...defaultConfig }
        
        let configText = `✅ *CONFIGURACIÓN RESTABLECIDA*\n\n`
        configText += `*Grupo:* ${await conn.getName(m.chat)}\n`
        configText += `*Por:* ${await conn.getName(m.sender)}\n`
        configText += `*Fecha:* ${new Date().toLocaleString()}\n\n`
        configText += `*Configuraciones restablecidas:*\n`
        configText += `• Welcome: ✅\n`
        configText += `• Detect: ✅\n`
        configText += `• Antilink: ❌\n`
        configText += `• Antibot: ❌\n`
        configText += `• Antifakes: ❌\n`
        configText += `• NSFW: ❌\n`
        configText += `• Autosticker: ❌\n`
        configText += `• Delete: ❌\n`
        configText += `• Reaction: ❌\n\n`
        configText += `_Todas las configuraciones han vuelto a los valores por defecto._`
        
        await conn.reply(m.chat, configText, m)
        
    } catch (e) {
        console.error('Error en resetconfig:', e)
        await conn.reply(m.chat, `❌ Error al restablecer configuración: ${e.message}`, m)
    }
}

handler.help = ['resetconfig']
handler.tags = ['admin']
handler.command = /^(resetconfig|restablecer|resetear)$/i
handler.admin = true
handler.group = true

export default handler
let handler = async (m, { conn, isOwner, isAdmin, isROwner }) => {
    if (!m.isGroup) return conn.reply(m.chat, '⚠️ *Este comando solo puede usarse en grupos*', m)
    
    if (!isAdmin && !isOwner && !isROwner) {
        return conn.reply(m.chat, '🚫 *Solo los administradores pueden usar este comando*', m)
    }

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

> Todas las configuraciones han sido restablecidas a sus valores por defecto`, m)
}

handler.help = ['resetconfig']
handler.tags = ['admin', 'config']
handler.command = ['resetconfig', 'restablecer', 'resetear']
handler.group = true
handler.admin = true
handler.register = true

export default handler
