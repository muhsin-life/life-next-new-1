
import { ProductsPage } from "@/components/products-page"
import { useRouter } from 'next/router';
import getProductsDataByCat from "@/lib/getProductsDataByCat";
import getProductsSearchData from "@/lib/getProductsSearchData";

const SearchProducts = ({ term, productsData }: { term: any, productsData: any }) => {

    return <ProductsPage isBrandsPage={false} selectedBrands="" isSearchPage={true} filterPath={`search?term=${term}`} categoryData={productsData} menuData={["Products", " "
    ]} type="search"/>
}



export default SearchProducts

export async function getServerSideProps({ locale, query }: { locale: any, query: any }) {

    const productsData = await getProductsSearchData(query.term, 0);

    return {
        props: {
            productsData: productsData.data,
            term: query.term
        }
    }
}
