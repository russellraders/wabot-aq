// Terimakasih kpd RC047 :v
// Fitur By Xteams
// Modified by Nurutomo (Update Xteam :v)

const { sticker } = require('../lib/sticker')
const defaultType = 'whatsapp'
let handler = async (m, { usedPrefix, conn, args, text }) => {
  let [tipe, emoji] = text.includes('|') ? text.split('|') : args
  if (tipe && !emoji) {
    emoji = tipe
    tipe = defaultType
  }
  if (!emoji) throw `Silahkan masukan emojinya\n\nMisal ${usedPrefix}semoji whatsapp 😎\n\nList Tipe:
- whatsapp
- facebook
- apple
- google
- microsoft`
  emoji = emoji.trim()
  tipe = tipe.trim().toLowerCase()

  let res = await fetch(global.API('xteam', '/sticker/emojitopng', { emo: emoji.trim() }, 'APIKEY'))
  if (!res.ok) throw res.text()
  let json = await res.json()
  if (!json.status) throw json
  if (!(tipe in json.result)) tipe = defaultType
  let stiker = await sticker(null, json.result[tipe], global.packname, global.author, emoji)
  //   m.reply(`
  // Tipe: ${tipe}
  // Emoji: ${emoji}
  // `.trim())
  m.reply(stiker)
}
handler.help = ['semoji [tipe] <emoji>']
handler.tags = ['sticker']
handler.command = /^s?emo(ji)?$/i
module.exports = handler
