import fetch from 'node-fetch'

let handler = async (m, { conn }) => {

  const namegrupo = 'Grupo Oficial'
  const gp1 = 'https://chat.whatsapp.com/JkpwB3J7qMQF1uxomv5U1e?mode=ac_tr' // ← tu link real

  const namechannel = 'Canal de la Bot'
  const channel = 'https://whatsapp.com/channel/0029Vb6MFShKGGGBWePRFc0U' // ← tu canal real

  const dev = '💎 Creador: harold y yo soy yo'
  const catalogo = 'https://files.catbox.moe/1jdv8y.jpg' // o './media/grupos.jpg'
  const emojis = '👨‍💻'

  let grupos = `
╭─⟪ *💎GRUPOS OFICIALES * 
│
│ 🩵 *${namegrupo}*
│ ${gp1}
│
│ 🩵 *${namechannel}*
│ ${channel}
╰─────────────────╯
`

  await conn.sendFile(m.chat, catalogo, 'grupos.jpg', grupos.trim(), m)
  await m.react(emojis)
}

handler.help = ['grupos']
handler.tags = ['info']
handler.command = ['grupos', 'links', 'groups']

export default handler
