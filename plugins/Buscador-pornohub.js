
let handler = async (m, { conn, args, command, usedPrefix }) => {
   if (!db.data.chats[m.chat].nsfw && m.isGroup) {
    return m.reply('[❗] 𝐋𝐨𝐬 𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬 +𝟏𝟖 𝐞𝐬𝐭𝐚́𝐧 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐨𝐬 𝐞𝐧 𝐞𝐬𝐭𝐞 𝐠𝐫𝐮𝐩𝐨.\n> 𝐬𝐢 𝐞𝐬 𝐚𝐝𝐦𝐢𝐧 𝐲 𝐝𝐞𝐬𝐞𝐚 𝐚𝐜𝐭𝐢𝐯𝐚𝐫𝐥𝐨𝐬 𝐮𝐬𝐞 .enable nsfw');
    }

  if (!args[0]) {
    return conn.reply(m.chat, `🍭 Por favor, ingresé la búsqueda que desea realizar en Pornhub.\nEjemplo: ${usedPrefix + command} con mi prima\n\n*Bot:* 𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 ოძ 𝘽 ꂦ Ꮏ`, m);
  }

  try {
    let searchResults = await searchPornhub(args[0]);
    let teks = searchResults.result.map((v, i) => 
      `『 *P O R N H U B  - S E A R C H* 』
🎞️ *Título:* ${v.title}
🕒 *Duración:* ${v.duration}
👀 *Vistas:* ${v.views}
🔗 *Link:* ${v.url}
---------------------------------------------------\n`).join('\n\n');

    if (searchResults.result.length === 0) {
      teks = '🍭 No se encontraron resultados...';
    }

    conn.reply(m.chat, teks, m);
  } catch (e) {
    return conn.reply(m.chat, `⚠️ Ocurrió un error: ${e.message}`, m);
  }
};

handler.tags = ['buscador']; 
handler.help = ['pornhubsearch']; 
handler.command = ['phsearch', 'pornhubsearch'];

export default handler
