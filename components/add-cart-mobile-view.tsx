import { Button } from "./ui/button";
import { Icon } from "./ui/icons";
import { Typography } from "./ui/typography";
const AddtoCartMobileview = ({
  salePrice,
  filterPrice,
  proQty,
  setProQty,
  addedToCart,
}: {
  addedToCart: any;
  salePrice: any;
  filterPrice: any;
  proQty: any;
  setProQty: any;
}) => {
  return (
    <div className="fixed rounded-3xl border-t-2 rounded-b-none  mx-auto  bottom-0 px-5 left-0 right-0 md:hidden  bg-white  h-16 py-1 items-center pb-[8rem] sm:pb-[10rem] z-10">
      <div className="flex space-x-2 overflow-x-auto no-scrollbar translate-y-1/4">
        <div className="flex h-8 my-auto max-[300px]:hidden w-1/2">
          <Button
            variant={"ghost"}
            className="!px-1 h-[35px] w-[35px] rounded-full"
            onClick={() =>
              proQty !== 1 ? setProQty((preQty: number) => preQty - 1) : null
            }
          >
            <Icon type="minusIcon" />
          </Button>

          <Typography className="mx-3 flex items-center" size={"lg"}>
            {proQty}
          </Typography>
          <Button
            size={"lg"}
            className="!px-1 h-[35px] w-[35px] rounded-full"
            onClick={() =>
              proQty >= 1 ? setProQty((preQty: number) => preQty + 1) : null
            }
          >
            <Icon type="plusIcon" sizes={"lg"} />
          </Button>
        </div>

        <Button
          size={"lg"}
          className="w-full"
          onClick={() => addedToCart()}
          iconLeft={true}
          rounded={"full"}
          iconType="addToCartIcon"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default AddtoCartMobileview;
