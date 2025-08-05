
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
