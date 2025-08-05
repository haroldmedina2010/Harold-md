/* Codigo hecho por @Fabri115 y mejorado por BrunoSobrino */

import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs'
import path from 'path'

var handler = async (m, { conn, usedPrefix }) => {

if (global.conn.user.jid !== conn.user.jid) {
return conn.reply(m.chat, '🧡 *Utiliza este comando directamente en el número del bot oficial.*', m, rcanal, )
}

let chatId = m.isGroup ? [m.chat, m.sender] : [m.sender]
let sessionPath = `./${sessions}/`

try {

let files = await fs.readdir(sessionPath)
let filesDeleted = 0
for (let file of files) {
for (let id of chatId) {
if (file.includes(id.split('@')[0])) {
await fs.unlink(path.join(sessionPath, file))
filesDeleted++;
break
}}}

if (filesDeleted === 0) {
await conn.reply(m.chat, '🧡 *No se encontró ningún archivo que incluya la ID del chat*', m, rcanal, )
} else {
await conn.reply(m.chat, `🧡 *Se eliminaron ${filesDeleted} archivos de sesión*`, m, rcanal, )
conn.reply(m.chat, `🧡 *¡Hola! Soy 𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 ოძ  𝘽 ꂦ Ꮏ*`, m, rcanal, )
}
} catch (err) {
console.error('Error al leer la carpeta o los archivos de sesión:', err)
await conn.reply(m.chat, '🧡 *Ocurrió un error...*', m, rcanal, )
}

}
handler.help = ['ds', 'fixmsgespera']
handler.tags = ['info']
handler.command = ['fix', 'ds', 'fixmsgespera']msgespera', 'ds']

handler.register = true

export default handler
