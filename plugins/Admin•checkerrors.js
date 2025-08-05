import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

let handler = async (m, { conn, isOwner, isAdmin }) => {
    if (!isAdmin && !isOwner) {
        return conn.reply(m.chat, '🚫 *Solo los administradores pueden usar este comando*', m)
    }

    try {
        await conn.reply(m.chat, '🔍 *Iniciando diagnóstico del sistema...*', m)

        // Verificar base de datos
        let dbErrors = []
        let configErrors = []
        let pluginErrors = []

        // Verificar estructura de la base de datos
        if (!global.db) dbErrors.push('❌ Base de datos global no inicializada')
        if (!global.db?.data) dbErrors.push('❌ Datos de la base de datos no disponibles')
        if (!global.db?.data?.chats) dbErrors.push('❌ Configuración de chats no disponible')
        if (!global.db?.data?.users) dbErrors.push('❌ Datos de usuarios no disponibles')
        if (!global.db?.data?.settings) dbErrors.push('❌ Configuraciones del bot no disponibles')

        // Verificar configuración del chat actual
        if (m.isGroup) {
            let chat = global.db.data.chats[m.chat]
            if (!chat) {
                configErrors.push('⚠️ Configuración del grupo no encontrada')
                // Crear configuración por defecto
                global.db.data.chats[m.chat] = {
                    isBanned: false,
                    welcome: true,
                    detect: true,
                    antiLink: false,
                    antiBot: false,
                    antifake: false,
                    nsfw: false,
                    autosticker: false,
                    autoresponder: false,
                    delete: false,
                    modoadmin: false,
                    autolevelup: false
                }
                configErrors.push('✅ Configuración del grupo restablecida')
            }
        }

        // Verificar plugins críticos
        try {
            let fs = await import('fs')
            let pluginsDir = './plugins'
            if (!fs.existsSync(pluginsDir)) {
                pluginErrors.push('❌ Carpeta de plugins no encontrada')
            } else {
                // Verificar algunos plugins críticos
                let criticalPlugins = [
                    'grupo-banchat.js',
                    'grupo-unbanchat.js',
                    'main-allfake.js',
                    'config-nable.js'
                ]

                for (let plugin of criticalPlugins) {
                    if (!fs.existsSync(`${pluginsDir}/${plugin}`)) {
                        pluginErrors.push(`⚠️ Plugin ${plugin} no encontrado`)
                    }
                }
            }
        } catch (e) {
            pluginErrors.push(`❌ Error verificando plugins: ${e.message}`)
        }

        // Generar reporte
        let errorReport = `🔍 *DIAGNÓSTICO DEL SISTEMA*\n\n`
        errorReport += `*Bot:* 𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 ოძ 𝘽 ꂦ Ꮏ\n`
        errorReport += `*Fecha:* ${new Date().toLocaleString()}\n`
        errorReport += `*Chat:* ${m.isGroup ? await conn.getName(m.chat) : 'Privado'}\n\n`

        errorReport += `📊 *ESTADO DE LA BASE DE DATOS:*\n`
        if (dbErrors.length === 0) {
            errorReport += `✅ Base de datos funcionando correctamente\n\n`
        } else {
            errorReport += dbErrors.join('\n') + '\n\n'
        }

        errorReport += `⚙️ *CONFIGURACIONES:*\n`
        if (configErrors.length === 0) {
            errorReport += `✅ Configuraciones funcionando correctamente\n\n`
        } else {
            errorReport += configErrors.join('\n') + '\n\n'
        }

        errorReport += `🔌 *PLUGINS:*\n`
        if (pluginErrors.length === 0) {
            errorReport += `✅ Plugins principales disponibles\n\n`
        } else {
            errorReport += pluginErrors.join('\n') + '\n\n'
        }

        // Estado general
        let totalErrors = dbErrors.length + configErrors.filter(e => e.includes('❌')).length + pluginErrors.filter(e => e.includes('❌')).length
        if (totalErrors === 0) {
            errorReport += `🎉 *ESTADO GENERAL: ÓPTIMO*\n`
            errorReport += `✅ No se encontraron errores críticos`
        } else {
            errorReport += `⚠️ *ESTADO GENERAL: ${totalErrors} ERRORES ENCONTRADOS*\n`
            errorReport += `🔧 Usa .autofix para intentar reparar automáticamente`
        }

        await conn.reply(m.chat, errorReport, m)

    } catch (e) {
        console.error('Error en checkerrors:', e)
        await conn.reply(m.chat, `❌ Error al ejecutar diagnóstico: ${e.message}`, m)
    }
}

handler.help = ['checkerrors', 'diagnostico']
handler.tags = ['admin', 'tools']
handler.command = ['checkerrors', 'diagnostico', 'checkbot', 'verificar']
handler.admin = true
handler.register = true

export default handler