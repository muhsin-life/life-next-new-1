import { SingleProductData } from "./single-product-data";
import React, { useState } from "react";

import { useRouter } from "next/router";
import getProductsDataByCat from "@/lib/getProductsDataByCat";
import { useLanguage } from "@/hooks/useLanguage";
import { ProductsSkeleton } from "./productsSkeleton";

import getBrandProductData from "@/lib/getBrandProductData";
import Link from "next/link";
import { Button } from "./ui/button";
import { Typography } from "./ui/typography";
import { FiltersSection } from "./category-filters";
import { ProductFilters } from "./product-filters";
import { useModal } from "./ui/modalcontext";
import InfiniteScroll from "react-infinite-scroll-component";
import { Icon } from "./ui/icons";
const ProductsPageData = ({
  filterPath,
  categoryData,
  brandsData,
  isSearchPage,
  selectedBrands,
  menuData,
  isBrandsPage,
}: {
  isSearchPage: boolean;
  selectedBrands: any;
  categoryData: any;
  brandsData: any;
  filterPath: any;
  menuData: any;
  isBrandsPage: boolean;
}) => {
  const { query } = useRouter();

  const [noOfProducts, setNoOfProducts] = useState(40);
  const [animateSpin, setAnimateSpin] = useState(false);
  const [showMoreProductsbtn, setShowMoreProductsbtn] = useState(true);
  const [filtersSelected, setFilters] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [productFilterApplied, setProductsFilterApplied] = useState(false);
  const [brandFiltersAppliedStatus, setBrandFiltersAppliedStatus] =
    useState(false);

  const generateFilterPath = (type: string, value: string | number) => {
    return `&${type}=${value}`;
  };

  const { locale } = useLanguage();

  function typeGenerate(type: string) {
    switch (type) {
      case "Category":
        return "categories";
      case "Collection":
        return "collections";
    }
    return "";
  }

  const updateFilterData = (
    prevFilters: any,
    type: string,
    value: string | number
  ) => {
    debugger;
    setFilters([
      {
        ...prevFilters,
        filterPath: generateFilterPath(type, value),
        value: value,
      },
    ]);

    fetchData(
      typeGenerate(menuData[0]),
      0,
      false,
      [
        {
          ...prevFilters,
          filterPath: generateFilterPath(type, value),
          value: value,
        },
      ]
        .map((filters: any) => filters.filterPath)
        .join("")
    );
  };

  const createFilterData = (type: string, value: string | number) => {
    debugger;

    setFilters((prevFilters: any) => [
      ...prevFilters,
      {
        type: type,
        filterPath: generateFilterPath(type, value),
        value: value,
      },
    ]);

    fetchData(
      typeGenerate(menuData[0]),
      0,
      false,
      [
        ...filtersSelected,
        {
          type: type,
          filterPath: generateFilterPath(type, value),
          value: value,
        },
      ]
        .map((filters: any) => filters.filterPath)
        .join("")
    );
  };

  const filterSet = (type: string, value: string | number) => {
    debugger;
    setProductsFilterApplied(true);

    filtersSelected.length !== 0
      ? filtersSelected.some((filter: any) =>
          filter.type === type
            ? updateFilterData(filter, type, value)
            : createFilterData(type, value)
        )
      : createFilterData(type, value);
  };

  function fetchData(
    queryData: any,
    noOfProducts: number,
    loadMoreData: boolean,
    filterPaths: string
  ) {
    if (!isBrandsPage) {
      debugger;
      getProductsDataByCat(
        filterPath + filterPaths,
        noOfProducts,
        queryData === null ? true : false,
        locale
      ).then((proData: any) => {
        if (loadMoreData) {
          setData((prevContent: any) => [
            ...prevContent,
            ...proData.data.products,
          ]);
          setAnimateSpin(false);
          if (proData.data.products.length != 40) {
            setShowMoreProductsbtn(false);
          }
        } else {
          setData(proData.data.products);
          setBrandFiltersAppliedStatus(true);
          setProductsFilterApplied(false);
        }
      });
    } else {
      getBrandProductData(
        query.brand,
        query.singleCategory ? query.singleCategory : "",
        filterPath,
        noOfProducts,
        locale
      ).then((brandsProductsData: any) => {
        if (loadMoreData) {
          setData((prevContent: any) => [
            ...prevContent,
            ...brandsProductsData.data.products,
          ]);
          setAnimateSpin(false);
          if (brandsProductsData.data.products != 40) {
            setShowMoreProductsbtn(false);
          }
        } else {
          setData(brandsProductsData.data.products);
          setProductsFilterApplied(false);
        }
      });
    }
  }

  function loadMoreProducts() {
    debugger;
    setAnimateSpin(true);
    fetchData(
      typeGenerate(menuData[0]),
      noOfProducts,
      true,
      [...filtersSelected].map((filters: any) => filters.filterPath).join("")
    );
    console.log(filtersSelected);
    
    setNoOfProducts((c) => c + 40);
  }

  const productsLength =
    data.length === 0
      ? categoryData.products.total_count
        ? categoryData.products.total_count
        : noOfProducts
      : data.length;

  const noOfProductsCurrently = categoryData.products.length;

  const { selectedUserPrefernece } = useModal();

  return (
    <div className=" max-w-[1450px] mx-auto  sm:px-[10px] px-[5px]">
      <ProductFilters
        filterSet={filterSet}
        noOfProductsCurrently={noOfProductsCurrently}
        productsLength={productsLength}
      />

      <div aria-labelledby="products-heading" className="pb-24">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {!isSearchPage && !isBrandsPage ? (
            <FiltersSection
              brandsData={brandsData}
              filterSet={filterSet}
              filterPath={filterPath}
              selectedBrands={filtersSelected}
            />
          ) : !isSearchPage ? (
            <div className="hidden lg:block space-y-2">
              <Typography bold={"bold"}>Category</Typography>
              {categoryData.categories.map((cat_data: any, indx: number) => (
                <div className="flex justify-between text-gray-800 text-sm">
                  <Link
                    href={`/brand/${query.brand}/${cat_data.slug}`}
                    className={`${
                      query.singleCategory
                        ? query.singleCategory === cat_data.slug
                          ? "text-blue-500"
                          : ""
                        : indx === 0
                        ? "text-blue-500"
                        : ""
                    } hover:text-blue-500`}
                  >
                    {cat_data.name}
                  </Link>
                  <div>{cat_data.count}</div>
                </div>
              ))}
            </div>
          ) : null}
          <div
            className={`${isSearchPage ? " col-span-full py-7" : "col-span-3"}`}
          >
            <InfiniteScroll
              scrollThreshold={0.9}
              dataLength={data.length ? data.length : 0}
              next={loadMoreProducts}
              hasMore={showMoreProductsbtn}
              loader={
                <div className="flex space-x-2 justify-center items-center py-5">
                  <Icon
                    type="loadingIcon"
                    animation={"spin"}
                    sizes={"lg"}
                    className="text-primary"
                  />
                </div>
              }
            >
              <div
                className={`grid ${
                  selectedUserPrefernece &&
                  selectedUserPrefernece.value === "row"
                    ? "!grid-cols-1 !gap-0"
                    : ""
                } ${
                  isSearchPage
                    ? "xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 "
                    : "  md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1"
                }  xs:grid-cols-2 grid-cols-1 sm:gap-3 gap-1`}
              >
                {categoryData.products.length > 0 ? (
                  categoryData.products.map((pro_data: any) =>
                    productFilterApplied ? (
                      <ProductsSkeleton />
                    ) : (
                      !brandFiltersAppliedStatus && (
                        <SingleProductData
                          pro_data={pro_data}
                          isRowView={
                            selectedUserPrefernece
                              ? selectedUserPrefernece.value === "row"
                              : false
                          }
                        />
                      )
                    )
                  )
                ) : (
                  <div className="w-full col-span-3">
                    <Typography variant={"paragraph"} className="py-2">
                      No Products Found
                    </Typography>
                  </div>
                )}
                {data.length > 0
                  ? data.map((pro_data: any) =>
                      productFilterApplied ? (
                        <ProductsSkeleton />
                      ) : (
                        <SingleProductData
                          pro_data={pro_data}
                          isRowView={
                            selectedUserPrefernece
                              ? selectedUserPrefernece.value === "row"
                              : false
                          }
                        />
                      )
                    )
                  : brandFiltersAppliedStatus && (
                      <div className="w-full col-span-3">
                        <Typography
                          variant={"paragraph"}
                          alignment={"horizontalCenter"}
                        >
                          No Products Found
                        </Typography>
                      </div>
                    )}
              </div>
            </InfiniteScroll>
            {/* {categoryData.products.length === 40 && showMoreProductsbtn ? (
              <div className="w-full flex justify-center mt-10">
                <Button
                  isLoading={animateSpin}
                  size={"sm"}
                  iconLeft={true}
                  iconType="refreshIcon"
                  onClick={() => {
                    loadMoreProducts();
                  }}
                  className="border-slate-300 flex items-center border  px-3 py-2  rounded-full hover:bg-[#39f] hover:text-white transition-all duration-300"
                >
                  More Products
                </Button>
              </div>
            ) : null} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPageData;
