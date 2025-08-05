
let linkRegex = /(https?:\/\/(?:www\.)?(?:t\.me|telegram\.me|whatsapp\.com)\/\S+)|(https?:\/\/chat\.whatsapp\.com\/\S+)|(https?:\/\/whatsapp\.com\/channel\/\S+)/i

export async function before(m, { isAdmin, isBotAdmin, conn }) {
    if (m.isBaileys && m.fromMe) return !0
    if (!m.isGroup) return !1

    let chat = global.db.data.chats[m.chat]
    let settings = global.db.data.settings[this.user.jid] || {}
    
    if (!chat?.antiLink || !m.text) return !0

    let isGroupLink = linkRegex.exec(m.text)
    if (!isGroupLink) return !0

    try {
        // Si es admin, solo advertir
        if (isAdmin) {
            return conn.reply(m.chat, `⚠️ *Enlace detectado*\n\n*Admin:* ${await conn.getName(m.sender)}\n*Mensaje:* Eres admin, serás perdonado.`, m)
        }

        // Si el bot no es admin
        if (!isBotAdmin) {
            return conn.reply(m.chat, `🔥 *ANTILINK ACTIVADO*\n\nNo puedo eliminar el mensaje porque no soy admin del grupo.`, m)
        }

        // Evita expulsar por link del mismo grupo
        const thisGroupLink = `https://chat.whatsapp.com/${await conn.groupInviteCode(m.chat)}`
        if (m.text.includes(thisGroupLink)) return !0

        // Acción anti-link
        await conn.reply(m.chat, `🚫 *ANTILINK ACTIVADO*\n\n*Usuario:* ${await conn.getName(m.sender)}\n*Acción:* Enlace detectado y eliminado.\n\n_El usuario será expulsado..._`, m)

        if (settings.restrict !== false) {
            // Borra el mensaje
            await conn.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant,
                },
            })

            // Expulsa al usuario
            setTimeout(async () => {
                try {
                    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
                } catch (e) {
                    console.error('Error al expulsar usuario:', e)
                    return conn.reply(m.chat, `❌ *Error al expulsar usuario:* ${e.message}`, m)
                }
            }, 1000)
        } else {
            return conn.reply(m.chat, `⚠️ *Restricción desactivada*\n\nEl creador ha desactivado las expulsiones automáticas.`, m)
        }
    } catch (e) {
        console.error('Error en antilink:', e)
        return conn.reply(m.chat, `❌ *Error en antilink:* ${e.message}`, m)
    }

    return !0
}
