let pmUtil = {}

pmUtil.getDate = () => {
    const d = new Date()
    let dd = d.getDate()
    let mm = (d.getMonth() + 1)
    const yyyy = d.getFullYear()
    if(dd < 10) dd = '0' + dd
    if(mm < 10) mm = '0' + mm
    return dd + '/' + mm + '/' + yyyy
}

pmUtil.getTime = () => {
    const d = new Date()
    let hh = d.getHours()
    let mm = d.getMinutes()
    if(hh < 10) hh = '0' + hh
    if(mm < 10) mm = '0' + mm
    return hh + ':' + mm
}