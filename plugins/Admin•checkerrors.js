
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

let handler = async (m, { conn, isOwner, isROwner }) => {
    if (!isOwner && !isROwner) return conn.reply(m.chat, '❌ Este comando solo puede ser usado por el propietario.', m)
    
    try {
        let errorReport = `🔍 *REPORTE DE ERRORES DEL BOT*\n\n`
        errorReport += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`
        
        // 1. Verificar archivos principales
        const mainFiles = ['index.js', 'handler.js', 'config.js', 'package.json']
        let mainFilesStatus = `📁 *ARCHIVOS PRINCIPALES:*\n`
        
        for (let file of mainFiles) {
            try {
                if (fs.existsSync(file)) {
                    const content = fs.readFileSync(file, 'utf8')
                    if (content.trim() === '') {
                        mainFilesStatus += `❌ ${file} - Archivo vacío\n`
                    } else {
                        mainFilesStatus += `✅ ${file} - OK\n`
                    }
                } else {
                    mainFilesStatus += `❌ ${file} - No existe\n`
                }
            } catch (e) {
                mainFilesStatus += `❌ ${file} - Error: ${e.message}\n`
            }
        }
        errorReport += mainFilesStatus + '\n'
        
        // 2. Verificar plugins con errores
        const pluginsDir = './plugins'
        let pluginErrors = `🔌 *PLUGINS CON ERRORES:*\n`
        let errorCount = 0
        
        if (fs.existsSync(pluginsDir)) {
            const files = fs.readdirSync(pluginsDir)
            
            for (let file of files) {
                if (file.endsWith('.js')) {
                    try {
                        const filePath = path.join(pluginsDir, file)
                        const content = fs.readFileSync(filePath, 'utf8')
                        
                        // Verificar errores comunes
                        const errors = []
                        
                        // Export incompleto
                        if (content.includes('export default') && content.match(/export default\s*$/m)) {
                            errors.push('Export incompleto')
                        }
                        
                        // Funciones incompletas
                        if (content.includes('function') && content.match(/function\s+\w+\s*\([^)]*\)\s*{\s*$/m)) {
                            errors.push('Función incompleta')
                        }
                        
                        // Console.log incompleto
                        if (content.includes('console.') && content.match(/console\.\s*$/m)) {
                            errors.push('Console incompleto')
                        }
                        
                        // Strings no cerrados
                        if (content.match(/['"`][^'"`]*$/m)) {
                            errors.push('String no cerrado')
                        }
                        
                        // Imports faltantes
                        if (content.includes('axios') && !content.includes('import') && !content.includes('axios')) {
                            errors.push('Import de axios faltante')
                        }
                        
                        if (errors.length > 0) {
                            errorCount++
                            pluginErrors += `❌ ${file}:\n`
                            errors.forEach(error => {
                                pluginErrors += `   • ${error}\n`
                            })
                        }
                        
                    } catch (e) {
                        errorCount++
                        pluginErrors += `❌ ${file} - Error al leer: ${e.message}\n`
                    }
                }
            }
        }
        
        if (errorCount === 0) {
            pluginErrors += `✅ No se encontraron errores en plugins\n`
        }
        errorReport += pluginErrors + '\n'
        
        // 3. Verificar dependencias
        let depsStatus = `📦 *DEPENDENCIAS:*\n`
        try {
            if (fs.existsSync('package.json')) {
                const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
                const deps = packageJson.dependencies || {}
                const requiredDeps = [
                    'cfonts', 'chalk', 'boxen', 'pino', 'yargs', 'lodash',
                    'syntax-error', 'node-cache', '@whiskeysockets/baileys',
                    '@hapi/boom', 'lowdb', 'ws', 'google-libphonenumber', 'axios'
                ]
                
                let missingDeps = []
                for (let dep of requiredDeps) {
                    if (!deps[dep]) {
                        missingDeps.push(dep)
                    }
                }
                
                if (missingDeps.length > 0) {
                    depsStatus += `❌ Dependencias faltantes:\n`
                    missingDeps.forEach(dep => {
                        depsStatus += `   • ${dep}\n`
                    })
                } else {
                    depsStatus += `✅ Todas las dependencias principales están instaladas\n`
                }
            }
        } catch (e) {
            depsStatus += `❌ Error al verificar package.json: ${e.message}\n`
        }
        errorReport += depsStatus + '\n'
        
        // 4. Verificar estructura de carpetas
        let structureStatus = `📂 *ESTRUCTURA:*\n`
        const requiredDirs = ['plugins', 'lib', 'src', 'tmp']
        
        for (let dir of requiredDirs) {
            if (fs.existsSync(dir)) {
                structureStatus += `✅ /${dir} - OK\n`
            } else {
                structureStatus += `❌ /${dir} - No existe\n`
            }
        }
        errorReport += structureStatus + '\n'
        
        // 5. Estado del proceso
        let processStatus = `⚙️ *ESTADO DEL PROCESO:*\n`
        try {
            const memUsage = process.memoryUsage()
            processStatus += `💾 Memoria: ${Math.round(memUsage.heapUsed / 1024 / 1024)}MB\n`
            processStatus += `🕐 Uptime: ${Math.round(process.uptime())}s\n`
            processStatus += `📊 Node.js: ${process.version}\n`
        } catch (e) {
            processStatus += `❌ Error al obtener estado: ${e.message}\n`
        }
        errorReport += processStatus + '\n'
        
        errorReport += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
        errorReport += `🤖 *𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 ოძ  𝘽 ꂦ Ꮏ* - Sistema de diagnóstico\n`
        errorReport += `📅 ${new Date().toLocaleString()}`
        
        await conn.reply(m.chat, errorReport, m)
        
    } catch (e) {
        console.error('Error en checkerrors:', e)
        await conn.reply(m.chat, `❌ Error al ejecutar diagnóstico: ${e.message}`, m)
    }
}

handler.help = ['checkerrors', 'diagnostico', 'errores']
handler.tags = ['admin']
handler.command = /^(checkerrors|diagnostico|errores|check)$/i
handler.rowner = true

export default handler
