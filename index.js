/**
 * Index.js for Cyber by Deniz
 * Point d'entrée du bot WhatsApp
 */

const { default: makeWASocket, useSingleFileAuthState, DisconnectReason } = require('@adiwajshing/baileys');
const P = require('pino');
const fs = require('fs');
const path = require('path');

const config = require('./config');
const handleMessage = require('./handler');
const { readDB, writeDB } = require('./database');

// Auth (pair code ou session)
const { state, saveState } = useSingleFileAuthState(path.join(__dirname, 'session.json'));

// Créer le socket WhatsApp
const startBot = () => {
    const sock = makeWASocket({
        logger: P({ level: 'silent' }),
        printQRInTerminal: false, // On utilise pair code
        auth: state
    });

    sock.ev.on('creds.update', saveState);

    // Gestion des messages entrants
    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type !== 'notify') return;
        const msg = messages[0];
        if (!msg.message || !msg.key.fromMe) {
            const messageContent = msg.message.conversation || msg.message.extendedTextMessage?.text;
            if (!messageContent) return;

            const message = {
                body: messageContent,
                from: msg.key.remoteJid,
                sender: msg.key.participant || msg.key.remoteJid
            };

            try {
                await handleMessage(message, sock);
            } catch (err) {
                console.error('Erreur dans handleMessage:', err);
            }
        }
    });

    // Gestion déconnexion / reconnexion
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            if ((lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut) {
                console.log('Reconnect...');
                startBot();
            } else {
                console.log('Déconnecté. Connecte toi à nouveau.');
            }
        } else if (connection === 'open') {
            console.log(`${config.botName} est connecté!`);
        }
    });

    return sock;
};

// Démarrer le bot
startBot();
