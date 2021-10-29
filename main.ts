/* eslint-disable no-var */
import request from './request'
import config from './user.conf'
import * as fs from 'fs'
import cryptoJS from 'crypto-js'

let btoa = (s: string) =>
  cryptoJS.enc.Base64.stringify(cryptoJS.enc.Utf8.parse(s))

let atob = (s: string) =>
  cryptoJS.enc.Base64.parse(s).toString(cryptoJS.enc.Utf8)
// ---- main ----
;(async () => {
  let webString = (await request(config.url)).data

  let regRs = webString.match(/window\.__NUXT__=(.*?)<\/script/)
  if (!regRs?.[1]) {
    fs.writeFileSync('web.html', webString, 'utf8')
    return console.error('解析出问题，web数据在web.html，regRs:', regRs)
  }
  let state
  eval(`state = ${regRs[1]}`)

  let ssrInfo = state.state.ssrInfo

  let code = atob(ssrInfo.code),
    ssrs = ssrInfo.ssrs

  try {
    let r = cryptoJS.enc.Utf8.parse(code)
    let n = cryptoJS.AES.decrypt(ssrs, r, {
      mode: cryptoJS.mode.ECB,
      padding: cryptoJS.pad.Pkcs7,
    })

    let parserCode = cryptoJS.enc.Utf8.stringify(n).toString()

    var ssrData = JSON.parse(parserCode)
  } catch (error) {
    console.error('cryptoJS 解析出问题了', error)
  }

  let ssrUrlsString = ssrData.map((s) => s.url).join('\n')
  let parse = atob(ssrUrlsString)
  //   let realSSRs =
  fs.writeFileSync('ssr', parse, 'utf8')
})()
