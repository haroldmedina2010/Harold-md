import db from '../lib/database.js'

let handler = m => m
handler.before = async function (m, {conn, isAdmin, isBotAdmin}) {
    if (!m.isGroup) return !1

    let chat = global.db.data.chats[m.chat]
    if (!isBotAdmin || !chat?.antifake) return !1

    try {
        // Lista de códigos de país a bloquear
        const blockedCountries = ['6', '90', '212', '92', '93', '94', '7', '49', '2', '91', '48']

        for (let country of blockedCountries) {
            if (m.sender.startsWith(country)) {
                global.db.data.users[m.sender].block = true

                await conn.reply(m.chat, `🚫 *ANTI-FAKE ACTIVADO*\n\nUsuario con código +${country} ha sido eliminado.`, m)
                await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
                break
            }
        }
    } catch (e) {
        console.error('Error en antifakes:', e)
    }

    return !0
}

export default handler