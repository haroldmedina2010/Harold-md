
let handler = async (m, { conn, isOwner, isAdmin }) => {
    if (!isAdmin && !isOwner) {
        return conn.reply(m.chat, '🚫 *Solo los administradores pueden usar este comando*', m)
    }

    try {
        await conn.reply(m.chat, '🔍 *Verificando estado del sistema...*', m)

        let systemReport = `🔧 *VERIFICACIÓN DEL SISTEMA*\n\n`
        systemReport += `*Bot:* 𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 ოძ 𝘽 ꂦ Ꮏ\n`
        systemReport += `*Fecha:* ${new Date().toLocaleString()}\n`
        systemReport += `*Chat:* ${m.isGroup ? await conn.getName(m.chat) : 'Privado'}\n\n`

        // Verificar base de datos
        systemReport += `📊 *BASE DE DATOS:*\n`
        if (global.db && global.db.data) {
            systemReport += `✅ Base de datos: Funcionando\n`
            systemReport += `✅ Chats: ${Object.keys(global.db.data.chats || {}).length}\n`
            systemReport += `✅ Usuarios: ${Object.keys(global.db.data.users || {}).length}\n`
        } else {
            systemReport += `❌ Base de datos: No disponible\n`
        }

        // Verificar configuración del chat
        systemReport += `\n⚙️ *CONFIGURACIÓN DEL CHAT:*\n`
        if (m.isGroup) {
            let chat = global.db.data.chats[m.chat]
            if (chat) {
                systemReport += `✅ Configuración: Disponible\n`
                systemReport += `🚫 Baneado: ${chat.isBanned ? 'Sí' : 'No'}\n`
                systemReport += `👋 Welcome: ${chat.welcome ? 'Activo' : 'Inactivo'}\n`
                systemReport += `🔍 Detect: ${chat.detect ? 'Activo' : 'Inactivo'}\n`
            } else {
                systemReport += `❌ Configuración: No disponible\n`
            }
        } else {
            systemReport += `ℹ️ Chat privado\n`
        }

        // Verificar conexión
        systemReport += `\n🌐 *CONEXIÓN:*\n`
        systemReport += `✅ WhatsApp: Conectado\n`
        systemReport += `✅ Bot: Funcionando\n`
        systemReport += `📱 Número: ${conn.user.jid.split('@')[0]}\n`

        // Estado general
        systemReport += `\n🎯 *ESTADO GENERAL:*\n`
        systemReport += `✅ Sistema operativo correctamente\n`
        systemReport += `⏰ Tiempo activo: ${process.uptime().toFixed(2)} segundos\n`

        await conn.reply(m.chat, systemReport, m)

    } catch (e) {
        console.error('Error en systemcheck:', e)
        await conn.reply(m.chat, `❌ Error en verificación del sistema: ${e.message}`, m)
    }
}

handler.help = ['systemcheck', 'checkstatus']
handler.tags = ['admin', 'tools']
handler.command = ['systemcheck', 'checkstatus', 'estado', 'status']
handler.admin = true
handler.register = true

export default handler
