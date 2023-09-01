import Image from "next/image";
import { Icon, IconProps, iconVariants } from "./icons";
import { Typography } from "./typography";
import { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";

const CartBadge = ({ message }: { message: string | number }) => {
  return (
    <div className="bg-primary   absolute -right-2 rounded-full -top-2 h-5 w-5 leading-5">
      <Typography size={"xs"} type="span" alignment={"horizontalCenter"}>
        {message}
      </Typography>
    </div>
  );
};

const ProductRatingBadge = ({
  productRating,
  isProductPage,
}: {
  productRating: number;
  isProductPage: boolean;
}) => {
  const reviewColor = (rating: number) => {
    if (rating == 0) {
      return "bg-slate-200";
    } else {
      return "bg-amber-400";
    }
  };

  return (
    <>
      <span
        className={`flex ${
          isProductPage ? "w-fit my-1" : " absolute bottom-0.5 left-0.5"
        } space-x-1 opacity-90 px-[7px]   rounded-full shadow-xl text-white items-center ${reviewColor(
          productRating
        )}`}
      >
        <Icon sizes={"xs"} type="starIcon" className="fill-white my-auto" />

        <Typography size={"sm"}>{productRating}</Typography>
      </span>
    </>
  );
};

const ProductWishList = ({iconSize}:{iconSize?:IconProps["sizes"]}) => {
  const [wishlistState, setWishListState] = useState(false);

  return (
    <>
      <span
        className="absolute right-2 bottom-2 bg-white/70 backdrop-blur-sm p-1 rounded-full cursor-pointer z-20"
        onClick={() => {
          debugger;
          setWishListState(!wishlistState);
        }}
      >
        <Icon
        sizes={iconSize}
          type="heartIcon"
          className={
            wishlistState ? "fill-pink-600 text-pink-600" : "text-pink-600"
          }
        />
      </span>
      {wishlistState ? (
        <div className="absolute left-0 flex justify-center items-center right-0 top-0 bottom-0 z-10">
          <Player
            src="/animations/wishlist-animation.json"
            className="w-28 h-full my-auto "
            autoplay
          ></Player>
        </div>
      ) : null}
    </>
  );
};

const ProductOfferBadge = ({ offersData }: { offersData: any }) => {
  return offersData ? (
    <div className="absolute left-2 top-2 bg-red-500 rounded-full text-white text-sm p-[5px] shadow-lg text-center overflow-hidden leading-3 label-circle w-[3rem] h-[3rem]">
      {offersData.value ? (
        <>{parseFloat(offersData.value).toFixed(0)} % OFF</>
      ) : (
        <>BUY1 GET1</>
      )}
    </div>
  ) : null;
};

const ProductBestSellerBadge = ({ proLabelData }: { proLabelData: any }) => {
  const generateIcon = (type: string) => {
    return (
      <Image
        src={`https://www.lifepharmacy.com/images/label/${type}.svg`}
        height={30}
        width={30}
        alt="icon"
        className={iconVariants({ sizes: "sm" })}
      />
    );
  };
  return proLabelData ? (
    <div
      style={{ background: proLabelData.color_code }}
      className={`skeleton-box ribbon-2  flex items-center text-white z-[5]`}
    >
      {" "}
      <Typography size={"sm"} lineClamp={"one"}>
        {proLabelData.label_text}
      </Typography>
      <div className={`ml-2`}>{generateIcon(proLabelData.icon_type)}</div>
    </div>
  ) : null;
};

const SelectLangBadge = ({ selectLang }: { selectLang: string }) => {
  return (
    <div className="bg-emerald-500  text-white xs:flex hidden rounded-full md:px-2 md:py-1 items-center space-x-2 rtl:space-x-reverse px-2 py-0.5">
      <Icon type="checkIcon" sizes={"sm"} />
      <span className="text-xs">{selectLang}</span>
    </div>
  );
};

export {
  CartBadge,
  ProductRatingBadge,
  ProductOfferBadge,
  ProductBestSellerBadge,
  SelectLangBadge,
  ProductWishList,
};
