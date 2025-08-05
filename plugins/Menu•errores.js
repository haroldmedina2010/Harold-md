
let handler = async (m, { conn, usedPrefix, isOwner, isAdmin }) => {
    if (!isAdmin && !isOwner) {
        return conn.reply(m.chat, '🚫 *Solo los administradores pueden usar este comando*', m)
    }

    let menuText = `
╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 🔧 *MENÚ DE DIAGNÓSTICO Y ADMINISTRACIÓN* ┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯

🤖 *Bot:* 𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 ოძ 𝘽 ꂦ Ꮏ

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ 🔍 *COMANDOS DE DIAGNÓSTICO*
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ 🩺 ${usedPrefix}checkerrors
┃ ┗ ⌬ Revisa errores del sistema
┃
┃ 🩺 ${usedPrefix}diagnostico
┃ ┗ ⌬ Diagnóstico completo del bot
┃
┃ 🔧 ${usedPrefix}autofix
┃ ┗ ⌬ Repara automáticamente errores
┃
┃ 🔧 ${usedPrefix}reparar
┃ ┗ ⌬ Arregla problemas detectados
┃
┃ ⚙️ ${usedPrefix}systemcheck
┃ ┗ ⌬ Verifica estado del sistema
┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ 🔄 *COMANDOS DE CONFIGURACIÓN*
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ ⚙️ ${usedPrefix}resetconfig
┃ ┗ ⌬ Restablece configuración del grupo
┃
┃ 👤 ${usedPrefix}resetuser
┃ ┗ ⌬ Resetea datos de usuario
┃
┃ 🎭 ${usedPrefix}resetpersonajes
┃ ┗ ⌬ Reinicia sistema de personajes
┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ 🚫 *COMANDOS DE MODERACIÓN*
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ 🔇 ${usedPrefix}banchat
┃ ┗ ⌬ Banea el chat actual
┃
┃ 🔊 ${usedPrefix}unbanchat
┃ ┗ ⌬ Desbanea el chat actual
┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 *NOTAS:*
• Estos comandos solo pueden ser usados por administradores
• Algunos comandos requieren permisos de propietario
• Usa .checkerrors para ver el estado actual del bot
• Usa .autofix para intentar reparar errores automáticamente

🆔 *Comando base:* ${usedPrefix}menuerrores
📅 *Fecha:* ${new Date().toLocaleDateString()}
⏰ *Hora:* ${new Date().toLocaleTimeString()}
`

    await conn.reply(m.chat, menuText, m)
}

handler.help = ['menuerrores', 'menudiagnostico']
handler.tags = ['admin', 'menu']
handler.command = ['menuerrores', 'menudiagnostico', 'menurepar', 'menuadmin']
handler.admin = true
handler.register = true

export default handler
