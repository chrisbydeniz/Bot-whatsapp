/**
 * Simple JSON Database for Cyber by Deniz
 */

const fs = require('fs');
const path = require('path');

// Chemin du fichier de la base de données
const dbPath = path.join(__dirname, 'users.json');

// Initialisation du fichier si il n'existe pas
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ users: [] }, null, 2));
}

// Fonction pour lire la DB
function readDB() {
    const raw = fs.readFileSync(dbPath);
    return JSON.parse(raw);
}

// Fonction pour sauvegarder la DB
function writeDB(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// Ajouter un utilisateur ou le mettre à jour
function addOrUpdateUser(jid) {
    const db = readDB();
    let user = db.users.find(u => u.jid === jid);
    if (!user) {
        user = {
            jid,
            xp: 0,
            level: 1,
            premium: false
        };
        db.users.push(user);
    }
    writeDB(db);
    return user;
}

// Ajouter de l'XP à un utilisateur
function addXP(jid, amount = 1) {
    const db = readDB();
    let user = db.users.find(u => u.jid === jid);
    if (!user) {
        user = addOrUpdateUser(jid);
    }
    user.xp += amount;
    // Exemple : 100 XP = niveau supérieur
    if (user.xp >= user.level * 100) {
        user.level += 1;
        user.xp = 0; // reset XP après montée de niveau
    }
    writeDB(db);
    return user;
}

// Mettre premium
function setPremium(jid, status = true) {
    const db = readDB();
    let user = db.users.find(u => u.jid === jid);
    if (!user) {
        user = addOrUpdateUser(jid);
    }
    user.premium = status;
    writeDB(db);
    return user;
}

// Récupérer info utilisateur
function getUser(jid) {
    const db = readDB();
    return db.users.find(u => u.jid === jid) || null;
}

module.exports = {
    readDB,
    writeDB,
    addOrUpdateUser,
    addXP,
    setPremium,
    getUser
};
