
const handler = async (m, { conn, isAdmin, groupMetadata }) => {
    if (isAdmin) return m.reply('🔥 *Ya eres administrador.*')
    
    try {
        await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote')
        await m.react('✅')
        m.reply('✅ *Listo, ahora eres administrador.*\n\n*Bot:* 𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 ოძ 𝘽 ꂦ Ꮏ')
        
        let nn = conn.getName(m.sender)
        conn.reply('18293142989@s.whatsapp.net', `🔥 *${nn}* se dio Auto Admin en:\n${groupMetadata.subject}.`, m)
    } catch (e) {
        console.error('Error en autoadmin:', e)
        m.reply('💥 Ocurrió un error.')
    }
}

handler.tags = ['owner']
handler.help = ['autoadmin']
handler.command = ['autoadmin']
handler.rowner = true
handler.group = true
handler.botAdmin = true

export default handler
