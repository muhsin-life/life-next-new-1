import Image from "next/image";
import ModalContainer from "./ui/modal-container";
import { useModal } from "./ui/modalcontext";
import { Typography } from "./ui/typography";
import { Icon } from "./ui/icons";
import { ProductPricesData } from "./Button";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import { useCartActions } from "@/hooks/useCartActions";
import { setTimeout } from "timers";
import { useRouter } from "next/router";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { SideBarMenuTranstion } from "./ui/transition";
import { Checkbox } from "./ui/checkbox";
import { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export const OrderSucessContainer = ({
  children,
  showModal,
  setCLoseModal,
}: {
  children: any;
  showModal: any;
  setCLoseModal: any;
}) => {
  const { width } = useWindowDimensions();

  return width < 767 ? (
    <ModalContainer
      showModal={showModal}
      setCloseModal={setCLoseModal}
      sheetOnly={true}
    >
      {children}
    </ModalContainer>
  ) : (
    <SideBarMenuTranstion
      isOpen={showModal}
      setIsClosed={setCLoseModal}
      IsSideBarMenu={true}
    >
      {children}
    </SideBarMenuTranstion>
  );
};

export default function OrderSucessSheet() {
  const {
    OrderSucessSheetState,
    setOrderSucessSheetState,
    frequentlyBroughtData,
  } = useModal();

  const [addedToCartItemData, setAddedToCartItemData] = useState<any>(null);

  const { createCart } = useCartActions();

  const cartInit: any = {
    action: "",
    data: {
      items: [],
      address_id: null,
    },
  };
  const { loading, setLoadingState } = useModal();

  const addToCart = () => {
    setLoadingState("loadingStarted");
    checkedProducts.map((chPro: string) => {
      cartInit.data.items.push({ id: chPro, qty: 1 });
    });
    createCart(cartInit);

    setTimeout(() => {
      setOrderSucessSheetState(false);
    }, 400);
  };
  console.log(frequentlyBroughtData);

  const [checkedProducts, setCheckedProducts] = useState<any>(null);

  useEffect(() => {
    if (frequentlyBroughtData) {
      console.log(frequentlyBroughtData);

      setCheckedProducts(
        frequentlyBroughtData[0].proData.map((proData: any) => proData.id)
      );

      setAddedToCartItemData(
        frequentlyBroughtData[0].proData.filter(
          (proData: any) => proData.id === frequentlyBroughtData[1].proId
        )
      );
    }
  }, [frequentlyBroughtData]);

  const removeCheckedProduct = (pro_id: string) => {
    debugger;
    const updatedProducts = checkedProducts.filter(
      (pro: any) => pro !== pro_id
    );
    setCheckedProducts(updatedProducts);
  };

  const router = useRouter();

  const redirect = (pathname: string) => {
    router.push(pathname);
  };

  const cartItems = useSelector((state: RootState) => state.cart);

  const cartSummary = cartItems.cart.cart_summary;
  const swiperRef = useRef<SwiperType>();

  return (
    <OrderSucessContainer
      showModal={
        frequentlyBroughtData != null &&
        frequentlyBroughtData[0].proData != null &&
        OrderSucessSheetState
      }
      setCLoseModal={setOrderSucessSheetState}
    >
      {frequentlyBroughtData && frequentlyBroughtData[0].proData ? (
        <div className="grid grid-cols-1 space-y-4">
          <div className="  space-y-3 md:px-[10px] px-0 py-3">
            {addedToCartItemData ? (
              <div className="flex justify-between rtl:space-x-reverse items-center ">
                <div>
                  <Image
                    src={addedToCartItemData[0].images.featured_image}
                    height={120}
                    width={120}
                    alt="pro-img-cart"
                    className="md:max-w-[300px] max-w-[60px] block"
                  />
                </div>

                <div>
                  <Typography
                    variant={"lifeText"}
                    bold={"bold"}
                    lineClamp={"two"}
                    className="pl-3"
                  >
                    {addedToCartItemData[0].title}
                  </Typography>
                  <div className="flex space-x-2 rtl:space-x-reverse items-center mt-1 pl-3">
                    <Typography
                      bold={"semibold"}
                      variant={"paragraph"}
                      size={"sm"}
                    >
                      Added to the Cart
                    </Typography>
                    <Icon type="checkIcon" className="fill-green-500 text-white" />
                  </div>
                </div>
            
              </div>
            ) : null}

            <div className="w-full bg-slate-100 rounded-lg flex justify-between p-1.5">
              <Typography variant={"paragraph"} size={"sm"}>
                Cart Total
              </Typography>
              <Typography bold={"bold"} >
                <span className="text-xs">AED</span> {" "} {cartSummary.sub_total}
              </Typography>
            </div>
            <div className="md:flex block space-y-2 md:space-x-2 space-x-0 md:space-y-0 rtl:space-x-reverse">
              <Button
                onClick={() => redirect("/checkout")}
                className=" w-full !text-xs"
                rounded={"sm"}
                size={"lg"}
              >
                {" "}
                CHECKOUT
              </Button>
              <Button
                onClick={() => setOrderSucessSheetState(false)}
                variant={"outline"}
                className=" text-ellipsis w-full !text-xs"
                rounded={"sm"}
                size={"lg"}
              >
                {" "}
                CONTINUE SHOPPING
              </Button>
            </div>
          </div>

          {
            <div className=" space-y-3 flex-col md:flex hidden bg-slate-50 px-[10px]">
              <div className="p-2 flex justify-between h-fit items-start">
                <Typography bold={"semibold"} size={"xl"}>
                  Frequently Brought Together
                </Typography>
              </div>
              <div className="flex  relative rtl:space-x-reverse ">
                <Swiper
                spaceBetween={10}
                  slidesPerView={2}
                  className="bg-white border"
                  onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                >
                  {frequentlyBroughtData[0].proData.map(
                    (proData: any, indx: number) => (
                      <SwiperSlide className="">
                        <div className="flex  items-center relative">
                          <div className="  rounded-lg ">
                            <Checkbox
                              defaultChecked={true}
                              id={proData.id}
                              className=" h-[20px] w-[20px] absolute left-2 top-2"
                              onClick={(e: any) => {
                                e.target.checked
                                  ? setCheckedProducts((pro: any) => [
                                      ...pro,
                                      proData.id,
                                    ])
                                  : removeCheckedProduct(proData.id);
                              }}
                            />
                            <label htmlFor={proData.id} className="p-2 block">
                              <Image
                                alt="img-freq"
                                height={100}
                                width={100}
                                src={proData.images.featured_image}
                                className="max-w-[100px]  max-h-[100px] mx-auto mb-1"
                              />
                              <Typography
                                bold={"semibold"}
                                lineClamp={"two"}
                                size={"sm"}
                              >
                                {proData.title}
                              </Typography>
                              <button className="text-center w-full mx-auto block">
                                <ProductPricesData
                                  productPriceSize={"lg"}
                                  productPrices={proData.prices}
                                />
                              </button>
                            </label>
                          </div>
                          {indx !==
                            frequentlyBroughtData[0].proData.length - 1 && (
                            <div >
                              <Icon type="plusIcon" className="-ml-3" />
                            </div>
                          )}
                        </div>
                      </SwiperSlide>
                    )
                  )}
                </Swiper>

                <Button
                  variant={"white"}
                  size={"sm"}
                  onClick={() => swiperRef.current?.slideNext()}
                  rounded={"full"}
                  className="absolute -right-2 inset-y-0  z-10 my-auto h-[40px] w-[40px] p-0 border text-slate-600"
                >
                  <Icon
                    type="chevronLeftIcon"
                    className=" -rotate-180 p-1"
                    sizes={"lg"}
                  />
                </Button>
              </div>
              <Button
                className="h-fit w-full"
                rounded={"sm"}
                onClick={() => addToCart()}
              >
                {" "}
                {loading === "" ? (
                  <Icon type="plusIcon" className="mx-1" />
                ) : loading === "loadingStarted" ? (
                  <Icon
                    type="loadingIcon"
                    className="mx-1"
                    sizes={"sm"}
                    animation={"spin"}
                  />
                ) : null}
                ADD ALL TO CART
              </Button>
            </div>
          }
        </div>
      ) : null}
    </OrderSucessContainer>
  );
}

export { OrderSucessSheet };
