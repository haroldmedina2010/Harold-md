import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `⚠️ *Uso:* ${usedPrefix + command} <texto del video>`, m);

  try {
    let wait = await conn.sendMessage(m.chat, { 
      text: '🗣️ *Generando tu video con IA, espera un toque...*' 
    }, { quoted: m });


    let apiURL = `https://myapiadonix.vercel.app/api/veo3?prompt=${encodeURIComponent(text)}&apikey=adonixveo3`;

    let res = await fetch(apiURL);
    let json = await res.json();

    if (!json.success || !json.video_url) throw new Error(json.message || 'No se pudo generar el video');


    let video = await fetch(json.video_url);
    let buffer = await video.buffer();

    await conn.sendMessage(m.chat, { 
      video: buffer, 
      caption: `🎬 *Video generado:* ${json.prompt}\n\n`, 
      gifPlayback: false 
    }, { quoted: m });

    await conn.sendMessage(m.chat, { delete: wait.key });
  } catch (e) {
    await conn.reply(m.chat, `❌ *Error generando el video:* \n${e.message || e}`, m);
  }
};

handler.help = ['aivideo'];
handler.tags = ['ia'];
handler.command = ['aivideo', 'videoai', 'iavideo'];

export default handler;
