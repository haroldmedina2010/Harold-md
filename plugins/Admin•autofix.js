
let handler = async (m, { conn, isOwner, isAdmin }) => {
    if (!isAdmin && !isOwner) {
        return conn.reply(m.chat, '🚫 *Solo los administradores pueden usar este comando*', m)
    }

    try {
        await conn.reply(m.chat, '🔧 *Iniciando reparación automática del sistema...*', m)
        
        let fixedIssues = []
        let errors = []
        
        // Verificar y reparar base de datos
        try {
            if (!global.db) {
                global.db = { data: {} }
                fixedIssues.push('✅ Base de datos global inicializada')
            }
            
            if (!global.db.data) {
                global.db.data = {}
                fixedIssues.push('✅ Estructura de datos creada')
            }
            
            if (!global.db.data.chats) {
                global.db.data.chats = {}
                fixedIssues.push('✅ Configuración de chats inicializada')
            }
            
            if (!global.db.data.users) {
                global.db.data.users = {}
                fixedIssues.push('✅ Datos de usuarios inicializados')
            }
            
            if (!global.db.data.settings) {
                global.db.data.settings = {}
                fixedIssues.push('✅ Configuraciones del bot inicializadas')
            }
        } catch (e) {
            errors.push(`❌ Error reparando base de datos: ${e.message}`)
        }
        
        // Reparar configuración del chat actual
        if (m.isGroup) {
            try {
                let chat = global.db.data.chats[m.chat]
                if (!chat || typeof chat !== 'object') {
                    global.db.data.chats[m.chat] = {
                        isBanned: false,
                        welcome: true,
                        detect: true,
                        antiLink: false,
                        antiLink2: false,
                        antiBot: false,
                        antiBot2: false,
                        antifake: false,
                        nsfw: false,
                        autosticker: false,
                        autoresponder: false,
                        delete: false,
                        modoadmin: false,
                        autolevelup: false,
                        reaction: false,
                        expired: 0,
                        sAutoresponder: '',
                        per: []
                    }
                    fixedIssues.push('✅ Configuración del grupo reparada')
                } else {
                    // Verificar propiedades faltantes
                    let defaultConfig = {
                        isBanned: false,
                        welcome: true,
                        detect: true,
                        antiLink: false,
                        antiLink2: false,
                        antiBot: false,
                        antiBot2: false,
                        antifake: false,
                        nsfw: false,
                        autosticker: false,
                        autoresponder: false,
                        delete: false,
                        modoadmin: false,
                        autolevelup: false,
                        reaction: false,
                        expired: 0,
                        sAutoresponder: '',
                        per: []
                    }
                    
                    let fixed = false
                    for (let [key, value] of Object.entries(defaultConfig)) {
                        if (!(key in chat)) {
                            chat[key] = value
                            fixed = true
                        }
                    }
                    
                    if (fixed) {
                        fixedIssues.push('✅ Propiedades faltantes del grupo añadidas')
                    }
                }
            } catch (e) {
                errors.push(`❌ Error reparando configuración del grupo: ${e.message}`)
            }
        }
        
        // Reparar configuración del usuario
        try {
            let user = global.db.data.users[m.sender]
            if (!user || typeof user !== 'object') {
                global.db.data.users[m.sender] = {
                    afkTime: -1,
                    afkReason: '',
                    limit: 20,
                    exp: 0,
                    level: 0,
                    role: 'Novato',
                    registered: false,
                    premium: false,
                    premiumTime: 0
                }
                fixedIssues.push('✅ Configuración del usuario reparada')
            }
        } catch (e) {
            errors.push(`❌ Error reparando configuración del usuario: ${e.message}`)
        }
        
        // Reparar configuración del bot
        try {
            let botConfig = global.db.data.settings[conn.user.jid]
            if (!botConfig || typeof botConfig !== 'object') {
                global.db.data.settings[conn.user.jid] = {
                    self: false,
                    restrict: true,
                    jadibotmd: true,
                    antiPrivate: false,
                    autoread: false,
                    status: 0
                }
                fixedIssues.push('✅ Configuración del bot reparada')
            }
        } catch (e) {
            errors.push(`❌ Error reparando configuración del bot: ${e.message}`)
        }
        
        // Generar reporte
        let repairReport = `🔧 *REPARACIÓN AUTOMÁTICA COMPLETADA*\n\n`
        repairReport += `*Bot:* 𝙎𝙃𝙊𝙔𝙊 𝙃𝙄𝙉𝘼𝙏𝘼 ოძ 𝘽 ꂦ Ꮏ\n`
        repairReport += `*Fecha:* ${new Date().toLocaleString()}\n`
        repairReport += `*Chat:* ${m.isGroup ? await conn.getName(m.chat) : 'Privado'}\n\n`
        
        if (fixedIssues.length > 0) {
            repairReport += `✅ *PROBLEMAS REPARADOS:*\n`
            repairReport += fixedIssues.join('\n') + '\n\n'
        }
        
        if (errors.length > 0) {
            repairReport += `❌ *ERRORES NO REPARABLES:*\n`
            repairReport += errors.join('\n') + '\n\n'
        }
        
        if (fixedIssues.length === 0 && errors.length === 0) {
            repairReport += `🎉 *No se encontraron problemas que reparar*\n`
            repairReport += `✅ El sistema está funcionando correctamente`
        } else if (fixedIssues.length > 0 && errors.length === 0) {
            repairReport += `🎉 *REPARACIÓN EXITOSA*\n`
            repairReport += `✅ Todos los problemas fueron solucionados`
        } else {
            repairReport += `⚠️ *REPARACIÓN PARCIAL*\n`
            repairReport += `🔧 Algunos problemas requieren intervención manual`
        }
        
        await conn.reply(m.chat, repairReport, m)
        
    } catch (e) {
        console.error('Error en autofix:', e)
        await conn.reply(m.chat, `❌ Error durante la reparación: ${e.message}`, m)
    }
}

handler.help = ['autofix', 'reparar']
handler.tags = ['admin', 'tools']
handler.command = ['autofix', 'reparar', 'fix', 'arreglar']
handler.admin = true
handler.register = true

export default handler
