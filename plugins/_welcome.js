import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

const channelRD = {
  id: "120363419817597119@newsletter", // Cambia por tu canal si quieres
  name: "✞😍📹𝗩𝗜𝗗𝗘𝗢 𝗗𝗘 𝗧𝗜𝗞𝗧𝗢𝗞📹😍✞ 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 ⬣"
};

export async function before(m, { conn, participants, groupMetadata }) {
  if (
    !m.messageStubType ||
    !m.isGroup ||
    !m.messageStubParameters?.[0] ||
    !global.db.data.chats[m.chat]?.welcome
  ) return !0

  const jid = m.messageStubParameters[0]
  const user = `@${jid.split('@')[0]}`
  const thumbnailUrl = 'https://qu.ax/CNDhl.jpg'
  const pp = await conn.profilePictureUrl(jid, 'image').catch(() => thumbnailUrl)
  const img = await fetch(pp).then(r => r.buffer())
  const total = [28, 32].includes(m.messageStubType)
    ? participants.length - 1
    : participants.length + 1

  // Contexto newsletter/canal
  const contextNewsletter = {
    isForwarded: true,
    forwardingScore: 999,
    forwardedNewsletterMessageInfo: {
      newsletterJid: channelRD.id,
      newsletterName: channelRD.name,
      serverMessageId: -1
    },
    externalAdReply: {
      title: channelRD.name,
      body: '⁖ฺ۟̇࣪·֗٬̤⃟ 𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 ოძ  𝘽 ꂦ Ꮏ',
      thumbnailUrl: thumbnailUrl,
      mediaType: 1,
      renderLargerThumbnail: false,
      sourceUrl: `https://whatsapp.com/channel/${channelRD.id.replace('@newsletter', '')}`
    }
  };

  // Mensaje citado para bienvenida/despedida
  const quotedMsg = (txt) => ({
    key: { fromMe: false, participant: "0@s.whatsapp.net", remoteJid: m.chat, id: Math.random().toString(36).slice(2) },
    message: { conversation: txt }
  });

  if (m.messageStubType == 27) {
    const bienvenida = `
🎉 ¡Bienvenido/a ${user} al grupo ${groupMetadata.subject}! 🎉

Estamos súper emocionados de tenerte aquí con nosotros. 🎈✨ Prepárate para compartir risas, aprender y disfrutar de grandes momentos juntos. 💥💖

No dudes en presentarte y contarnos un poco sobre ti. ¡Vamos a hacer que esto sea increíble! 🚀😄

¡Bienvenido/a ${user} a la familia! que ahora somos ${total} Miembros🥳🎊
`
    // Mensaje de bienvenida como newsletter
    await conn.sendMessage(m.chat, { 
      image: img, 
      caption: bienvenida, 
      contextInfo: contextNewsletter 
    });
    // Mensaje adicional, respondiendo a 《✧》 LLEGO OTRO
    await conn.sendMessage(m.chat, { 
      text: 'Hola Bienvenid@.', 
      contextInfo: contextNewsletter
    }, { quoted: quotedMsg('𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 ოძ  𝘽 ꂦ Ꮏ') });
  }

  if ([28, 32].includes(m.messageStubType)) {
    const despedida = `
╭─⬣「 ✰👋🏽ADIOS😓✰ 」⬣
┃
┃💥 Usuario: ${user}
┃🔥 Grupo: ${groupMetadata.subject}
┃🧡 Miembros: ${total}
┃👋😢  has dejado el grupo...
┃¡Te vamos a extrañar! 🥺💔
┃Gracias por compartir con nosotros 🙌
┃¡Éxitos en todo lo que venga! 🍀✨
┃¡Las puertas quedan abiertas por si decides volver! 🚪💬
┃ATT:𓆩‌۫᷼ ִֶָღܾ݉͢𝐇ꪖ𝐫o͟𝐥𝐝𓆪
┃⌬ Espero y vuelvas después.
╚━━━━━━━━━━━━━━━╝
`
    // Mensaje de despedida como newsletter
    await conn.sendMessage(m.chat, { 
      image: img, 
      caption: despedida, 
      contextInfo: contextNewsletter 
    });
    // Segundo mensaje, respondiendo a 《✧》 SE FUE
    await conn.sendMessage(m.chat, { 
      text: '', 
      contextInfo: contextNewsletter
    }, { quoted: quotedMsg('adios') });
  }
}
