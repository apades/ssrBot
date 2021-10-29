/* eslint-disable no-var */
function m() {}
m.init = (a: any, b: any) => {}
Object.assign(m, {
  init: function (t, e) {
    ;(t = this.words = t || []), (this.sigBytes = null != e ? e : 4 * t.length)
  },
  toString: function (t) {
    return (t || y).stringify(this)
  },
  concat: function (t) {
    let e = this.words,
      r = t.words,
      n = this.sigBytes,
      o = t.sigBytes
    if ((this.clamp(), n % 4))
      for (var i = 0; i < o; i++) {
        let h = (r[i >>> 2] >>> (24 - (i % 4) * 8)) & 255
        e[(n + i) >>> 2] |= h << (24 - ((n + i) % 4) * 8)
      }
    else for (i = 0; i < o; i += 4) e[(n + i) >>> 2] = r[i >>> 2]
    return (this.sigBytes += o), this
  },
  clamp: function () {
    let e = this.words,
      r = this.sigBytes
    ;(e[r >>> 2] &= 4294967295 << (32 - (r % 4) * 8)),
      (e.length = t.ceil(r / 4))
  },
  clone: function () {
    let t = c.clone.call(this)
    return (t.words = this.words.slice(0)), t
  },
  random: function (t) {
    for (var e = [], i = 0; i < t; i += 4) e.push(h())
    return new m.init(e, t)
  },
})
let l: any = {}
let v: any = (l.enc = {})
var y: any = (v.Hex = {
  stringify: function (t) {
    for (var e = t.words, r = t.sigBytes, n = [], i = 0; i < r; i++) {
      let o = (e[i >>> 2] >>> (24 - (i % 4) * 8)) & 255
      n.push((o >>> 4).toString(16)), n.push((15 & o).toString(16))
    }
    return n.join('')
  },
  parse: function (t) {
    for (var e = t.length, r = [], i = 0; i < e; i += 2)
      r[i >>> 3] |= parseInt(t.substr(i, 2), 16) << (24 - (i % 8) * 4)
    return new m.init(r, e / 2)
  },
})
let d: any = (l.lib = {})
let f = Object.create
var c: any = (d.Base = {
  extend: function (t) {
    let e = f(this)
    return (
      t && e.mixIn(t),
      (e.hasOwnProperty('init') && this.init !== e.init) ||
        (e.init = function () {
          e.$super.init.apply(this, arguments)
        }),
      (e.init.prototype = e),
      (e.$super = this),
      e
    )
  },
  create: function () {
    let t = this.extend()
    return t.init.apply(t, arguments), t
  },
  init: function () {},
  mixIn: function (t) {
    for (let e in t) t.hasOwnProperty(e) && (this[e] = t[e])
    t.hasOwnProperty('toString') && (this.toString = t.toString)
  },
  clone: function () {
    return this.init.prototype.extend(this)
  },
})
