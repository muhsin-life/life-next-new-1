export default async function getMCHomePageData() {
    const res = await fetch(`https://prodapp.lifepharmacy.com/api/clinics/v1/home`)

    if (!res.ok) throw new Error('failed to fetch data')

    return res.json()
}