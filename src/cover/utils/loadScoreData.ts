export default async (query: string, unicode: boolean) => {
    if (!query) return
    const url = 'https://smjb-alpha.vercel.app/api/osu_score?query='
    try {
        const res = await fetch(url + query + (unicode ? '&unicode=1' : ''))
        if (!res.ok) {
            throw new Error('Response status: ' + res.status)
        }
        const json = await res.json()
        if (json.error)
            throw new Error(json.error)
        else {
            return json;
        }
    } catch (err) {
        console.log(err)
    }
}