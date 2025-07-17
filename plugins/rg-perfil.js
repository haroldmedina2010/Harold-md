//código creado x HAROLD MEDINA 
//porfavor deja los créditos 

import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'

const imagen1 = 'https://files.catbox.moe/62sdil.jpg' // Imagen de respaldo

var handler = async (m, { conn }) => {
  let who = m.mentionedJid && m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.fromMe
    ? conn.user.jid
    : m.sender

  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => imagen1)
  let user = global.db.data.users[m.sender]

  if (!user) {
    user = global.db.data.users[m.sender] = {
      premium: false,
      level: 0,
      cookies: 0,
      exp: 0,
      lastclaim: 0,
      registered: false,
      regTime: -1,
      age: 0,
      role: '⭑ Novato ⭑'
    }
  }

  let { premium, level, exp, registered, role } = user
  let username = await conn.getName(who)

  // 🧡 Animación de carga jjj
  let animacion = `
〘 CARGANDO PERFIL 〙

• La carga demora un poco.
• Porfavor espera...

👤 Perfil reconocido con exito.

*Enviando tu perfil...*
`.trim()

  await m.reply(animacion)

  // 🧡 Usuarios normales
  let noprem = `
『 PERFIL DEL USUARIO 』

🧡 *usuario:* ${username}
🧡 *tag:* @${who.replace(/@.+/, '')}
🧡 *Registrado:* ${registered ? '✅ Activado' : '❌ No'}

╭━━━━━━━━━━━━━╮
┃😍 *Nivel:* ${level}
┃💎 *Experiencia:* ${exp}
┃💎 *Rango:* ${role}
╰━━━━━━━━━━━━━
> © Desarrollado por 𓆩‌۫᷼ ִֶָღܾ݉͢𝐇ꪖ𝐫o͟𝐥𝐝𓆪
`.trim()

  // 🔥 Usuarios Premium
  let prem = `
🧡〘 𝐔𝐒𝐔𝐀𝐑𝐈𝐎 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 〙🧡

ERES RECONOCIDO EN SHOYO』

🧡 *Usuario:* ${username}
🧡 *tag:* @${who.replace(/@.+/, '')}
🧡 *Registrado:* ${registered ? '✅' : '❌'}

╭━━━━━━━━━━━━━╮
┃💎 *Nivel:* ${level}
┃💎 *Experiencia:* ${exp}
┃💎 *Rango:* ${role}
╰━━━━━━━━━━━━━
> © powered by 𓆩‌۫᷼ ִֶָღܾ݉͢𝐇ꪖ𝐫o͟𝐥𝐝𓆪 
`.trim()

  await conn.sendFile(m.chat, pp, 'ponte_una_foto_gay', premium ? prem : noprem, m, undefined, { mentions: [who] })
}

handler.help = ['profile']
handler.register = true
handler.group = true
handler.tags = ['rg']
handler.command = ['profile', 'perfil']
export default handler
