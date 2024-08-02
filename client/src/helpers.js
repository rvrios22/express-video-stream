const monthMatcher = (month) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let parseIntMonth = parseInt(month)
    parseIntMonth -= 1
    return monthNames[parseIntMonth]
}

const dayCleaner = (day) => {
    const daySplit = day.split('')
    let finalDay

    daySplit[0] === '0' ? finalDay = daySplit[1] : finalDay = day

    return finalDay
}

export const dateCleaner = (date) => {
    const split = date.split('T')
    //yyyy mm dd
    const splitDate = split[0].split('-')

    const month = monthMatcher(splitDate[1])
    const day = dayCleaner(splitDate[2])

    const finalDate = `${month} ${day}, ${splitDate[0]}`

    return finalDate
}