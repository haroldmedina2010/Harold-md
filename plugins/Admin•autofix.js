
import fs from 'fs'
import path from 'path'

let handler = async (m, { conn, isOwner, isROwner }) => {
    if (!isOwner && !isROwner) return conn.reply(m.chat, '❌ Este comando solo puede ser usado por el propietario.', m)
    
    try {
        let fixReport = `🔧 *AUTO-REPARACIÓN DEL BOT*\n\n`
        fixReport += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`
        
        let fixedCount = 0
        
        // Reparar plugins con errores comunes
        const pluginsDir = './plugins'
        if (fs.existsSync(pluginsDir)) {
            const files = fs.readdirSync(pluginsDir)
            
            for (let file of files) {
                if (file.endsWith('.js')) {
                    try {
                        const filePath = path.join(pluginsDir, file)
                        let content = fs.readFileSync(filePath, 'utf8')
                        let fixed = false
                        
                        // Fix 1: Export incompleto
                        if (content.includes('export default') && content.match(/export default\s*$/m)) {
                            content = content.replace(/export default\s*$/m, 'export default handler')
                            fixed = true
                        }
                        
                        // Fix 2: Console incompleto
                        if (content.match(/console\.\s*$/m)) {
                            content = content.replace(/console\.\s*$/m, 'console.error("Error en plugin")')
                            fixed = true
                        }
                        
                        // Fix 3: Imports de axios faltantes
                        if (content.includes('axios') && !content.includes('import axios')) {
                            content = `import axios from 'axios'\n\n${content}`
                            fixed = true
                        }
                        
                        // Fix 4: Handler sin tags
                        if (content.includes('handler.command') && !content.includes('handler.tags')) {
                            const commandMatch = content.match(/handler\.command\s*=/)
                            if (commandMatch) {
                                const insertPos = content.indexOf(commandMatch[0])
                                content = content.slice(0, insertPos) + 
                                         'handler.tags = [\'general\']\n' + 
                                         content.slice(insertPos)
                                fixed = true
                            }
                        }
                        
                        if (fixed) {
                            fs.writeFileSync(filePath, content, 'utf8')
                            fixedCount++
                            fixReport += `✅ Reparado: ${file}\n`
                        }
                        
                    } catch (e) {
                        fixReport += `❌ Error al reparar ${file}: ${e.message}\n`
                    }
                }
            }
        }
        
        // Crear carpetas faltantes
        const requiredDirs = ['plugins', 'lib', 'src', 'tmp', 'database']
        for (let dir of requiredDirs) {
            if (!fs.existsSync(dir)) {
                try {
                    fs.mkdirSync(dir, { recursive: true })
                    fixReport += `📁 Creada carpeta: ${dir}\n`
                    fixedCount++
                } catch (e) {
                    fixReport += `❌ Error al crear ${dir}: ${e.message}\n`
                }
            }
        }
        
        // Verificar y crear database.json si no existe
        if (!fs.existsSync('./database.json')) {
            try {
                const defaultDB = {
                    users: {},
                    chats: {},
                    stats: {},
                    msgs: {},
                    sticker: {},
                    settings: {}
                }
                fs.writeFileSync('./database.json', JSON.stringify(defaultDB, null, 2))
                fixReport += `📄 Creado database.json\n`
                fixedCount++
            } catch (e) {
                fixReport += `❌ Error al crear database.json: ${e.message}\n`
            }
        }
        
        fixReport += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
        fixReport += `📊 *RESUMEN:*\n`
        fixReport += `🔧 Archivos reparados: ${fixedCount}\n`
        fixReport += `⚡ Estado: ${fixedCount > 0 ? 'Reparaciones realizadas' : 'No se necesitaron reparaciones'}\n\n`
        fixReport += `🤖 *𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 ოძ  𝘽 ꂦ Ꮏ* - Auto-reparación completada\n`
        fixReport += `📅 ${new Date().toLocaleString()}`
        
        await conn.reply(m.chat, fixReport, m)
        
        if (fixedCount > 0) {
            await conn.reply(m.chat, '♻️ Se recomienda reiniciar el bot para aplicar los cambios.', m)
        }
        
    } catch (e) {
        console.error('Error en autofix:', e)
        await conn.reply(m.chat, `❌ Error al ejecutar auto-reparación: ${e.message}`, m)
    }
}

handler.help = ['autofix', 'reparar', 'fix']
handler.tags = ['admin']
handler.command = /^(autofix|reparar|fix|autoreparar)$/i
handler.rowner = true

export default handler
