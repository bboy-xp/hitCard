function rp(total, n) {
  var remain = total
  var ret = []
  for (let i = 0; i < n - 1; i++) {
    let m = Math.ceil(Math.random() * 100 * (remain - (n - (i + 1)) * 0.01)) / 100
    ret.push(m)
    remain -= m
  }
  ret.push(Number(remain.toFixed(2)))
  return ret
}