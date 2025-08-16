/* Plugin
Toplayroblox
Autor: Ado 🦖
*/
import axios from 'axios';
import sharp from 'sharp';

const handler = async (m, { conn }) => {
    try {
        m.reply('⏳ Procesando...');
        const api1 = new URL('https://apis.roblox.com');
        api1.pathname = 'explore-api/v1/get-sort-content';
        api1.search = new URLSearchParams({
            sessionId: '17996246-1290-440d-b789-d49484115b9a',
            sortId: 'top-playing-now',
            cpuCores: '8',
            maxResolution: '1920x1080',
            maxMemory: '8192',
            networkType: '4g'
        }).toString();

        const { data: json1 } = await axios.get(api1.toString());
        const listaJuegos = json1?.games?.slice(0, 10);
        if (!listaJuegos?.length) throw new Error('La lista de juegos está vacía');

        const payload = listaJuegos.map(v => ({
            type: 'GameIcon',
            targetId: v.universeId,
            format: 'webp',
            size: '256x256'
        }));

        const { data: json2 } = await axios.post('https://thumbnails.roblox.com/v1/batch', payload);
        const listaThumbnails = json2.data;
        const listaCombinada = listaJuegos.map((v, i) => ({ ...v, ...listaThumbnails[i] }));

        const imagenes = await Promise.all(
            listaCombinada.map(v =>
                axios.get(v.imageUrl, { responseType: 'arraybuffer' }).then(res => Buffer.from(res.data))
            )
        );

        const bufferImagen = await sharp({
            create: {
                width: 256 * 5 + 40,
                height: 256 * 2 + 30,
                channels: 4,
                background: { r: 255, g: 255, b: 255, alpha: 1 }
            }
        })
            .composite(
                imagenes.map((buf, idx) => ({
                    input: buf,
                    top: Math.floor(idx / 5) * (256 + 10) + 10,
                    left: (idx % 5) * (256 + 10) + 10
                }))
            )
            .png()
            .toBuffer();

        const separador = '-'.repeat(60);

        const caption = listaCombinada
            .map((v, i) =>
                `${i + 1} | ${v.name}\n👥 Jugadores: ${v.playerCount.toLocaleString('es-ES')}\n👍 Likes: ${(
                    (v.totalUpVotes / (v.totalUpVotes + v.totalDownVotes)) *
                    100
                ).toFixed()}%\n🎮 Jugar ahora: https://www.roblox.com/games/${v.rootPlaceId}`
            )
            .join(`\n${separador}\n`);

        await conn.sendFile(m.chat, bufferImagen, '_roblox.png', caption, m);
    } catch (e) {
        m.reply(`❌ Ocurrió un error: ${e.message}`);
    }
};

handler.help = ['toplayroblox'];
handler.tags = ['herramientas'];
handler.command = ['toplayroblox', 'toplayrbx'];

export default handler;
