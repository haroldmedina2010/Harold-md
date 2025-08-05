
let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
    let isEnable = /true|enable|(turn)?on|1/i.test(command)
    let chat = global.db.data.chats[m.chat]
    let user = global.db.data.users[m.sender]
    let bot = global.db.data.settings[conn.user.jid] || {}
    let type = (args[0] || '').toLowerCase()
    let isAll = false
    let isUser = false

    let listMessage = `
╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃ ⚙️ *CONFIGURACIONES DEL BOT* ⚙️           ┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯

🤖 *Bot:* 𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 ოძ 𝘽 ꂦ Ꮏ

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ 📋 *CONFIGURACIONES DISPONIBLES*
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ 👋 ${usedPrefix}enable welcome
┃ ┗ ⌬ Activar/desactivar bienvenidas
┃
┃ 🔍 ${usedPrefix}enable detect
┃ ┗ ⌬ Activar/desactivar detección de cambios
┃
┃ 🤖 ${usedPrefix}enable antibot
┃ ┗ ⌬ Activar/desactivar antibot
┃
┃ 🔗 ${usedPrefix}enable antilink
┃ ┗ ⌬ Activar/desactivar antilink
┃
┃ 👤 ${usedPrefix}enable antifake
┃ ┗ ⌬ Activar/desactivar antifake
┃
┃ 🔞 ${usedPrefix}enable nsfw
┃ ┗ ⌬ Activar/desactivar contenido NSFW
┃
┃ 🎭 ${usedPrefix}enable autosticker
┃ ┗ ⌬ Activar/desactivar autosticker
┃
┃ 💬 ${usedPrefix}enable autoresponder
┃ ┗ ⌬ Activar/desactivar autoresponder
┃
┃ 🗑️ ${usedPrefix}enable delete
┃ ┗ ⌬ Activar/desactivar antidelete
┃
┃ 👑 ${usedPrefix}enable modoadmin
┃ ┗ ⌬ Activar/desactivar modo admin
┃
┃ 📈 ${usedPrefix}enable autolevelup
┃ ┗ ⌬ Activar/desactivar auto levelup
┃
┃ 😄 ${usedPrefix}enable reaction
┃ ┗ ⌬ Activar/desactivar reacciones
┃
┃ 🌐 ${usedPrefix}enable public
┃ ┗ ⌬ Activar/desactivar modo público
┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 *Uso:* ${usedPrefix}enable/disable [opción]
🔧 *Ejemplo:* ${usedPrefix}enable welcome
`

    if (!args[0]) {
        return await conn.sendMessage(m.chat, { text: listMessage }, { quoted: m })
    }

    switch (type) {
        case 'welcome':
        case 'bienvenida':
            if (!m.isGroup) {
                if (!isOwner) {
                    return conn.reply(m.chat, '🚫 *Solo se puede usar en grupos*', m)
                }
            } else if (!isAdmin) {
                return conn.reply(m.chat, '🚫 *Solo los administradores pueden usar este comando*', m)
            }
            chat.welcome = isEnable
            break

        case 'detect':
        case 'avisos':
            if (!m.isGroup) {
                if (!isOwner) {
                    return conn.reply(m.chat, '🚫 *Solo se puede usar en grupos*', m)
                }
            } else if (!isAdmin) {
                return conn.reply(m.chat, '🚫 *Solo los administradores pueden usar este comando*', m)
            }
            chat.detect = isEnable
            break

        case 'antibot':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    return conn.reply(m.chat, '🚫 *Solo los administradores pueden usar este comando*', m)
                }
            }
            chat.antiBot = isEnable
            break

        case 'antilink':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    return conn.reply(m.chat, '🚫 *Solo los administradores pueden usar este comando*', m)
                }
            }
            chat.antiLink = isEnable
            break

        case 'antifake':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    return conn.reply(m.chat, '🚫 *Solo los administradores pueden usar este comando*', m)
                }
            }
            chat.antifake = isEnable
            break

        case 'nsfw':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    return conn.reply(m.chat, '🚫 *Solo los administradores pueden usar este comando*', m)
                }
            }
            chat.nsfw = isEnable
            break

        case 'autosticker':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    return conn.reply(m.chat, '🚫 *Solo los administradores pueden usar este comando*', m)
                }
            }
            chat.autosticker = isEnable
            break

        case 'autoresponder':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    return conn.reply(m.chat, '🚫 *Solo los administradores pueden usar este comando*', m)
                }
            }
            chat.autoresponder = isEnable
            break

        case 'modoadmin':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    return conn.reply(m.chat, '🚫 *Solo los administradores pueden usar este comando*', m)
                }
            }
            chat.modoadmin = isEnable
            break

        case 'reaction':
        case 'reaccion':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    return conn.reply(m.chat, '🚫 *Solo los administradores pueden usar este comando*', m)
                }
            }
            chat.reaction = isEnable
            break

        case 'delete':
        case 'antidelete':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    return conn.reply(m.chat, '🚫 *Solo los administradores pueden usar este comando*', m)
                }
            }
            chat.delete = isEnable
            break

        case 'public':
        case 'publico':
            isAll = true
            if (!isROwner) {
                return conn.reply(m.chat, '🚫 *Solo el propietario puede usar este comando*', m)
            }
            global.opts['self'] = !isEnable
            break

        case 'autolevelup':
        case 'autonivel':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    return conn.reply(m.chat, '🚫 *Solo los administradores pueden usar este comando*', m)
                }
            }
            chat.autolevelup = isEnable
            break

        default:
            if (!/[01]/.test(command)) {
                return await conn.sendMessage(m.chat, { text: listMessage }, { quoted: m })
            }
            throw false
    }

    conn.reply(
        m.chat,
        `✅ *La función ${type} fue ${isEnable ? 'activada' : 'desactivada'} ${isAll ? 'para este Bot' : isUser ? '' : 'para este chat'}*\n\n*Bot:* 𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 ოძ 𝘽 ꂦ Ꮏ`,
        m
    )
}

handler.help = ['enable', 'disable']
handler.tags = ['group', 'owner']
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i

export default handler
