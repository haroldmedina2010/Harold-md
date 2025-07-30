import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  await m.react('❤️');

  let username = await conn.getName(m.sender);

  // Lista con único contacto
  let list = [
    {
      displayName: "𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 ოძ  𝘽 ꂦ Ꮏ Creator",
      vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:𓆩‌۫᷼ ִֶָღܾ݉͢𝐇ꪖ𝐫o͟𝐥𝐝𓆪 MD\nTEL;type=CELL;waid=50764735869:+507 6473-5869\nEND:VCARD`
    }
  ];

  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: `${list.length} Contacto`,
      contacts: list
    },
    contextInfo: {
      externalAdReply: {
        title: '🧡 Contacto oficial de 𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 ოძ  𝘽 ꂦ Ꮏ',
        body: 'Creador y soporte técnico',
        thumbnailUrl: 'https://d.uguu.se/wrCvoNjp.jpg',
        sourceUrl: 'https://whatsapp.com/channel/0029Vb6MFShKGGGBWePRFc0U',
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });

  // Mensaje decorado personalizado
  let txt = `🧡ＡＱＵＩ́  ɛֆȶǟ́ ꒒ꂦꑄ 𝘿𝘼𝙏𝙊𝙎 ∂є ᴍɪ ᑕᖇᗴᗩᗪOᖇ🏐  
> Ⴆყ 𓆩‌۫᷼ ִֶָღܾ݉͢𝐇ꪖ𝐫o͟𝐥𝐝𓆪 𝐌𝐃

🧡ᏞᏆΝᏦ𝐒🔗🪀

🧡𝐓𝐈𝐊 𝐓𝐎𝐊📹: https://www.tiktok.com/@haroldmedina2010?_t=ZS-8yRh35CjBC6&_r=1

🪀😍𝐂𝐀𝐍𝐀𝐋 𝐃𝐄Ꮮ🏐 𝙱𝙾𝚃🧡: https://whatsapp.com/channel/0029Vb6MFShKGGGBWePRFc0U

🧡NÚMERO ÐÈ ᘻᓰ ᑕᖇᗴᗩᗪᓍᖇ: +507 6473-5869 ☟
https://WA.me/50764735869?text=

🏐#️⃣𐒐Ꮼ́𐒄ᏋᏒ𐒀 DEL 𝗕𝗢𝗧🤖🧡:
https://WA.me/50764735869?text=.code`;

  await conn.sendMessage(m.chat, { text: txt }, { quoted: m });
};

handler.help = ['owner', 'creador'];
handler.tags = ['info'];
handler.command = /^(owner|creator|creador|dueño)$/i;

export default handler;
