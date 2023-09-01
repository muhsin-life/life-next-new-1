import React, { useState } from "react";
import Link from "next/dist/client/link";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { buttonVariants } from "./ui/button";
import {
  ProductBestSellerBadge,
  ProductOfferBadge,
  ProductRatingBadge,
  ProductWishList,
} from "./ui/badge";
import { Typography } from "./ui/typography";
import { cn } from "@/lib/utils";
import { AddOrEditCartBtn, ProductPricesData } from "./Button";
import { CategoriesSection } from "./feature-section";
import { Icon } from "./ui/icons";

export const SingleProductData = ({
  pro_data,
  isRowView,
}: {
  pro_data: any;
  isRowView: boolean;
}) => {
  const [isValidImage, setIsValidImage] = useState(true);
  // const [loadingState, setLoadingState] = useState<boolean>(false);

  const handleImageError = () => {
    setIsValidImage(false);
  };

  const offervalue = pro_data.offers ? pro_data.offers.value : null;
  return (
    <>
      {pro_data && !isRowView ? (
        <div className="border border-muted rounded-lg bg-white max-w-[250px] ">
          <figure className="border border-slate-100 m-2 rounded-lg relative">
            <Link
              href={`/product/${pro_data.slug}`}
              className="block  rounded-lg rounded-b-none"
            >
              {isValidImage ? (
                <Image
                  onError={handleImageError}
                  className={`rounded-lg  object-cover h-full w-full max-h-[200px]`}
                  src={pro_data.images?.featured_image}
                  width={200}
                  height={200}
                  alt="product_img"
                />
              ) : (
                <Skeleton className="h-[200px] w-full" />
              )}
              {/* {loadingState ? (
                <div className="bg-white/50 absolute inset-0 flex justify-center items-center">
                  <Icon
                    type="refreshIcon"
                    className="animate-spin text-slate-500"
                    sizes={"lg"}
                  />
                </div>
              ) : null} */}

              <ProductOfferBadge offersData={pro_data.offers} />
            </Link>
            <ProductBestSellerBadge proLabelData={pro_data.label} />
            <ProductRatingBadge
              productRating={pro_data.rating}
              isProductPage={false}
            />
            <ProductWishList />
          </figure>

          <div className=" px-2 py-1 rounded-lg rounded-t-none ">
            <ProductPricesData
              productPriceSize={"lg"}
              productPrices={pro_data.prices}
            />

            <Link href={`product/${pro_data.slug}`} className="h-5 block">
              <Typography variant={"lifeText"} size={"sm"} lineClamp={"two"}>
                {pro_data.title}
              </Typography>
            </Link>
            <div className="pt-3">
              <CategoriesSection categoriesData={pro_data.categories} />
              <div className="flex justify-between mt-3 items-center">
                <div className="flex  items-center">
                  <Image
                    src="https://www.lifepharmacy.com/images/standard-nr.svg"
                    alt="delivery-img"
                    width={25}
                    height={25}
                  />
                  <Typography
                    variant={"lifeText"}
                    size={"xs"}
                    className="mx-2"
                    lineClamp={"one"}
                  >
                    12 - 24 HRS
                  </Typography>
                </div>
                <AddOrEditCartBtn
                  proId={pro_data.id}
                  isSingleProductPage={false}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {pro_data && isRowView ? (
        <div className="rounded-lg border border-slate-200 my-1 relative bg-white shadow-sm">
          <Link
            href={`/product/${pro_data.slug}`}
            className="grid grid-cols-12 p-3 gap-x-3"
          >
            <div className=" relative md:col-span-2 col-span-4 h-fit my-auto">
              <Image
                src={pro_data.images.featured_image}
                height={150}
                width={150}
                className=" border border-slate-200 rounded-lg w-full my-auto"
                alt="pro_Image"
              />
              <ProductRatingBadge
                isProductPage={false}
                productRating={pro_data.rating}
              />
            </div>
            <div className="rounded-lg flex-col flex-grow justify-between flex md:col-span-9 col-span-8  space-y-2">
              <Typography
                variant={"lifeText"}
                bold={"semibold"}
                lineClamp={"two"}
              >
                {pro_data.title}
              </Typography>

              <div className="whitespace-nowrap overflow-hidden text-ellipsis w-full">
                {pro_data.categories
                  ? pro_data.categories.map((cat: any) => (
                      <Link
                        href={`/products?categories=${cat.slug}`}
                        className={cn(
                          buttonVariants({
                            variant: "categoryBtn",
                            size: "xs",
                          }),
                          "mr-2"
                        )}
                      >
                        {cat.name}
                      </Link>
                    ))
                  : null}
              </div>
              {offervalue ? (
                <div className="bg-amber-300 w-fit border border-orange-500 flex items-center px-2 py-0.5 rounded">
                  <Typography variant={"lifeText"} size={"xs"}>
                    FLAT {parseFloat(offervalue).toFixed(0)}% OFF
                  </Typography>
                </div>
              ) : null}

              <ProductPricesData
                productPriceSize={"lg"}
                productPrices={pro_data.prices}
              />
            </div>
          </Link>

          <ProductBestSellerBadge proLabelData={pro_data.label} />

          <div className="absolute bottom-2 right-2 flex h-7 ">
            <AddOrEditCartBtn proId={pro_data.id} isSingleProductPage={false} />
          </div>
        </div>
      ) : null}
    </>
  );
};
