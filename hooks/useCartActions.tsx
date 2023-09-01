import { useDispatch, useSelector } from "react-redux";
import createCartPOSTReq from "@/lib/createCart";
import { updateCartData } from "@/redux/cart.slice";
import { RootState } from "../redux/store";
import updateCartApiReq from "@/lib/updateCart";
import { useModal } from "@/components/ui/modalcontext";

export function useCartActions() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart);
  const cartItemsData = cartItems.cart.cart_data
    ? cartItems.cart.cart_data.items
    : [];
  const cartId = cartItems.cart.cart_data
    ? cartItems.cart.cart_data.cart_id
    : null;
  const { setOrderSucessSheetState, setLoadingState } = useModal();
  const createCart = (payloadData: any) => {
    if (cartItemsData.length > 0) {
      updateCart(payloadData);
    } else {
      payloadData.data.items[0].qty > 0 ? setOrderSucessSheetState(true) : null;
      createCartPOSTReq(payloadData).then((res) => {
        dispatch(updateCartData(res));
        setLoadingState("loadingDone");
      });
    }
  };

  const updateCart = (payloadData: any) => {
    payloadData.action = "update_items";
    payloadData.data.items[0].qty > 0 ? setOrderSucessSheetState(true) : null;
    updateCartApiReq(payloadData, cartId).then((res) => {
      dispatch(updateCartData(res));
      setLoadingState("loadingDone");
    });
  };

  return {
    createCart,
    updateCart,
  };
}
