export const timeformat = (time, spe) => {
  time = new Date(time)
  spe = spe || '-'
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  month = month < 10 ? '0' + month : month
  let day = time.getDate()
  return year + spe + month + spe + day
}
