import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInSeconds,
  differenceInWeeks,
  differenceInYears
} from 'date-fns'

export function formatDate (date) {
  const now = new Date()

  const sec = Math.abs(differenceInSeconds(now, date))

  if (sec === 0) {
    return 'Baru saja'
  } else if (sec < 60) {
    return `${sec} detik`
  } else if (sec < 3600) {
    return `${Math.abs(differenceInMinutes(now, date))} menit`
  } else if (sec < 86400) {
    return `${Math.abs(differenceInHours(now, date))} jam`
  } else {
    const day = Math.abs(differenceInDays(now, date))

    if (day < 7) {
      return `${day} hari`
    } else if (day < 30) {
      return `${Math.abs(differenceInWeeks(now, date))} minggu`
    } else if (day < 360) {
      return `${Math.abs(differenceInMonths(now, date))} bulan`
    } else {
      return `${Math.abs(differenceInYears(now, date))} tahun`
    }
  }
}

export function formatString (string, length) {
  return string.length > length ? `${string.slice(0, length)}...` : string
}
