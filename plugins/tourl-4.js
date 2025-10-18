import fs from 'fs';
import path from 'path';
import axios from 'axios';

const GITHUB_TOKEN = '';
const REPO_OWNER = '';
const REPO_NAME = '';
const BRANCH = 'main';

async function uploadToGitHub(fileBuffer, fileName) {
  const fileData = fileBuffer.toString('base64');
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${fileName}`;
  const res = await axios.put(
    url,
    {
      message: `Upload ${fileName}`,
      content: fileData,
      branch: BRANCH,
    },
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return res.data.content.html_url;
}

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    const quoted = m.quoted || m;
    const mime = quoted.mimetype || '';
    if (!mime) return m.reply(`☆ Responde a un archivo con el comando *${usedPrefix + command}*.`);

    const media = await quoted.download();
    if (!media) return m.reply('⚔ No se pudo descargar el archivo.');

    const ext = mime.split('/')[1] || 'bin';
    const fileName = `${Date.now()}.${ext}`;

    await m.react('🕓');

    const url = await uploadToGitHub(media, fileName);

    await m.react('✔️');

    await m.reply(`❏ *UPLOADER*\n> ❍ :: El archivo se subio correctamente\n${url}`);
  } catch (error) {
    console.error(error);
    m.reply('Hubo un error al intentar subir el archivo.');
  }
};

handler.help = ['upload'];
handler.tags = ['tools'];
handler.command = ['upload', 'tourl'];

export default handler;
