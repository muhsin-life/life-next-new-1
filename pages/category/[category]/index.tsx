import { ProductsPage } from "@/components/products-page"
import getCategoryData from "@/lib/getCategoryData"
import getProductsDataByCat from "@/lib/getProductsDataByCat"

const MainCategory = ({ params, categoryData, filterPath, selectedBrands }: { params: any, categoryData: any, filterPath: any, selectedBrands: string }) => {
    return <ProductsPage isBrandsPage={false} filterPath={filterPath} isSearchPage={false} categoryData={categoryData} menuData={[String(params.category).replace(/-/g, ' ')]} selectedBrands={selectedBrands} type={"category"}/>
}

export default MainCategory

export async function getStaticProps({ locale, params }: { locale: any, params: any }) {
    const mainCategory = params.category

    let filterPath = `categories=${mainCategory}`

    const categoryData = await getProductsDataByCat(filterPath, 0, false, locale);

    return {
        props: {
            categoryData: categoryData.data,
            filterPath,
            params,
            selectedBrands: ""
        },
    };
}

export async function getStaticPaths() {
    function slugify(text: string) {
        return text.toLowerCase().replace(/[\/\s&]+/g, '-');
    }

    const categoryData = await getCategoryData()
    const paths = categoryData.data.map((main_cat: any) => (
        {
            params: {
                category: slugify(main_cat.name)
            }
        }
    ))

    return {
        paths,
        fallback: "blocking"
    };
}