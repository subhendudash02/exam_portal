export function checkCookie() {
    return document.cookie.match(/^(?:.*;)?\s*jwt\s*=\s*([^;]+)(?:.*)?$/)||[,null][1]
}