//* Código Creado por HAROLD*
//*No quites Los Créditos*

const handler = async (m, { isOwner, isAdmin, conn, participants, args, usedPrefix }) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    return;
  }

  const pesan = args.join(' ');
  const invocador = m.pushName || 'Administrador';
  const pp = 'https://files.catbox.moe/62sdil.jpg'; // Foto personalizada

  let teks = `╭───────𓆩🧡𓆪───────╮
┃    🦁 *Llamado deportivo Global* 🧡
┃       𝒃𝒚 𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼🏐🧡
╰───────𓆩🧡𓆪───────╯

😍 ¡Sumérgete en la mención ᘻᗩ́S  del ⍴ᥲr𝗍іძ᥆! 🧡

🧡 *✉️ Mensaje lanzado desde la cancha🥹🏐:*  
➥ 💌 ${pesan ? pesan : '*Mensaje vacío... ¡envíame uno con amor como hacer un punto🏐😍~!* 🧡'}

*🪀 👥 Número de jugadores  en la cancha de voleibol 🏐🧡:*  
➥ ${participants.length} 𝖎𝖓𝖙𝖊𝖌𝖗𝖆𝖓𝖙𝖊𝖘 𝑒𝑛 ႱᎯ ᴄᴀɴᴄʜᴀ😍🧡

🧡🏐🧡🏐🧡🏐🧡🏐🧡🏐🧡🏐🧡`;
  
  for (const mem of participants) {
    teks += `\n➳ 🧡 @${mem.id.split('@')[0]}`;
  }

  teks += `

🏐🏐🏐🏐🏐🏐🏐🏐🏐🏐🏐🏐
╭──────────✦──────────╮
┃ 🧡 ƈօʍǟռɖօ: invocar/tagall
┃ 🚀𝖾𝗇𝗏𝗂𝖺𝖽𝗈 𝖽𝖾𝗌𝖽𝖾 𝖏𝖆𝖕𝖔𝖓🇯🇵 ᑭOᖇ 𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 մძ  𝘽 ꂦt ִֶָ
╰──────────✦──────────╯
──╯🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡
> Creador 𓆩‌۫᷼ ִֶָღܾ݉͢𝐇ꪖ𝐫o͟𝐥𝐝𓆪`;

  await conn.sendFile(m.chat, pp, 'invocacion.jpg', teks, m, false, {
    mentions: participants.map(a => a.id)
  });
};

handler.help = ['tagall *<mensaje>*', 'invocar *<mensaje>*'];
handler.tags = ['grupo'];
handler.command = ['tagall', 'invocar'];
handler.admin = true;
handler.group = true;

export default handler;
