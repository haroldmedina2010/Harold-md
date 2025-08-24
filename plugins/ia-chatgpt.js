// » Creado por Ado
// 🧃 No quites créditos.
import axios from "axios";

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) {
        return conn.sendMessage(
            m.chat,
            { text: `❌ ¿Qué quieres preguntar?\n\nEjemplo: ${usedPrefix + command} Qué opinas del reguetón?` },
            { quoted: m }
        );
    }

    try {
        await m.react('💬');

        let d = new Date(new Date() + 3600000);
        let locale = 'en';
        const time = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
        let day = d.toLocaleDateString(locale, { weekday: 'long' });
        let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });

        // PERSONALIZACIÓN 🔥
        let logic = `Ríete en mayúsculas, di "bro", sé vacilón, que te dé pereza cuando te pidan cosas, 
        sé borde de broma, responde gracioso, haz bromas de cosas actuales, mete palabrotas, 
        ríete de la persona si le pasa algo pero en forma de chiste, trátala como si fueras su hermano mayor 
        y háblale con acento de paisa de Medellín.`

        let json = await openai(text, logic);

        let fkontak = { 
            "key": { "fromMe": false, "participant": "0@s.whatsapp.net", "remoteJid": "0@s.whatsapp.net" }, 
            "message": { "contactMessage": { "displayName": "🍿 GPT 4", "vcard": "BEGIN:VCARD\nVERSION:3.0\nFN:GPT 4\nTEL;type=CELL;type=VOICE;waid=0:0\nEND:VCARD" } } 
        };

        await conn.sendMessage(
            m.chat,
            { text: `\`🌤️ ChatGPT4\`\n\n> ${json}` },
            { quoted: fkontak }
        );

        await m.react('🔥');
    } catch (e) {
        await m.react('❎');
    }
};

handler.help = ["chatgpt"];
handler.tags = ["ia"];
handler.command = /^(chatgpt)$/i;

export default handler;

async function openai(text, logic) {
    let response = await axios.post("https://chateverywhere.app/api/chat/", {
        model: {
            id: "gpt-4",
            name: "GPT-4",
            maxLength: 32000,
            tokenLimit: 8000,
            completionTokenLimit: 5000,
            deploymentName: "gpt-4"
        },
        messages: [
            { role: "system", content: logic },
            { role: "user", content: text }
        ],
        prompt: logic,
        temperature: 0.7
    }, {
        headers: {
            "Accept": "/*/",
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
        }
    });

    return response.data;
}
