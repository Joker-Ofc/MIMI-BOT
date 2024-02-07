import {
    promises,
    readFileSync
   } from "fs"
   import {
    join
   } from "path"
   import {
    xpRange
   } from "../lib/levelling.js"
   import moment from "moment-timezone"
   import os from "os"

  
   let groupmenu = `
   ✦ ───『 *ɢʀᴏᴜᴘ* 』─── ⚝
  𓇼 .ɢᴇᴛʙɪᴏ <@ᴛᴀɢ/ʀᴇᴘʟʏ>  Ⓛ
  𓇼 .ᴀɴɪᴍᴇϙᴜᴏᴛᴇ
  𓇼 .Sᴇᴛᴅᴇsᴄ <ᴛᴇxᴛ>
  𓇼 .sᴇᴛɴᴀᴍᴇ <ᴛᴇxᴛ>
  𓇼 .ᴀᴅᴅ
  𓇼 .ᴅᴇʟᴇᴛᴇ
  𓇼 .ᴅᴇʟᴡᴀʀɴ @ᴜsᴇʀ
  𓇼 .ᴅᴇᴍᴏᴛᴇ (@ᴛᴀɢ)
  𓇼 .ɪɴғᴏɢᴘ
  𓇼 .ʜɪᴅᴇᴛᴀɢ
  𓇼 .ɪɴᴠɪᴛᴇ <923xxx>
  𓇼 .ᴋɪᴄᴋ @ᴜsᴇʀ
  𓇼 .ʟɪɴᴋ
  𓇼 .ᴘᴏʟʟ ϙᴜᴇsᴛɪᴏɴ|ᴏᴘᴛɪᴏɴ|ᴏᴘᴛɪᴏɴ
  𓇼 .ᴘʀᴏғɪʟᴇ
  𓇼 .ᴘʀᴏᴍᴏᴛᴇ
  𓇼 .ʀᴇsᴇᴛʟɪɴᴋ
  𓇼 .sᴇᴛʙʏᴇ <ᴛᴇxᴛ>
  𓇼 .ɢʀᴏᴜᴘ *ᴏᴘᴇɴ/ᴄʟᴏsᴇ*
  𓇼 .sᴇᴛᴡᴇʟᴄᴏᴍᴇ <ᴛᴇxᴛ>
  𓇼 .sɪᴍᴜʟᴀᴛᴇ <ᴇᴠᴇɴᴛ> @ᴜsᴇʀ
  𓇼 .sᴛᴀғғ
  𓇼 .ᴛᴀɢᴀʟʟ
  𓇼 .ᴛᴏᴛᴀɢ
  𓇼 .ᴡᴀʀɴ @ᴜsᴇʀ
  𓇼 .ᴡᴀʀɴs
  𓇼 .ᴍᴀɪɴ
  ╰──────────⳹`
  
  let ownermenu = `
  ✦ ───『 *ᴏᴡɴᴇʀ* 』─── ⚝
  𓇼 .ᴀᴅᴅᴘʀᴇᴍ <@ᴛᴀɢ>
  𓇼 .ᴀᴅᴅᴏᴡɴᴇʀ @ᴜsᴇʀ
  𓇼 .ᴀʟʟᴏᴡ <@ᴛᴀɢ>
  𓇼 .HEROKU
  𓇼 .ʙᴀɴ @ᴜsᴇʀ
  𓇼 .ʙᴀɴᴄʜᴀᴛ
  𓇼 .ᴛx
  𓇼 .ʙʀᴏᴀᴅᴄᴀsᴛɢʀᴏᴜᴘ <ᴛᴇxᴛ>
  𓇼 .ʙᴄɢᴄ <ᴛᴇxᴛ>
  𓇼 .ᴄʟᴇᴀʀᴛᴍᴘ
  𓇼 .ᴅᴇʟᴇxᴘɪʀᴇᴅ
  𓇼 .ᴅᴇʟᴘʀᴇᴍ @ᴜsᴇʀ
  𓇼 .ʀᴇᴍᴏᴠᴇᴏᴡɴᴇʀ @ᴜsᴇʀ
  𓇼 .sᴇᴛᴘᴘʙᴏᴛғᴜʟʟ
  𓇼 .ɢᴇᴛᴘʟᴜɢɪɴ <ɴᴀᴍᴇ ғɪʟᴇ>
  𓇼 .ɢᴇᴛғɪʟᴇ <ɴᴀᴍᴇ ғɪʟᴇ>
  𓇼 .ᴊᴏɪɴ <ᴄʜᴀᴛ.ᴡʜᴀᴛsᴀᴘᴘ.ᴄᴏᴍ> <ᴅɪᴀs>
  𓇼 .ʀᴇsᴇᴛ <54xxx>
  𓇼 .ʀᴇsᴇᴛᴘʀᴇғɪx
  𓇼 .ʀᴇsᴛᴀʀᴛ
  𓇼 ..sᴇᴛᴘʀᴇғɪx
  𓇼 ..sᴇᴛᴘʀᴇғɪx [sʏᴍʙᴏʟ]
  𓇼 .ᴜɴʙᴀɴ @ᴜsᴇʀ
  𓇼 .ᴜɴʙᴀɴᴄʜᴀᴛ
  𓇼 .ᴜᴘᴅᴀᴛᴇ
  𓇼 .ᴄᴏɴғɪɢ
  𓇼 .ʟɪsᴛʙᴀɴ
  𓇼 .ᴅᴇʟᴇᴛᴇᴘʟᴜɢɪɴ <ɴᴀᴍᴇ>
  ╰──────────⳹`
  
  let funmenu = `
  ✦ ───『 *ғᴜɴ* 』─── ⚝
  𓇼 .ᴀғᴋ <ʀᴇᴀsᴏɴ>
  𓇼 .ᴛᴏᴍᴘ3
  𓇼 .ᴛᴏᴀᴠ
  𓇼 .ʙᴏᴛ
  𓇼 .ᴄʜᴀʀᴀᴄᴛᴇʀ @ᴛᴀɢ
  𓇼 .ᴅᴀʀᴇ
  𓇼 .ғʟɪʀᴛ
  𓇼 .ɢᴀʏ @ᴜsᴇʀ
  𓇼 .ᴘɪᴄᴋᴜᴘʟɪɴᴇ
  𓇼 .ϙᴜᴇsᴛɪᴏɴ
  𓇼 .sʜᴀʏᴀʀɪ
  𓇼 .sʜɪᴘ
  𓇼 .ʏᴏᴍᴀᴍᴀᴊᴏᴋᴇ
  𓇼 .ᴛʀᴜᴛʜ
  𓇼 .ᴡᴀsᴛᴇ @ᴜsᴇʀ
  𓇼 .ɪᴍᴀɢᴇ
  𓇼 .ᴍᴇᴍᴇ
  𓇼 .ϙᴜᴏᴛᴇ
  ╰──────────⳹`
  
  let reactmenu = `
  ✦ ───『 *ʀᴇᴀᴄᴛɪᴏɴ* 』─── ⚝
  𓇼 .ʙᴜʟʟʏ @ᴛᴀɢ
  𓇼 .ᴄᴜᴅᴅʟᴇ @ᴛᴀɢ
  𓇼 .ᴄʀʏ @ᴛᴀɢ
  𓇼 .ʜᴜɢ @ᴛᴀɢ
  𓇼 .ᴀᴡᴏᴏ @ᴛᴀɢ
  𓇼 .ᴋɪss @ᴛᴀɢ
  𓇼 .ʟɪᴄᴋ @ᴛᴀɢ
  𓇼 .ᴘᴀᴛ @ᴛᴀɢ
  𓇼 .sᴍᴜɢ @ᴛᴀɢ
  𓇼 .ʙᴏɴᴋ @ᴛᴀɢ
  𓇼 .ʏᴇᴇᴛ @ᴛᴀɢ
  𓇼 .ʙʟᴜsʜ @ᴛᴀɢ
  𓇼 .sᴍɪʟᴇ @ᴛᴀɢ
  𓇼 .ᴡᴀᴠᴇ @ᴛᴀɢ
  𓇼 .ʜɪɢʜғɪᴠᴇ @ᴛᴀɢ
  𓇼 .ʜᴀɴᴅʜᴏʟᴅ @ᴛᴀɢ
  𓇼 .ɴᴏᴍ @ᴛᴀɢ
  𓇼 .ʙɪᴛᴇ @ᴛᴀɢ
  𓇼 .ɢʟᴏᴍᴘ @ᴛᴀɢ
  𓇼 .sʟᴀᴘ @ᴛᴀɢ
  𓇼 .ᴋɪʟʟ @ᴛᴀɢ
  𓇼 .ʜᴀᴘᴘʏ @ᴛᴀɢ
  𓇼 .ᴡɪɴᴋ @ᴛᴀɢ
  𓇼 .ᴘᴏᴋᴇ @ᴛᴀɢ
  𓇼 .ᴅᴀɴᴄᴇ @ᴛᴀɢ
  𓇼 .ᴄʀɪɴɢᴇ @ᴛᴀɢ
  ╰──────────⳹`
  
  let dlmenu = `
  ✦ ───『 *ᴅᴏᴡɴʟᴏᴀᴅᴇʀ* 』───⋆ •
  │𓇼 .ғᴀᴄᴇʙᴏᴏᴋ <ᴜʀʟ>
  │𓇼 .ɢᴅʀɪᴠᴇ <ᴜʀʟ>
  │𓇼 .ɢɪᴛᴄʟᴏɴᴇ <ᴜʀʟ>
  │𓇼 .ɪɢsᴛᴀʟᴋ
  │𓇼 .ɪɴsᴛᴀɢʀᴀᴍ
  │𓇼 .ᴍᴇᴅɪᴀғɪʀᴇ <ᴜʀʟ>
  │𓇼 .ᴍᴇɢᴀ
  │𓇼 .ᴍᴏᴅᴀᴘᴋ
  │𓇼 .ᴘʟᴀʏ <ϙᴜᴇʀʏ>
  │𓇼 .ᴘʟᴀʏʏ <ᴛᴇxᴛ>
  │𓇼 .ᴠɪᴅᴇᴏ <ᴛᴇxᴛ>
  │𓇼 .ᴛɪᴋᴛᴏᴋ <ᴜʀʟ>
  │𓇼 .ᴛɪᴋᴛᴏᴋsᴛᴀʟᴋ
  │𓇼 .ᴛᴡɪᴛᴛᴇʀ <ᴜʀʟ>
  │𓇼 .ʏᴛᴀ <ᴜʀʟ>
  │𓇼 .ʏᴛᴅʟ <ᴜʀʟ>
  │𓇼 .ʏᴛᴠ <ᴜʀʟ>
  │𓇼 .ʏᴛᴍᴘ3 <ᴜʀʟ>
  │𓇼 .ʏᴛsᴇᴀʀᴄʜ <ϙᴜᴇʀʏ>
  │𓇼 .ʏᴛᴍᴘ4 <ʏᴛ-ʟɪɴᴋ>
  │𓇼 .ᴡᴀʟʟᴘᴀᴘᴇʀ <ϙᴜᴇʀʏ>
  ╰━━━━━━━━━━━━━━━━━━━━╯`
  
  let gamemenu = `
  ✦ ───『 *ɢᴀᴍᴇ* 』─── ⚝
  𓇼 .sʟᴏᴛ <ᴀᴍᴏᴜɴᴛ>
  𓇼 .ᴄʜᴇss [ғʀᴏᴍ ᴛᴏ]
  𓇼 .ᴄʜᴇss ᴅᴇʟᴇᴛᴇ
  𓇼 .ᴄʜᴇss ᴊᴏɪɴ
  𓇼 .ᴄʜᴇss sᴛᴀʀᴛ
  𓇼 .ᴅᴇʟᴛᴛᴛ
  𓇼 .ɢᴜᴇssғʟᴀɢ
  𓇼 .Mᴀᴛʜs <ᴍᴏᴅᴇs>
  𓇼 .ᴘᴘᴛ <ʀᴏᴄᴋ/ᴘᴀᴘᴇʀ/sᴄɪssᴏʀs>
  𓇼 .ᴛɪᴄᴛᴀᴄᴛᴏᴇ <ᴛᴀɢ ɴᴜᴍʙᴇʀ>
  ╰──────────⳹`

  let logomenu = `
  ✦ ───『 *ᴍᴀᴋᴇʀ* 』─── ⚝
  𓇼 .ʙʟᴜʀ
  𓇼 .ᴅɪғᴜᴍɪɴᴀʀ2
  𓇼 .ʜᴏʀɴʏᴄᴀʀᴅ
  𓇼 .ʜᴏʀɴʏʟɪᴄᴇɴsᴇ
  𓇼 .ɢғx1
  𓇼 .ɢғx2
  𓇼 .ɢғx3
  𓇼 .ɢғx4
  𓇼 .ɢғx5
  𓇼 .ɢғx6
  𓇼 .ɢғx7
  𓇼 .ɢғx8
  𓇼 .ɢғx9
  𓇼 .ɢғx10
  𓇼 .ɢғx11
  𓇼 .ɢғx12
  𓇼 .sɪᴍᴘᴄᴀʀᴅ
  𓇼 .ɪᴛssᴏsᴛᴜᴘɪᴅ
  𓇼 .ɪss
  𓇼 .sᴛᴜᴘɪᴅ
  𓇼 .ᴛᴡᴇᴇᴛ <ᴄᴏᴍᴍᴇɴᴛ>
  𓇼 .ʟᴏʟɪᴄᴏɴ
  𓇼 .ʏᴛᴄᴏᴍᴍᴇɴᴛ <ᴄᴏᴍᴍᴇɴᴛ>
  ╰──────────⳹`
  
  let stickermenu = `
  🪐 ───『 *sᴛɪᴄᴋᴇʀ* 』─── 🪐
  𓇼 .ᴇᴍᴏᴊɪᴍɪx <ᴇᴍᴏᴊɪ+ᴇᴍᴏᴊɪ>
  𓇼 .ɢᴇᴛsᴛɪᴄᴋᴇʀ
  𓇼 .sᴍᴀᴋᴇʀ
  𓇼 .sᴛɪᴄᴋᴇʀᴡɪᴛʜᴍᴇᴍᴇ (ᴄᴀᴘᴛɪᴏɴ|ʀᴇᴘʟʏ ᴍᴇᴅɪᴀ)
  𓇼 .sᴡᴍᴇᴍᴇ <ᴜʀʟ>
  𓇼 .sᴡᴍ(ᴄᴀᴘᴛɪᴏɴ|ʀᴇᴘʟʏ ᴍᴇᴅɪᴀ)
  𓇼 .sғᴜʟʟ
  𓇼 .ᴛᴏɪᴍɢ <sᴛɪᴄᴋᴇʀ>
  𓇼 .ᴛᴏᴠɪᴅ
  𓇼 .ᴛʀɪɢɢᴇʀ <@ᴜsᴇʀ>
  𓇼 .ᴛᴛᴘ
  𓇼 .ᴛᴛᴘ2
  𓇼 .ᴛᴛᴘ3
  𓇼 .ᴛᴛᴘ4
  𓇼 .ᴛᴛᴘ5
  𓇼 .ᴀᴛᴛᴘ
  𓇼 .ᴀᴛᴛᴘ2
  𓇼 .ᴀᴛᴛᴘ3
  𓇼 .ᴛᴀᴋᴇ <ɴᴀᴍᴇ>|<ᴀᴜᴛʜᴏʀ>
  ╰──────────⳹`
  
  let audiomenu = `
  🪐 ───『 *ᴀᴜᴅɪᴏ* 』─── 🪐
  𓇼 .ʙᴀss [ᴠɴ]
  𓇼 .ʙʟᴏᴡɴ [ᴠɴ]
  𓇼 .ᴅᴇᴇᴘ [ᴠɴ]
  𓇼 .ᴇᴀʀʀᴀᴘᴇ [ᴠɴ]
  𓇼 .ғᴀsᴛ [ᴠɴ]
  𓇼 .ғᴀᴛ [ᴠɴ]
  𓇼 .ɴɪɢʜᴛᴄᴏʀᴇ [ᴠɴ]
  𓇼 .ʀᴇᴠᴇʀsᴇ [ᴠɴ]
  𓇼 .ʀᴏʙᴏᴛ [ᴠɴ]
  𓇼 .sʟᴏᴡ [ᴠɴ]
  𓇼 .sᴍᴏᴏᴛʜ [ᴠɴ]
  𓇼 .ᴛᴜᴘᴀɪ [ᴠɴ]
  ╰──────────⳹`
  
  
  let newsmenu = `
  ✦ ───『 *ɴᴇᴡs* 』─── ⚝
  𓇼 .ɴᴇᴡs
  𓇼 .ᴛᴇᴄʜɴᴇᴡs
  𓇼 .ɴᴅᴛᴠ
  ╰──────────⳹
  `
  
  let toolsmenu = `
  🪐 ───『 *ᴛᴏᴏʟs* 』─── 🪐
  🪐 .ɴᴏᴡᴀ
  🪐 .ϙʀ <ᴛᴇxᴛ>
  🪐 .ϙʀᴄᴏᴅᴇ <ᴛᴇxᴛ>
  🪐 .sᴛʏʟᴇ <ᴋᴇʏ> <ᴛᴇxᴛ>
  🪐 .ᴡᴇᴀᴛʜᴇʀ *<ᴘʟᴀᴄᴇ>*
  🪐 .ᴅᴇʜᴀᴢᴇ
  🪐 .ʀᴇᴄᴏʟᴏʀ
  🪐 .ʜᴅʀ
  🪐 .ʟᴇɴɢᴛʜ <ᴀᴍᴏᴜɴᴛ>
  🪐 .ᴛɪɴʏᴜʀʟ <ʟɪɴᴋ>
  🪐 .sʜᴏʀᴛᴇɴ <ʟɪɴᴋ>
  🪐 .ᴛᴇᴍᴘᴍᴀɪʟ
  🪐 .sʜᴀᴢᴀᴍ
  🪐 .ᴄᴀʟ <ᴇϙᴜᴀᴛɪᴏɴ>
  🪐 .ᴄᴀʀʙᴏɴ <ᴄᴏᴅᴇ>
  🪐 .ᴅᴇғɪɴᴇ <ᴡᴏʀᴅ>
  🪐 .ᴇʟᴇᴍᴇɴᴛ
  🪐 .ɢᴏᴏɢʟᴇ
  🪐 .ɪᴛᴜɴᴇs
  🪐 .ʟʏʀɪᴄs
  🪐 .ɪᴍᴅʙ
  🪐 .ᴄᴏᴜʀsᴇ
  🪐 .ʀᴀɴᴅᴏᴍᴄᴏᴜʀsᴇ
  🪐 .ʀᴇᴀᴅᴍᴏʀᴇ <ᴛᴇxᴛ1>|<ᴛᴇxᴛ2>
  🪐 .ʀᴇᴀᴅᴠᴏ
  🪐 .ʀᴇᴍᴏᴠᴇʙɢ
  🪐 .ss <ᴜʀʟ>
  🪐 .ssғ <ᴜʀʟ>
  🪐 .sᴜʙʀᴇᴅᴅɪᴛ
  🪐 .ᴛᴇʟᴇsᴛɪᴄᴋᴇʀ  Ⓛ
  🪐 .ᴛᴏᴜʀʟ
  🪐 .ᴛʀᴀɴsʟᴀᴛᴇ <ʟᴀɴɢ> <ᴛᴇxᴛ>
  🪐 .ᴛʀᴜᴇ
  🪐 .ᴛᴛs <ʟᴀɴɢ> <ᴛᴀsᴋ>
  🪐 .ᴡᴀ
  🪐 .ᴡɪᴋɪᴘᴇᴅɪᴀ
  ╰━━━━━━━━━━━━━━━━━━━━╯`
  
  let Aimenu = `
  🪐 ───『 *AI* 』─── 🪐
  🪐.ʙɪɴɢ
  🪐.ᴅᴀʟʟᴇ
  🪐.ɢᴘᴛ
  🪐.ᴛᴏᴀɴɪᴍᴇ
  🪐.ᴛᴏᴄᴀʀᴛᴏᴏɴ
  🪐.ᴀɪ
  🪐.ʙᴀʀᴅ
  🪐.ᴀʟᴇxᴀ
  🪐.ɢᴘᴛ2
  ╰━━━━━━━━━━━━━━━━╯
  `
  let religionmenu = `
  ✦ ───『 *ʀᴇʟɪɢɪᴏɴ* 』─── ⚝
  𓇼 .ϙᴜʀᴀɴᴍᴇɴᴜ ғᴏʀ ɢᴇᴛᴛɪɴɢ ɴᴜᴍʙᴇʀ
  𓇼 .ϙᴜʀᴀɴ [sᴜʀᴀʜ_ɴᴜᴍʙᴇʀ|sᴜʀᴀʜ_ɴᴀᴍᴇ]
  ╰──────────⳹`

  let studymenu = `╭━━⊱•🪐 *sᴛᴜᴅʏᴍᴇɴᴜ* 🪐•⊱━━╮
│⋆ • .ϙᴜʀᴀɴᴍᴇɴᴜ
│⋆ • .sᴜʀᴀʜ 36  
│⋆ • .ɢᴘᴛ
│⋆ • .ɢᴘᴛ2    
│⋆ • .ʙɪɴɢ  
│⋆ • .ʙᴀʀᴅ 
│⋆ • .ϙᴜᴏᴛᴇ  
│⋆ • .ᴀɪsᴇᴀʀᴄʜ 
│⋆ • .ᴅᴇғɪɴᴇ
│⋆ • .ᴇʟᴇᴍᴇɴᴛ
╰━━━━━━━━━━━━━━━━━━━━━━╯`
  
  let botmenu = `
  🪐 ───『 *Bᴏᴛ Mᴇɴᴜ* 』─── 🪐
  🪐 .ᴘɪɴɢ
  🪐 .ʀᴜɴᴛɪᴍᴇ
  🪐 .sᴄʀɪᴘᴛ
  🪐 .sᴇʀᴠᴇʀ
  🪐 .ʙʟᴏᴄᴋʟɪsᴛ
  🪐 .ᴀʟɪᴠᴇ
  🪐 .ɪɴғᴏ
  🪐 .ᴏᴡɴᴇʀ
  🪐 .ᴛᴏᴛᴀʟғᴇᴀᴛᴜʀᴇ
  🪐 .ʟɪsᴛ
  🪐 .ᴄʀɪsᴛɪᴀɴᴏʀᴏɴᴀʟᴅᴏ
  🪐 .ᴄʀ7
  🪐 .ᴘᴘᴄᴏᴜᴘʟᴇ 
  🪐 .ᴘᴘᴄᴘ
  🪐 .ᴘɪɴᴛᴇʀᴇsᴛ
  🪐 .ᴍʏsɴ
  ╰━━━━━━━━━━━━━━━━━━━╯
  `
  let pluginmenu = `
  ✦ ───『 *ᴘʟᴜɢɪɴ* 』─── ⚝
  𓇼 .ᴘʟᴜɢɪɴs
  𓇼 .ɪɴsᴛᴀʟʟ <Gɪsᴛ URL>
  ╰──────────⳹
  `

  const handler = async (m, {
    conn,
    command,
    text,
    args,
    usedPrefix
  }) => {
    
  
   let glb = global.db.data.users
   let usrs = glb[m.sender]
   let tag = `@${m.sender.split("@")[0]}`
   let mode = global.opts["self"] ? "Private" : "Public"
   
   let {
  age,
  exp,
  limit,
  level,
  role,
  registered,
  credit
   } = glb[m.sender]
   let {
  min,
  xp,
  max
   } = xpRange(level, global.multiplier)
   let name = await conn.getName(m.sender)
   let premium = glb[m.sender].premiumTime
   let prems = `${premium > 0 ? "Premium": "Free"}`
   let platform = os.platform()
  
  
   let ucpn = `${ucapan()}`
  
   let _uptime = process.uptime() * 1000
   let _muptime
   if (process.send) {
  process.send("uptime")
  _muptime = await new Promise(resolve => {
  process.once("message", resolve)
  setTimeout(resolve, 1000)
  }) * 1000
   }
   let muptime = clockString(_muptime)
   let uptime = clockString(_uptime)
  
   
   let totalfeatures = Object.values(global.plugins).filter((v) => v.help && v.tags).length;
   let totalreg = Object.keys(glb).length
  
    conn.gurumenu = conn.gurumenu ? conn.gurumenu : {};
    
   
    global.fcontact = { key: { fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: 'status@broadcast' }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
    const infoText = `
   🪐 ${botname} 🪐\n
    Hᴀɪɪɪ ${name}👋🏻
    
     ${readMore}

  ╭━━━━⊱⊱『 *INFO*』⊱⊱⊱━━━━━╮ 
  │ *Rᴇᴘʟʏ ᴡɪᴛʜ ᴛʜᴇ ɴᴜᴍʙᴇʀ*
  │ *ᴛᴏ ɢᴇᴛ ᴍᴇɴᴜ*
  ╰───────⳹

  
  ╭━━⊱━━⊱⊱「ᴀʟʟ ᴍᴇɴᴜs」⊱⊱━━⊱━╮
  │⋆ • -  *1.* ʙᴏᴛ ᴍᴇɴᴜ
  │⋆ • -  *2.* ᴏᴡɴᴇʀ ᴍᴇɴᴜ
  │⋆ • -  *3.* ɢʀᴏᴜᴘ ᴍᴇɴᴜ
  │⋆ • -  *4.* ғᴜɴ ᴍᴇɴᴜ
  │⋆ • -  *5.* ʀᴇᴀᴄᴛɪᴏɴ ᴍᴇɴᴜ
  │⋆ • -  *6.* ᴅᴏᴡɴʟᴏᴀᴅᴇʀ ᴍᴇɴᴜ
  │⋆ • -  *7.* ɢᴀᴍᴇ ᴍᴇɴᴜ
  │⋆ • -  *8.* ʟᴏɢᴏ ᴍᴇɴᴜ
  │⋆ • -  *9.* sᴛɪᴄᴋᴇʀ ᴍᴇɴᴜ
  │⋆ • -  *10.* ᴀᴜᴅɪᴏ ᴍᴇɴᴜ
  │⋆ • -  *11.* ɴᴇᴡs ᴍᴇɴᴜ
  │⋆ • -  *12.* sᴛᴜᴅʏ ᴍᴇɴᴜ
  │⋆ • -  *13.* ᴛᴏᴏʟs ᴍᴇɴᴜ
  │⋆ • -  *14.* ᴀɪ ᴍᴇɴᴜ
  │⋆ • -  *15.* ʀᴇʟɪɢɪᴏɴ ᴍᴇɴᴜ
  │⋆ • -  *16.* ᴘʟᴜɢɪɴ ᴍᴇɴᴜ
  ╰━━━━━━━━━━━━━━━━━━━━╯`
;

  
  const { result, key, timeout } = await conn.sendMessage(m.chat, { video: { url: menuvid }, caption: infoText.trim(),  gifPlayback: true,
  gifAttribution: 0}, { quoted: m})
  
  // Save the menu options to gurumenu
  conn.gurumenu[m.sender] = {
    result,
    key,
    timeout: setTimeout(() => {
      conn.sendMessage(m.chat, {
          delete: key
      });
      delete conn.gurumenu[m.sender];
  }, 180 * 1000),
  };
  };
  
 
  handler.before = async (m, { conn }) => {
    conn.gurumenu = conn.gurumenu ? conn.gurumenu : {};
    if (m.isBaileys || !(m.sender in conn.gurumenu)) return;
    const { result, key, timeout } = conn.gurumenu[m.sender];
    if (!m.quoted || m.quoted.id !== key.id || !m.text) return;
    const choice = m.text.trim();
    
    if (choice === "1") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.ibb.co/f0P1pqq/img12.jpg' },
        caption: botmenu
      }, { quoted: m});
      } else if (choice === "2") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.ibb.co/f0P1pqq/img12.jpg' },
        caption: ownermenu
      }, { quoted: m});
      } else if (choice === "3") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.ibb.co/f0P1pqq/img12.jpg' },
        caption: groupmenu
      }, { quoted: m});
      } else if (choice === "4") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.ibb.co/f0P1pqq/img12.jpg' },
        caption: funmenu
      }, { quoted: m});
      } else if (choice === "5") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.ibb.co/f0P1pqq/img12.jpg' },
        caption: reactmenu
      }, { quoted: m});
      } else if (choice === "6") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.ibb.co/f0P1pqq/img12.jpg' },
        caption: dlmenu
      }, { quoted: m});
      } else if (choice === "7") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.ibb.co/f0P1pqq/img12.jpg' },
        caption: groupmenu
      }, { quoted: m});
      } else if (choice === "8") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.ibb.co/f0P1pqq/img12.jpg' },
        caption: logomenu
      }, { quoted: m});
      } else if (choice === "9") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.ibb.co/f0P1pqq/img12.jpg' },
        caption: stickermenu
      }, { quoted: m});
      } else if (choice === "10") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.ibb.co/f0P1pqq/img12.jpg' },
        caption: audiomenu
      }, { quoted: m});
      } else if (choice === "11") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.ibb.co/f0P1pqq/img12.jpg' },
        caption: newsmenu
      }, { quoted: m});
      } else if (choice === "12") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.ibb.co/f0P1pqq/img12.jpg' },
        caption: studymenu
      }, { quoted: m});
      } else if (choice === "13") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.ibb.co/f0P1pqq/img12.jpg' },
        caption: toolsmenu
      }, { quoted: m});
      } else if (choice === "14") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.ibb.co/f0P1pqq/img12.jpg' },
        caption: Aimenu
      }, { quoted: m});
      } else if (choice === "15") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/2BnfZMp.jpg' },
        caption: religionmenu
      }, { quoted: m});
      } else if (choice === "16") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.ibb.co/f0P1pqq/img12.jpg' },
        caption: pluginmenu
      }, { quoted: m});
      } else {
        m.reply('Iɴᴠᴀʟɪᴅ ᴄʜᴏɪᴄᴇ. Pʟᴇᴀsᴇ ʀᴇᴘʟʏ ᴡɪᴛʜ ᴀ ᴠᴀʟɪᴅ ɴᴜᴍʙᴇʀ𒁂.');
      }
  
  };
  
  
  handler.help = ["play"];
  handler.tags = ["main"];
  handler.command = /^(menu3)$/i;
  handler.limit = false;
  export default handler;
  
  
  
  
  function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
   }
   
   const more = String.fromCharCode(8206)
   const readMore = more.repeat(4001)
   
   function clockString(ms) {
    let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60
    return [h, " H ", m, " M ", s, " S "].map(v => v.toString().padStart(2, 0)).join("")
   }
   
   function clockStringP(ms) {
    let ye = isNaN(ms) ? "--" : Math.floor(ms / 31104000000) % 10
    let mo = isNaN(ms) ? "--" : Math.floor(ms / 2592000000) % 12
    let d = isNaN(ms) ? "--" : Math.floor(ms / 86400000) % 30
    let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24
    let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60
    return [ye, " *Years 🗓️*\n", mo, " *Month 🌙*\n", d, " *Days ☀️*\n", h, " *Hours 🕐*\n", m, " *Minute ⏰*\n", s, " *Second ⏱️*"].map(v => v.toString().padStart(2, 0)).join("")
   }
   
   function ucapan() {
    const time = moment.tz("Asia/Karachi").format("HH")
    let res = "Good morning ☀️"
    if (time >= 4) {
     res = "Good Morning 🌄"
    }
    if (time >= 10) {
     res = "Good Afternoon ☀️"
    }
    if (time >= 15) {
     res = "Good Afternoon 🌇"
    }
    if (time >= 18) {
     res = "Good Night 🌙"
    }
    return res
   }
  
