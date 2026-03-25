/**
 * Global Configuration for WhatsApp MD Bot
 */

module.exports = {
    // Bot Owner Configuration
    ownerNumber: ['33753191305'], // ton numéro français sans + ni espaces
    ownerName: ['DENIZ'],         // ton nom
    
    // Bot Configuration
    botName: 'Cyber by Deniz',
    prefix: '.v ',
    sessionName: 'session',
    sessionID: process.env.SESSION_ID || '',
    newsletterJid: '', // tu peux mettre ton propre JID si tu veux
    updateZipUrl: '',  // optionnel, peut rester vide si pas de mise à jour automatique
    
    // Sticker Configuration
    packname: 'Cyber by Deniz',
    
    // Bot Behavior
    selfMode: false, 
    autoRead: false,
    autoTyping: false,
    autoBio: false,
    autoSticker: false,
    autoReact: false,
    autoReactMode: 'bot',
    autoDownload: false,
    
    // Group Settings Defaults
    defaultGroupSettings: {
      antilink: false,
      antilinkAction: 'delete',
      antitag: false,
      antitagAction: 'delete',
      antiall: false,
      antiviewonce: false,
      antibot: false,
      anticall: false,
      antigroupmention: false,
      antigroupmentionAction: 'delete',
      welcome: true,
      welcomeMessage: `╔════════════════╗
║ 👋 WELCOME!     ║
║   Cyber by     ║
║     Deniz      ║
╚════════════════╝

Salam @user! Mabruk 3lik 👏
Member Count: #memberCount
Time: time⏰

> Enjoy f group w t3alam mzyan!`,
      goodbye: true,
      goodbyeMessage: '👋 Bye @user! Ma nsawoukch!',
      antiSpam: false,
      antidelete: false,
      nsfw: false,
      detect: false,
      chatbot: false,
      autosticker: false
    },
    
    // API Keys (optionnel)
    apiKeys: {
      openai: '',
      deepai: '',
      remove_bg: ''
    },
    
    // Message Configuration en Darija (propre et lisible)
    messages: {
      wait: '⏳ Sbr shwiya...',
      success: '✅ Mzyan!',
      error: '❌ Kayn mochkil!',
      ownerOnly: '👑 Hadi dyal owner bark!',
      adminOnly: '🛡️ Hadi dyal admin bark!',
      groupOnly: '👥 Ghi f groupe!',
      privateOnly: '💬 F chat privé bark!',
      botAdminNeeded: '🤖 Ana khasni nkon admin!',
      invalidCommand: '❓ Commande ma kaynach! Ktib .v menu'
    },
    
    // Timezone
    timezone: 'Asia/Kolkata',
    
    // Limits
    maxWarnings: 3,
    
    // Social Links (optionnel)
    social: {
      github: '',
      instagram: '',
      youtube: ''
    }
}
