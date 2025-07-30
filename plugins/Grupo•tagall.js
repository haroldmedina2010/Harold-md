const handler = async (m, {isOwner, isAdmin, conn, text, participants, args, command, usedPrefix}) => {
  if (usedPrefix.toLowerCase() === 'a') return;

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  const mensaje = args.join` `;
  const encabezado = `
╭───────𓆩🧡𓆪───────╮
┃    🦁 *Llamado deportivo Global* 🧡
┃       𝒃𝒚 𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼🏐🧡
╰───────𓆩🧡𓆪───────╯`;

  const mensajeTexto = mensaje.trim()
    ? `💌 *Mensaje lanzado desde la cancha:* ${mensaje}`
    : `💌 *Mensaje vacío... ¡envíame uno con amor como hacer un punto🏐😍~!* 🧡`;

  let texto = `${encabezado}\n\n😍 ¡Sumérgete en la mención ᘻᗩ́S del ⍴ᥲr𝗍іძ᥆! 🧡\n\n🧡 ${mensajeTexto}\n\n*🪀 👥 Jugadores en la cancha:* ➥ ${participants.length} integrantes 😍🧡\n\n🧡🏐🧡🏐🧡🏐🧡🏐🧡\n`;

  for (const usuario of participants) {
    texto += `➳ 🧡 @${usuario.id.split('@')[0]}\n`;
  }

  texto += `
🏐🏐🏐🏐🏐🏐🏐🏐🏐🏐🏐🏐
╭──────────✦──────────╮
┃ 🧡 Comando: ${command}
┃ 🚀 Enviado desde Japón🇯🇵 por 𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 ꂦt
╰──────────✦──────────╯
> Creador: 𓆩‌۫᷼ ִֶָღܾ݉͢𝐇ꪖ𝐫o͟𝐥𝐝𓆪`;

  conn.sendMessage(m.chat, { text: texto, mentions: participants.map(p => p.id) });
};

handler.help = ['todos *<txt>*'];
handler.tags = ['gc'];
handler.command = /^(tagall|t|inv
