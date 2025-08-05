
let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
    const sections = [
        {
            title: "🔰 OPCIONES DISPONIBLES",
            rows: [
                { title: "• Welcome", description: "Activa/desactiva mensajes de bienvenida", rowId: `${usedPrefix + command} welcome` },
                { title: "• Antilink", description: "Activa/desactiva antienlaces", rowId: `${usedPrefix + command} antilink` },
                { title: "• Antibot", description: "Activa/desactiva anti-bots", rowId: `${usedPrefix + command} antibot` },
                { title: "• Antifake", description: "Activa/desactiva anti números falsos", rowId: `${usedPrefix + command} antifake` },
                { title: "• Detect", description: "Activa/desactiva detección de cambios", rowId: `${usedPrefix + command} detect` },
                { title: "• NSFW", description: "Activa/desactiva contenido +18", rowId: `${usedPrefix + command} nsfw` },
                { title: "• Autosticker", description: "Convierte imágenes en stickers automáticamente", rowId: `${usedPrefix + command} autosticker` }
            ]
        }
    ]

    const listMessage = {
        text: "⚙️ *CONFIGURACIONES DEL BOT*\n\nSelecciona una opción para activar/desactivar:",
        footer: global.wm,
        title: "CONFIGURACIÓN",
        buttonText: "Ver opciones",
        sections
    }

    if (!args[0]) {
        return await conn.sendMessage(m.chat, listMessage, { quoted: m })
    }

    let isEnable = /true|enable|(turn)?on|1/i.test(command)
    let chat = global.db.data.chats[m.chat]
    let user = global.db.data.users[m.sender]
    let bot = global.db.data.settings[conn.user.jid] || {}
    let type = (args[0] || '').toLowerCase()
    let isAll = false
    let isUser = false

    switch (type) {
        case 'welcome':
        case 'bienvenida':
            if (!m.isGroup) {
                if (!isOwner) {
                    global.dfail('group', m, conn)
                    throw false
                }
            } else if (!isAdmin) {
                global.dfail('admin', m, conn)
                throw false
            }
            chat.welcome = isEnable
            break

        case 'detect':
        case 'avisos':
            if (!m.isGroup) {
                if (!isOwner) {
                    global.dfail('group', m, conn)
                    throw false
                }
            } else if (!isAdmin) {
                global.dfail('admin', m, conn)
                throw false
            }
            chat.detect = isEnable
            break

        case 'antibot':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.antiBot = isEnable
            break

        case 'antilink':
        case 'antienlace':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.antiLink = isEnable
            break

        case 'antilink2':
        case 'antienlace2':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.antiLink2 = isEnable
            break

        case 'antifake':
        case 'antifalsos':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.antifake = isEnable
            break

        case 'nsfw':
        case 'modohorny':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.nsfw = isEnable
            break

        case 'autosticker':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.autosticker = isEnable
            break

        case 'reaction':
        case 'reaccion':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.reaction = isEnable
            break

        case 'delete':
        case 'antidelete':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.delete = isEnable
            break

        case 'public':
        case 'publico':
            isAll = true
            if (!isROwner) {
                global.dfail('rowner', m, conn)
                throw false
            }
            global.opts['self'] = !isEnable
            break

        case 'autolevelup':
        case 'autonivel':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.autolevelup = isEnable
            break

        default:
            if (!/[01]/.test(command)) {
                return await conn.sendMessage(m.chat, listMessage, { quoted: m })
            }
            throw false
    }

    conn.reply(
        m.chat,
        `🩵 *La función ${type} fue ${isEnable ? 'activada' : 'desactivada'} ${isAll ? 'para este Bot' : isUser ? '' : 'para este Chat'}*`,
        m
    )
}

handler.help = ['enable', 'disable']
handler.tags = ['nable', 'owner']
handler.command = ['enable', 'disable', 'on', 'off', '1', '0']

export default handler
