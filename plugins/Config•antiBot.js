
import { areJidsSameUser } from '@whiskeysockets/baileys'

export async function before(m, { participants, conn }) {
    if (!m.isGroup) return
    
    let chat = global.db.data.chats[m.chat]
    if (!chat?.antiBot) return

    try {
        let botJid = global.conn.user.jid
        
        // No hacer nada si es el mismo bot
        if (areJidsSameUser(botJid, conn.user.jid)) return
        
        // Verificar si hay otro bot en el grupo
        let isBotPresent = participants.some(p => 
            p.id !== conn.user.jid && 
            (p.id.endsWith('@s.whatsapp.net') && p.id.includes('bot')) ||
            areJidsSameUser(botJid, p.id)
        )

        if (isBotPresent) {
            await conn.reply(m.chat, '🤖 *ANTI-BOT ACTIVADO*\n\nSe detectó otro bot en el grupo. Saliendo...', m)
            setTimeout(async () => {
                try {
                    await conn.groupLeave(m.chat)
                } catch (e) {
                    console.error('Error al salir del grupo:', e)
                }
            }, 3000)
        }
    } catch (e) {
        console.error('Error en antiBot:', e)
    }
}
