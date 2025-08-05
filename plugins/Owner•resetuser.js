
let handler = async (m, { conn, text }) => {
    let who;
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
    else who = m.chat;
    if (!who) throw `🩵 *Etiqueta O Responde A Un Mensaje Del Usuario Que Quieres Resetear Sus Datos*`;
    let user = global.db.data.users[who];
    if (!user) throw `🩵 *El Usuario No Se Encuentra En Mi Base De Datos*`;
    
    let userNumber = who.split('@')[0];
    if (user) {
        delete global.db.data.users[who];
        conn.sendMessage(m.chat, {
            text: `🩵 *Éxito Todos Los Datos Del User: @${userNumber} Ya Fueron Eliminados De Mi Base De Datos.*\n\n*Bot:* 𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 ოძ 𝘽 ꂦ Ꮏ`, 
            mentions: [who]
        }, {quoted: m});
    }
};

handler.tags = ['owner'];
handler.command = ['restablecerdatos','deletedatauser','resetuser','borrardatos'];
handler.rowner = true;

export default handler
