const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")
const P = require("pino")
const yts = require("yt-search")

const prefix = "."
const owner = "Deniz"

async function startBot(){

const { state, saveCreds } = await useMultiFileAuthState("session")

const sock = makeWASocket({
logger: P({ level: "silent" }),
auth: state
})

sock.ev.on("creds.update", saveCreds)

sock.ev.on("messages.upsert", async ({ messages }) => {

const msg = messages[0]
if(!msg.message) return

const from = msg.key.remoteJid

const body =
msg.message.conversation ||
msg.message.extendedTextMessage?.text ||
""

if(!body.startsWith(prefix)) return

const args = body.slice(1).trim().split(/ +/)
const command = args.shift().toLowerCase()

// MENU

if(command === "menu"){

let menu = `
salam 👋

ana bot dyal *${owner}*

📜 hadchi howa menu dyali (100 command)

---- MEDIA ----
.play
.song
.video
.ytmp3
.ytmp4
.tiktok
.instagram
.facebook
.sticker
.toimg

---- FUN ----
.joke
.meme
.quote
.truth
.dare
.rate
.ship
.roast
.facts
.hack

---- GROUP ----
.kick
.add
.promote
.demote
.tagall
.groupinfo
.linkgroup
.revoke
.mute
.unmute

---- TOOLS ----
.calc
.time
.weather
.translate
.qr
.readqr
.shortlink
.base64
.decode
.encode

---- SEARCH ----
.google
.youtube
.image
.wikipedia
.lyrics
.github
.npm

---- RANDOM ----
.cat
.dog
.waifu
.wallpaper
.anime
.couple
.coffee
.food
.car
.mountain

---- OWNER ----
.owner
.ping
.botinfo
.script
.runtime
.restart
.shutdown

type command b had tariqa

.menu
.song drake

marhba bik ❤️
`

sock.sendMessage(from,{text:menu})
}

// PING

if(command === "ping"){
sock.sendMessage(from,{text:"pong 🏓 bot khdam مزيان"})
}

// OWNER

if(command === "owner"){
sock.sendMessage(from,{text:"owner dyal bot howa Deniz 👑"})
}

// JOKE

if(command === "joke"){

const jokes = [
"wahed nhar wahed mchaa l doctor galih fin katwja3k galih f l facture 😂",
"wahed chra tv bla remote galih baghiha sport 🤣",
"wahed bgha yberred makla dkhelha l facebook 😭"
]

const random = jokes[Math.floor(Math.random()*jokes.length)]

sock.sendMessage(from,{text:random})
}

// QUOTE

if(command === "quote"){

const quotes = [
"sber miftah l faraj",
"lli bgha l3sel y sber l9riss n7el",
"khdem 3la rask w rbi ghadi y3awnek"
]

const q = quotes[Math.floor(Math.random()*quotes.length)]

sock.sendMessage(from,{text:q})

}

// SONG SEARCH

if(command === "song" || command === "play"){

if(!args[0]){
return sock.sendMessage(from,{
text:"kteb smiya dyal song\nexemple:\n.song drake"
})
}

let search = await yts(args.join(" "))
let video = search.videos[0]

sock.sendMessage(from,{
text:`🎵 l9it had song

${video.title}
${video.url}`
})

}

})

}

startBot()
