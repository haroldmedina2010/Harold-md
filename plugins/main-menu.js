let handler = async (m, { conn, args }) => {  
  let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender  
  let userData = global.db.data.users[userId] || {};  
  let exp = userData.exp || 0;  
  let coin = userData.coin || 0;  
  let level = userData.level || 0;  
  let role = userData.role || 'Sin Rango';  

  let name = await conn.getName(userId);  
  let _uptime = process.uptime() * 1000;  
  let uptime = clockString(_uptime);  
  let totalreg = Object.keys(global.db.data.users).length;  
  let totalCommands = Object.values(global.plugins).filter((v) => v.help && v.tags).length;  

  let images = [
    'https://qu.ax/MWyfk.jpg',
    'https://qu.ax/MWyfk.jpg',
    'https://qu.ax/MWyfk.jpg',
    'https://qu.ax/MWyfk.jpg'
  ]
  let imgUrl = images[Math.floor(Math.random() * images.length)]  

  let txt = `
🎃 ¡𝐇𝐨𝐥𝐚! ${name} 🎃  
𝐒𝐨𝐲 *𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 ოძ 𝘽 ꂦ Ꮏ* ${(conn.user.jid == global.conn.user.jid ? '🦴𝙊𝙁𝙄𝘾𝙄𝘼𝙇 ＢＯＴ🦴' : '(Sub-Bot)')}  

╔━━ 🎃 INFO-BOT 🦴 ━━━━╗
┃🕷 Creador: 𓆩‌۫᷼ ִֶָღܾ݉͢𝐇ꪖ𝐫o͟𝐥𝐝𓆪
┃🕸 Tiempo activo: ${uptime}
┃⚙️ Comandos: ${totalCommands}
┃💀 Registros: ${totalreg}
╚━━━━━━━━━━━━━━━╝

╔━━ 🎃 INFO-USER 🦴 ━━━╗
┃🧛 Exp: ${exp}
┃💎 Diamantes: ${coin}
┃📈 Nivel: ${level}
┃👑 Rango: ${role}
╚━━━━━━━━━━━━━━━╝

> 👻 Conéctate Como Subbot usando #code o #qr y sigue los pasos 🎃

✰ 𝗟𝗜𝗦𝗧𝗔 𝗗𝗘 𝗖𝗢𝗠𝗔𝗡𝗗𝗢𝗦 👾  

╭─⬣「 ✰𝐈𝐧𝐟𝐨✰ 」⬣
│🎃🦴 #botreglas
│🎃🦴 #comprarbot
│🎃🦴 #uptime
│🎃🦴 #menu
│🎃🦴 #estado
╰─⬣

╭─⬣「 ✰𝐑𝐏𝐆✰ 」⬣
│🎃🦴 #minar
│🎃🦴 #depositar
│🎃🦴 #daily
│🎃🦴 #bal
│🎃🦴 #buy
│🎃🦴 #buyall
│🎃🦴 #rob
│🎃🦴 #rob2
│🎃🦴 #robar
│🎃🦴 #robarxp
│🎃🦴 #soccer
│🎃🦴 #rcjugador
│🎃🦴 #rgjugador
│🎃🦴 #vtjugador
│🎃🦴 #w
│🎃🦴 #retirar
│🎃🦴 #tranferir
│🎃🦴 #lb
│🎃🦴 #levelup
│🎃🦴 #lvl
╰─⬣

╭─⬣「 ✰𝐁𝐮𝐬𝐜𝐚𝐝𝐨𝐫𝐞𝐬✰ 」⬣
│🎃🦴 #gitthubsearch 
│🎃🦴 #google
│🎃🦴 #imagen
╰─⬣

╭─⬣「 ✰𝐃𝐞𝐬𝐜𝐚𝐫𝐠𝐚𝐬✰ 」⬣
│🎃🦴 #fb
│🎃🦴 #play
│🎃🦴 #playvid
│🎃🦴 #ytmp3doc
│🎃🦴 #ytmp4doc
│🎃🦴 #ytmp4
│🎃🦴 #ytmp3
│🎃🦴 #tiktok
│🎃🦴 #ig
│🎃🦴 #twiter 
│🎃🦴 #spotify
│🎃🦴 #gitclone
│🎃🦴 #mediafire
│🎃🦴 #apk
│🎃🦴 #apkmod
╰─⬣

╭─⬣「 ✰𝐆𝐫𝐮𝐩𝐨𝐬✰ 」⬣
│🎃🦴 #group abrir 
│🎃🦴 #group cerrar 
│🎃🦴 #delete
│🎃🦴 #demote 
│🎃🦴 #promote 
│🎃🦴 #encuesta
│🎃🦴 #rentar
│🎃🦴 #kick
│🎃🦴 #kickall
│🎃🦴 #tag
│🎃🦴 #invite
╰─⬣

╭─⬣「 ✰𝐖𝐚𝐢𝐟𝐮✰ 」⬣
│🎃🦴 #rollwaifu
│🎃🦴 #robarpersonaje
│🎃🦴 #waifu
│🎃🦴 #rw
│🎃🦴 #claim
│🎃🦴 #carrw
│🎃🦴 #guardar
│🎃🦴 #confirmar
│🎃🦴 #character
│🎃🦴 #roll
│🎃🦴 #obtenidos 
│🎃🦴 #confirmar 
╰─⬣

╭─⬣「 ✰𝚊𝚌𝚌𝚒𝚘𝚗𝚎𝚜✰ 」⬣
│🎃🦴 #abrazar
│🎃🦴 #besar
│🎃🦴 #dormir
│🎃🦴 #kill
│🎃🦴 #acariciar
│🎃🦴 #ahorcado
│🎃🦴 #piropo
│🎃🦴 #meme
│🎃🦴 #dance
│🎃🦴 #love
│🎃🦴 #reto
│🎃🦴 #bot
│🎃🦴 #gay
│🎃🦴 #rata
╰─⬣

╭─⬣「 ✰𝐒𝐢𝐬𝐭𝐞𝐦𝐚✰ 」⬣
│🎃🦴 #repeat
│🎃🦴 #repite
│🎃🦴 #copiame
│🎃🦴 #dalle2
│🎃🦴 #artista
╰─⬣

╭─⬣「 ✰𝐂𝐫𝐞𝐚𝐝𝐨𝐫✰ 」⬣
│🎃🦴 #addprem
│🎃🦴 #addcoins
│🎃🦴 #addcmd
│🎃🦴 #addowner 
│🎃🦴 #addsoporte
│🎃🦴 #update
│🎃🦴 #resetuser
│🎃🦴 #join
│🎃🦴 #banuser
│🎃🦴 #bc
╰─⬣

> 🎃 © Creador: 𓆩‌۫᷼ ִֶָღܾ݉͢𝐇ꪖ𝐫o͟𝐥𝐝𓆪 🦴
`.trim();

  let imgBuffer = await fetch(imgUrl).then(res => res.buffer());  

  await conn.sendMessage(m.chat, {   
    text: txt,  
    image: imgBuffer,  
    contextInfo: {  
      mentionedJid: [m.sender, userId],  
      isForwarded: true,  
      forwardedNewsletterMessageInfo: {  
        newsletterJid: '120363419817597119@newsletter',  
        newsletterName: '',  
        serverMessageId: -1,  
      },  
      forwardingScore: 999,  
      externalAdReply: {  
        title: '🎃 𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 ოძ 𝘽 ꂦ Ꮏ 🦴',  
        body: 'Powered by 𓆩‌۫᷼ ִֶָღܾ݉͢𝐇ꪖ𝐫o͟𝐥𝐝𓆪 🎃',
        thumbnailUrl: imgUrl,  
        sourceUrl: redes,  
        mediaType: 1,  
        showAdAttribution: true,  
        renderLargerThumbnail: true,  
      },  
    },  
  }, { quoted: m });  
}  

handler.help = ['menu'];  
handler.tags = ['main'];  
handler.command = ['menu', 'menú', 'help', 'allmenú', 'allmenu', 'menucompleto'];

export default handler;  

function clockString(ms) {  
  let seconds = Math.floor((ms / 1000) % 60);  
  let minutes = Math.floor((ms / (1000 * 60)) % 60);  
  let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);  
  return `${hours}H ${minutes}M ${seconds}S`;  
}
