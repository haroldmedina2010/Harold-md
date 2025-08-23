import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  await m.react('👹');

  let username = await conn.getName(m.sender);

  // Lista con único contacto
  let list = [
    {
      displayName: "𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 ოძ  𝘽 ꂦ Ꮏ Creator",
      vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:𓆩‌۫᷼ ִֶָღܾ݉͢𝐇ꪖ𝐫o͟𝐥𝐝𓆪 MD\nTEL;type=CELL;waid=573171514640:+57 317 1514640\nEND:VCARD`
    }
  ];

  const canalInfo = {
    title: 'Ver canal oficial 🧡',
    body: 'Haz clic para acceder al canal del bot',
    thumbnailUrl: 'https://files.catbox.moe/26kguo.jpg',
    sourceUrl: 'https://whatsapp.com/channel/0029VbAXuUtB4hdYWC6m2R1h',
    mediaType: 1,
    renderLargerThumbnail: true
  };

  // Enviar contacto con preview
  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: `${list.length} Contacto`,
      contacts: list
    },
    contextInfo: {
      externalAdReply: canalInfo
    }
  }, { quoted: m });

  // Mensaje decorado personalizado
  let txt = `🧡ＡＱＵ（́  ɛֆȶǟ́ ꒒ꂦꑄ 𝘿𝘼𝙏𝙊𝙎 ∂є ᴍɪ ᑕᖇᗴᗩᗪOᖇ🏐  
> Ⴆყ 𓆩‌۫᷼ ִֶָღܾ݉͢𝐇ꪖ𝐫o͟𝐥𝐝𓆪 𝐌𝐃

🧡ᏞᏆΝᏦ𝐒🔗🪀

🧡𝐓𝐈𝐊 𝐓𝐎𝐊📹: https://www.tiktok.com/@haroldmedina2010?_t=ZS-8yRh35CjBC6&_r=1

🪀😍𝐂𝐀𝐍𝐀𝐋 𝐃𝐄Ꮮ🏐 𝙱𝙾𝚃🧡: https://whatsapp.com/channel/0029VbAXuUtB4hdYWC6m2R1h

🧡NÚMERO ÐÈ ᘻᓰ ᑕᖇᗴᗩᗪᓍᖇ: +57 317 1514640 ☟
https://WA.me/573189035921?text=

🏐#️⃣𐒐Ꮼ́𐒄ᏋᏒ𐒀 DEL 𝗕𝗢𝗧🤖🧡:
https://WA.me/573189035921?text=.code`;

  // Enviar mensaje decorado con preview al final
  await conn.sendMessage(m.chat, {
    text: txt,
    contextInfo: {
      externalAdReply: canalInfo
    }
  }, { quoted: m });
};

handler.help = ['owner', 'creador'];
handler.tags = ['info'];
handler.command = /^(owner|creator|creador|dueño)$/i;

export default handler;
