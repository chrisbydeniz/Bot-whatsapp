/**
 * Handler for Cyber by Deniz
 */

const { addOrUpdateUser, addXP, setPremium, getUser } = require('./database');
const axios = require('axios'); // pour téléchargements ou API
const fs = require('fs');

// Commandes et catégories
const commands = {
    general: {
        menu: {
            description: 'Afficher le menu principal',
            execute: (message, bot) => {
                return bot.sendMessage(message.from, '📜 Hna lmenu dyal Cyber by Deniz!\n- .v play <nom ou lien>\n- .v joke\n- .v owner\n...');
            }
        },
        help: {
            description: 'Alias de menu',
            execute: (message, bot) => commands.general.menu.execute(message, bot)
        },
        owner: {
            description: 'Info sur le propriétaire du bot',
            execute: async (message, bot) => {
                const userInfo = `👑 Owner: DENIZ\n📞 Number: +33 753191305`;
                return bot.sendMessage(message.from, userInfo);
            }
        },
        joke: {
            description: 'Raconter une blague',
            execute: (message, bot) => {
                return bot.sendMessage(message.from, '😂 Wahad lbout, ta3ya, mchaa lirostar trassou!');
            }
        }
    },

    media: {
        play: {
            description: 'Télécharger YouTube',
            execute: async (message, bot, args) => {
                if (!args[0]) return bot.sendMessage(message.from, '❌ Ktib lien ou nom dyal video!');
                const query = args.join(' ');
                // Ici, tu peux mettre un vrai call API pour télécharger
                return bot.sendMessage(message.from, `🎬 Video: ${query} (download simulé)`);
            }
        },
        tiktok: {
            description: 'Télécharger TikTok',
            execute: (message, bot) => {
                return bot.sendMessage(message.from, '🎵 TikTok download (simulé)');
            }
        },
        instagram: {
            description: 'Télécharger Instagram',
            execute: (message, bot) => {
                return bot.sendMessage(message.from, '📸 Insta download (simulé)');
            }
        }
    },

    games: {
        tictactoe: {
            description: 'Jouer au Tic Tac Toe',
            execute: (message, bot) => {
                return bot.sendMessage(message.from, '🎮 Tic Tac Toe: lancement du jeu...');
            }
        },
        rps: {
            description: 'Pierre Feuille Ciseaux',
            execute: (message, bot) => {
                return bot.sendMessage(message.from, '✊✋✌️ RPS lancé!');
            }
        }
        // ...ajouter plus de jeux ici
    },

    premium: {
        vipplay: {
            description: 'Commande premium pour vidéo',
            execute: (message, bot, args) => {
                const user = getUser(message.sender);
                if (!user || !user.premium) return bot.sendMessage(message.from, '⚠️ Hadi premium, tkhass XP ou premium!');
                return bot.sendMessage(message.from, '🎬 Premium play (simulé)');
            }
        }
        // ...ajouter les 19 autres commandes premium
    }
};

// Fonction principale pour gérer les messages
async function handleMessage(message, bot) {
    if (!message.body.startsWith('.v ')) return; // préfixe + espace obligatoire

    const text = message.body.slice(3).trim(); // enlever ".v "
    const [cmd, ...args] = text.split(/\s+/);

    // Ajouter l'utilisateur à la DB
    addOrUpdateUser(message.sender);
    addXP(message.sender, 10); // ajouter 10 XP par commande

    // Chercher la commande
    for (const category of Object.values(commands)) {
        if (category[cmd]) {
            return category[cmd].execute(message, bot, args);
        }
    }

    return bot.sendMessage(message.from, '❓ Commande ma kaynach! Ktib .v menu');
}

module.exports = handleMessage;
