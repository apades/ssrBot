let parser_ss = (link: string) => {
  // ss://method:password@server:port
  let b64 = atob(link.replace('ss://', ''))
  const reg = /(.*?):(.*?)@(.*?):(.*?)/
  let rs = b64.match(reg)
  return {
    method: rs[1],
    password: rs[2],
    server: rs[3],
    port: rs[4],
  }
}

let parser_ssr = (link: string) => {
  // ssr://ip:port:protocol:method:blending:password
  let b64 = atob(link.replace('ssr://', ''))
  const reg = /(.*?):(.*?):(.*?):(.*?):(.*?):(.*?)/
  let rs = b64.match(reg)
  return {
    ip: rs[1],
    port: rs[2],
    protocol: rs[3],
    method: rs[4],
    blending: rs[5],
    password: atob(rs[6]),
  }
}

let parser_vmess = (link: string) => {
  const reg = /vmess:\/\/(.*)/
  return atob(link.match(reg)[1])
}
