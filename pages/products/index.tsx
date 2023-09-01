
import { ProductsPage } from "@/components/products-page"
import getProductsDataByCat from "@/lib/getProductsDataByCat";

const Products = ({ productsData, cat, filterPath, selectedBrands }: { productsData: any, cat: any, filterPath: string, selectedBrands: string }) => {

    return <ProductsPage isBrandsPage={false} filterPath={filterPath} isSearchPage={false} categoryData={productsData} menuData={["Products", String(cat).replace(/-/g, ' ')]} type={"products"} selectedBrands={selectedBrands} />
}

export default Products

export async function getServerSideProps({ locale, query }: { locale: any, query: any }) {

    let filterPath = ""
    let cat = ""
    if (query.collections) {
        filterPath = `collections${query.collections != "" ? `=${query.collections}` : ""}`
        cat = query.collections
    }
    else if (query.categories) {
        filterPath = `categories${query.categories != "" ? `=${query.categories}` : ""}`
        cat = query.categories
    }
    else if (query.brands) {
        filterPath = `brands${query.brands != "" ? `=${query.brands}` : ""}`
        cat = query.brands
    }
    const productsData = await getProductsDataByCat(filterPath, 0, false, locale);
    return {
        props: {
            productsData: productsData.data,
            filterPath,
            cat,
            selectedBrands: query.brands ? query.brands : ""
        }
    }
}
