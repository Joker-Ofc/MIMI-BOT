let handler = m => m
handler.all = async function (m, conn) {
    var vn = "https://github.com/Joker-Ofc/MIMI-BOTraw/main/Assets/mp3/Alive.mp3"
    let url = "https://chat.whatsapp.com/FznwSTj1n7d7TMR3SkX3uC"
    let murl = "https://wa.me/923474187615"
    let hash = global.mimibot
    let img = "https://i.imgur.com/8ltcrED.jpeg"
    let num = "923474187615"

    let doc = {
        audio: {
          url: vn
        },
        mimetype: 'audio/mpeg',
        ptt: true,
        waveform: [0,99,0,99,0,99,0],
        fileName: "Guru",
    
        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
          title: "↺ |◁   II   ▷| ♡",
          body: hash,
          thumbnailUrl: img,
          sourceUrl: url,
          mediaType: 2,
          mediaUrl: murl,
         // renderLargerThumbnail: true,
          showAdAttribution: true
          }}
      };
	
    let phoneNumber = '';
    if (m.mentionedJid && m.mentionedJid[0]) {
        phoneNumber = m.mentionedJid[0].replace(/[^0-9]/g, '');
        if (phoneNumber === num) {
          return this.sendMessage(m.chat, doc, { quoted: m });
        }
      } else {
        return
      }
}
export default handler
