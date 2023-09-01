export default async function getBrandProductData(brandName: any, catSlug: any, filterPath: string, noOfProducts: number, lang: any) {
    console.log(catSlug);
    
    const url = `https://prodapp.lifepharmacy.com/api/web/brands/details/${brandName}?${catSlug != "" ? `category_slug=${catSlug}&` : ""}${filterPath ? `${filterPath}&` : "orderBy=popularity&"}type=cols&skip=${noOfProducts}&take=40&new_method=true&lang=${lang}`
    console.log(url);

    const res = await fetch(url)

    if (!res.ok) throw new Error('failed to fetch data')

    return res.json()
}