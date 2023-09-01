import BrandsProductsPage from "@/components/brands-products-page"
import { ProductsPage } from "@/components/products-page"
import getBrandProductData from "@/lib/getBrandProductData"

export default function SingleBrand({ brandsProductsData, brandPara }: { brandsProductsData: any, brandPara: any }) {

    return (
        <ProductsPage isBrandsPage={true} filterPath={""} isSearchPage={false} categoryData={brandsProductsData} menuData={["Brands", String(brandPara).replace(/-/g, ' ')]} type={"products"} selectedBrands={""} />
    )
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export async function getStaticProps({ locale, params }: { locale: any, params: any }) {
    const brandsProductsData = await getBrandProductData(params.brand, "", "", 0, locale)
    return {
        props: {
            brandsProductsData: brandsProductsData.data,
            brandPara: params.brand
        }
    }
}

