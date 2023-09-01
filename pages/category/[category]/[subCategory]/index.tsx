import { ProductsPage } from "@/components/products-page"
import getCategoryData from "@/lib/getCategoryData"
import getProductsDataByCat from "@/lib/getProductsDataByCat"

const SubCategory = ({ params, categoryData, filterPath, selectedBrands }: { params: any, categoryData: any, filterPath: any, selectedBrands: string }) => {

    const getMenuData = (catDataArray: string[]) => {
        catDataArray.forEach((cat, index) => {
            catDataArray[index] = cat.replaceAll('-', ' ');
        });
        return catDataArray;
    }
    return <ProductsPage isBrandsPage={false} filterPath={filterPath} isSearchPage={false} categoryData={categoryData} menuData={getMenuData([params.category, params.subCategory])} selectedBrands={selectedBrands} type={"category"}/>
}

export default SubCategory

export async function getStaticProps({ locale, params }: { locale: any, params: any }) {
    const subCategory = params.subCategory
    let filterPath = `categories=${subCategory}`

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
    const paths = categoryData.data.reduce((acc: any, category: any) => {
        category.children.forEach((child: any) => {
            acc.push({
                params: {
                    category: slugify(category.name),
                    subCategory: child.slug
                }
            })
        });
        return acc;
    }, []);


    return {
        paths,
        fallback: "blocking"
    };
}