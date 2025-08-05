
let handler = async (m, { conn, isROwner }) => {
    if (!isROwner) {
        return conn.reply(m.chat, '❌ Solo el propietario puede usar este comando.', m)
    }
    
    try {
        let errors = []
        let warnings = []
        let info = []
        
        // Verificar base de datos
        if (!global.db) {
            errors.push('❌ Base de datos no inicializada')
        } else {
            info.push('✅ Base de datos activa')
            
            // Verificar estructura de chats
            if (!global.db.data.chats) {
                errors.push('❌ Estructura de chats no encontrada')
            } else {
                let totalChats = Object.keys(global.db.data.chats).length
                let bannedChats = Object.values(global.db.data.chats).filter(chat => chat.isBanned).length
                info.push(`📊 Total chats: ${totalChats} (${bannedChats} baneados)`)
            }
            
            // Verificar estructura de usuarios
            if (!global.db.data.users) {
                errors.push('❌ Estructura de usuarios no encontrada')
            } else {
                let totalUsers = Object.keys(global.db.data.users).length
                let bannedUsers = Object.values(global.db.data.users).filter(user => user.banned).length
                info.push(`👥 Total usuarios: ${totalUsers} (${bannedUsers} baneados)`)
            }
        }
        
        // Verificar plugins críticos
        const criticalPlugins = [
            'grupo-banchat.js',
            'grupo-unbanchat.js',
            'Owner•banchat.js',
            'Owner•unbanchat.js',
            'Admin•resetconfig.js'
        ]
        
        for (let plugin of criticalPlugins) {
            if (!global.plugins[plugin]) {
                warnings.push(`⚠️ Plugin crítico no cargado: ${plugin}`)
            }
        }
        
        // Verificar configuración
        if (!global.opts) {
            errors.push('❌ Configuración global no encontrada')
        }
        
        // Verificar conexión
        if (!conn.user) {
            errors.push('❌ Bot no conectado correctamente')
        } else {
            info.push(`🤖 Bot conectado como: ${conn.user.name}`)
        }
        
        // Generar reporte
        let report = `🔍 *𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 ოძ  𝘽 ꂦ Ꮏ - DIAGNÓSTICO SISTEMA*\n\n`
        
        if (errors.length > 0) {
            report += `*🚨 ERRORES CRÍTICOS:*\n${errors.join('\n')}\n\n`
        }
        
        if (warnings.length > 0) {
            report += `*⚠️ ADVERTENCIAS:*\n${warnings.join('\n')}\n\n`
        }
        
        if (info.length > 0) {
            report += `*ℹ️ INFORMACIÓN:*\n${info.join('\n')}\n\n`
        }
        
        report += `*📊 RESUMEN:*\n`
        report += `• Errores: ${errors.length}\n`
        report += `• Advertencias: ${warnings.length}\n`
        report += `• Estado: ${errors.length === 0 ? '✅ Saludable' : '❌ Requiere atención'}\n\n`
        report += `_Fecha: ${new Date().toLocaleString()}_`
        
        await conn.reply(m.chat, report, m)
        
    } catch (e) {
        console.error('Error en systemcheck:', e)
        await conn.reply(m.chat, `❌ Error al realizar diagnóstico: ${e.message}`, m)
    }
}

handler.help = ['systemcheck', 'diagnostico']
handler.tags = ['owner']
handler.command = /^(systemcheck|diagnostico|checkbot)$/i
handler.rowner = true

export default handler
