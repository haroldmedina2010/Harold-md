
let handler = async (m, { conn, isAdmin, isOwner }) => {
    if (!m.isGroup && !isOwner) return conn.reply(m.chat, '❌ Este comando solo funciona en grupos.', m)
    
    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[conn.user.jid] || {}
    
    if (!chat) {
        return conn.reply(m.chat, '❌ No hay configuración guardada para este chat.', m)
    }
    
    try {
        let configText = `⚙️ *CONFIGURACIÓN ACTUAL*\n\n`
        configText += `*Grupo:* ${await conn.getName(m.chat)}\n`
        configText += `*Estado:* ${chat.isBanned ? '🚫 Baneado' : '✅ Activo'}\n\n`
        
        configText += `*🛡️ PROTECCIONES:*\n`
        configText += `• Welcome: ${chat.welcome ? '✅' : '❌'}\n`
        configText += `• Detect: ${chat.detect ? '✅' : '❌'}\n`
        configText += `• Antilink: ${chat.antiLink ? '✅' : '❌'}\n`
        configText += `• Antilink2: ${chat.antiLink2 ? '✅' : '❌'}\n`
        configText += `• Antibot: ${chat.antiBot ? '✅' : '❌'}\n`
        configText += `• Antifake: ${chat.antifake ? '✅' : '❌'}\n`
        configText += `• Delete: ${chat.delete ? '✅' : '❌'}\n\n`
        
        configText += `*🎮 FUNCIONES:*\n`
        configText += `• NSFW: ${chat.nsfw ? '✅' : '❌'}\n`
        configText += `• Autosticker: ${chat.autosticker ? '✅' : '❌'}\n`
        configText += `• Reaction: ${chat.reaction ? '✅' : '❌'}\n`
        configText += `• Autolevelup: ${chat.autolevelup ? '✅' : '❌'}\n`
        configText += `• Autoresponder: ${chat.autoresponder ? '✅' : '❌'}\n\n`
        
        configText += `*🤖 BOT GLOBAL:*\n`
        configText += `• Modo: ${bot.self ? 'Privado' : 'Público'}\n`
        configText += `• Autoread: ${bot.autoread ? '✅' : '❌'}\n`
        configText += `• Restrict: ${bot.restrict ? '✅' : '❌'}\n\n`
        
        if (chat.isBanned && chat.banReason) {
            configText += `*🚫 Razón del baneo:* ${chat.banReason}\n\n`
        }
        
        configText += `_Use .resetconfig para restablecer todo_`
        
        await conn.reply(m.chat, configText, m)
        
    } catch (e) {
        console.error('Error en checkconfig:', e)
        await conn.reply(m.chat, `❌ Error al verificar configuración: ${e.message}`, m)
    }
}

handler.help = ['checkconfig', 'config']
handler.tags = ['admin']
handler.command = /^(checkconfig|config|configuracion)$/i
handler.group = true

export default handler
