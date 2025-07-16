import {watchFile, unwatchFile} from 'fs';
import chalk from 'chalk';
import {fileURLToPath} from 'url';
import fs from 'fs'; 
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import axios from 'axios';
import moment from 'moment-timezone';

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botNumber = '' //Ejemplo: 525218138672

//*──ׄ✰─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.owner = [
  ['50764735869', '🩵 𝗖𝗿𝗲𝗮𝗱𝗼𝗿 ', true],
  ['50764735869', '𓆩‌۫᷼ ִֶָღܾ݉͢𝐇ꪖ𝐫o͟𝐥𝐝𓆪', true],
  ['573133374132', '💖💝 Y⃟o⃟ S⃟o⃟y⃟ Y⃟o⃟ 💝 💖 ', true]
]

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.owner_lid = [
  ['50764735869', '🩵 𝗖𝗿𝗲𝗮𝗱𝗼𝗿 🩵 (LID)', true],
  ['50764735869', 'HAROLD (LID)', true]
]

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.mods = []
global.suittag = ['50764735869'] 
global.prems = []

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.libreria = 'Baileys'
global.baileys = 'V 6.7.8'
global.vs = '2.0.0'
global.languaje = 'Español'
global.nameqr = '𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 ოძ  𝘽 ꂦ Ꮏ'
global.sessions = 'Session'
global.jadi = 'JadiBot'
global.makiJadibts = true

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.packsticker = `─✰─ׄ─ׅ─ׄ─✰─ׄ─✰─ׄ✰─ׄ\nBot: 𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 ოძ  𝘽 ꂦ Ꮏ MD\n\nCreador: Harold\n\nTipo: Público\n\nUsuarios: 10k\n─✰─ׄ─ׅ─ׄ─✰─ׄ─✰─ׄ✰─ׄ\n\n`
global.packname = `𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 ოძ  𝘽 ꂦ Ꮏ`
global.author = `𝐒𝐭𝐢𝐜𝐤𝐞𝐫𝐬 𝐁𝐲 𓆩‌۫᷼ ִֶָღܾ݉͢𝐇ꪖ𝐫o͟𝐥𝐝𓆪`;
global.wm = '⏤͟͞ू⃪  ̸̷͢𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝙃𝙖𝙧𝙤𝙡𝙙 𝙍𝙃𝙇𝙈+𝟱𝟳';
global.titulowm = '⏤͟͞ू⃪𝐃𝐞𝐧𝐣𝐢 𝐁𖹭t͟ 𝐁𝐨𝐭𑁯ᰍ';
global.igfg = '𓆩‌۫᷼ ִֶָღܾ݉͢𝐇ꪖ𝐫o͟𝐥𝐝𓆪'
global.botname = '𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 ოძ  𝘽 ꂦ Ꮏ'
global.dev = '© ⍴᥆ᥕᥱrᥱძ ᑲᥡ 𓆩‌۫᷼ ִֶָღܾ݉͢𝐇ꪖ𝐫o͟𝐥𝐝𓆪'
global.textbot = 'shoyo HINATA :𓆩‌۫᷼ ִֶָღܾ݉͢𝐇ꪖ𝐫o͟𝐥𝐝𓆪'
global.gt = '𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 ოძ  𝘽 ꂦ Ꮏ';
global.namechannel = '𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼  𝐂𝐡a͟𝐧n͟e͟𝐥𑁯'

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.moneda = '𝙨𝙝𝙤𝙮𝙤Coins'

//• ↳ ◜𝑳𝑰𝑵𝑲𝑺  ׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅׅ𝚜𝚢𝚊 𝙩𝙚𝙖𝙢• 🩵
global.gp4 = 'https://chat.whatsapp.com/JkpwB3J7qMQF1uxomv5U1e?mode=ac_t' //Grupo Oficial De 𝙎𝙃𝙊𝙔𝙊
global.gp1 = 'https://chat.whatsapp.com/CIAoJ4Ze2lm7jf4WZCeh7E?mode=ac_c' //Grupo 2
global.gp2 = 'https://chat.whatsapp.com/CIAoJ4Ze2lm7jf4WZCeh7E?mode=ac_c'//
global.channel = 'https://whatsapp.com/channel/0029Vb6MFShKGGGBWePRFc0U' //Canal Oficial
global.channel2 = 'https://whatsapp.com/channel/0029Vb6MFShKGGGBWePRFc0U' //Canal test 
global.yt = 'https://www.youtube.com' //Canal De Youtube
global.md = 'https://github.com' //Github Oficial
global.correo = ''
global.cn ='https://whatsapp.com/channel/0029Vb6MFShKGGGBWePRFc0U';

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.catalogo = fs.readFileSync('./src/catalogo1.jpg');
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: '120363402552103115@newsletter',
}
global.multiplier = 70

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment   

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
