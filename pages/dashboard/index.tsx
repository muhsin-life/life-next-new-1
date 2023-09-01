import { RadioBtnGroup } from "@/components/Button";

import { useEffect, useState } from "react";
import {
  SideBarMenuTranstion,
  TransitionComp,
} from "@/components/ui/transition";
import { signOut, useSession } from "next-auth/react";
import { useModal } from "@/components/ui/modalcontext";
import { Icon, IconProps } from "@/components/ui/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Typography, typographyVariants } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import BreadCrumb from "@/components/breadcrumb";
import Link from "next/link";
import getOrderDetails from "@/lib/getorderDetails";
import InvalidOTPModal from "@/components/invalid-otp-modal";
import { cn } from "@/lib/utils";
import getPrecriptionList from "@/lib/getPrescriptionList";
import Image from "next/image";
import { AddNewAddressForm } from "@/components/addnewAddressForm";
import { useForm } from "react-hook-form";
import deleteAddress from "@/lib/deleteAddress";

export default function DashboardPage({}) {
  const [dashBoardVisibility, setDashBoardVisibility] = useState(true);
  const [ordersVisibility, setOrdersVisibility] = useState(false);
  const [returnOrdersVisibility, setreturnOrdersVisibility] = useState(false);
  const [addressesVisibility, setAddressesVisibility] = useState(false);
  const [accountDetails, setaccountDetailsVisibility] = useState(false);
  const [walletDetails, setWalletVisibility] = useState(false);
  const [appointments, setappointments] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [chatWithUs, setChatWithUs] = useState(false);
  const [Prescription, setPrescription] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [logOutWarningModal, setLogOutWarningModal] = useState(false);
  const [prescriptionData, setPrescriptionData] = useState<any>(null);
  const [precriptionDetailsVisibility, setPrecriptionDetailsVisibility] =
    useState(false);
  const [addnewAddressFormVisibility, setaddnewAddressFormVisibility] =
    useState(false);
  const { data: session } = useSession();
  const { setSheetOpen, setModalFixedState, addressData } = useModal();
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
  });
  useEffect(() => {
    setModalFixedState(true);

    !session ? setSheetOpen(true) : setSheetOpen(false);
  }, [session]);

  const getProductOrderDetails = () => {
    getOrderDetails(session?.token.token).then((res) =>
      setOrderDetails(res.data)
    );
  };
console.log(addressData);

  const setMenuItemVisiblity = (menuName: string, setVisibility: boolean) => {
    if (setVisibility) {
      setMenuItemVisiblity(selectedMenu, false);
      setSelectedMenu(menuName);
    }

    switch (menuName) {
      case "dashboard":
        setDashBoardVisibility(setVisibility);
        break;

      case "orders":
        setOrdersVisibility(setVisibility);
        break;

      case "returnOrders":
        setreturnOrdersVisibility(setVisibility);
        break;

      case "prescrpition":
        setPrescription(setVisibility);
        break;

      case "addresses":
        setAddressesVisibility(setVisibility);
        break;

      case "accountDetails":
        setaccountDetailsVisibility(setVisibility);
        break;

      case "wallet":
        setWalletVisibility(setVisibility);
        break;

      case "appointments":
        setappointments(setVisibility);
        break;

      case "wishlist":
        setWishlist(setVisibility);
        break;

      case "chatWithUs":
        setChatWithUs(setVisibility);
        break;

      case "Logout":
        setLogOutWarningModal(setVisibility);
        break;
    }
  };
  interface menuItemProps {
    id: string;
    name: string;
    onClick: () => void;
    iconType: IconProps["type"];
  }

  const menuItems: menuItemProps[] = [
    {
      id: "dashboard",
      name: "Dashboard",
      onClick: () => {
        setMenuItemVisiblity("dashboard", true);
      },
      iconType: "homeIconMenu",
    },
    {
      id: "orders",
      name: "Orders",
      onClick: () => {
        setMenuItemVisiblity("orders", true);
        getProductOrderDetails();
      },
      iconType: "ordersIcon",
    },
    {
      id: "returnOrders",
      name: "Return Orders",
      onClick: () => {
        setMenuItemVisiblity("returnOrders", true);
      },
      iconType: "returnOrdersIcon",
    },
    {
      id: "prescrpition",
      name: "Prescrpition",
      onClick: () => {
        setMenuItemVisiblity("prescrpition", true);
        getPrecriptionList().then((res) => setPrescriptionData(res));
      },
      iconType: "prescriptionIcon",
    },
    {
      id: "addresses",
      name: "Addresses",
      onClick: () => {
        setMenuItemVisiblity("addresses", true);
      },
      iconType: "addressesIcon",
    },
    {
      id: "accountDetails",
      name: "Account Details",
      onClick: () => {
        setMenuItemVisiblity("accountDetails", true);
      },
      iconType: "accountDetailsIcon",
    },
    {
      id: "wallet",
      name: "Wallet",
      onClick: () => {
        setMenuItemVisiblity("wallet", true);
      },
      iconType: "walletIcon",
    },
    {
      id: "appointments",
      name: "Appointments",
      onClick: () => {
        setMenuItemVisiblity("appointments", true);
      },
      iconType: "appointmentsIcon",
    },
    {
      id: "wishlist",
      name: "Wishlist",
      onClick: () => {
        setMenuItemVisiblity("wishlist", true);
      },
      iconType: "wishlistIcon",
    },
    {
      id: "chatWithUs",
      name: "Chat With Us",
      onClick: () => {
        setMenuItemVisiblity("chatWithUs", true);
      },
      iconType: "chatWithUsIcon",
    },
    {
      id: "Logout",
      name: "Log Out",
      onClick: () => {
        setMenuItemVisiblity("Logout", true);
      },
      iconType: "LogoutIcon",
    },
  ];
  const [sideBarShrink, setsidebarShrinked] = useState(false);

  const genders = ["male", "female", "others"];

  function formatDate(dateTimeString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedDate = new Date(dateTimeString).toLocaleString(
      "en-US",
      options
    );
    return formattedDate;
  }
  return session && session.token ? (
    <div className="container-page !px-0">
      <BreadCrumb menuData={["My Account"]} type="" />
      <div className="bg-slate-100 w-full h-full p-1 flex justify-between border-b border-b-slate-200 md:hidden">
        <button
          onClick={() => setsidebarShrinked(!sideBarShrink)}
          className="  my-auto md:hidden items-center p-1  rounded-lg flex space-x-2 "
        >
          <Icon type="hamburgerMenuIcon" className="w-5 h-5 text-slate-500" />
          <Typography size={"sm"}>Menu</Typography>
        </button>
      </div>

      <div className="container-page !px-0   flex  space-x-0 h-full w-full rtl:space-x-reverse ">
        <nav
          id="separator-sidebar"
          className="   border-r fixed w-64 h-screen md:block hidden"
        >
          <SideBarMenuTranstion
            isOpen={sideBarShrink}
            setIsClosed={setsidebarShrinked}
          >
            <ul className="space-y-2 font-medium py-3  px-2  overflow-y-auto h-full">
              {menuItems.map((menuItem, indx) => (
                <li>
                  <Button
                    onClick={() => menuItem.onClick()}
                    variant={"ghost"}
                    rounded={"md"}
                    className={`w-full border-none justify-start  ${
                      selectedMenu === menuItem.id
                        ? "text-black bg-slate-100"
                        : "text-black"
                    }`}
                    iconLeft={
                      <Icon
                        type={menuItem.iconType}
                        className="mr-3 text-slate-700"
                      />
                    }
                  >
                    <Typography
                      lineClamp={"one"}
                      variant={"lifeText"}
                      bold={"light"}
                    >
                      {menuItem.name}
                    </Typography>
                  </Button>
                </li>
              ))}
            </ul>
          </SideBarMenuTranstion>
        </nav>
        <div className="w-64 flex-shrink-0 md:block hidden"></div>

        <div className="w-full px-3 py-3 ">
          {dashBoardVisibility ? (
            <TransitionComp setTransition={dashBoardVisibility}>
              <div className=" w-full space-y-4 ">
                <div className="w-full py-5 px-3 rounded-lg shadow-sm border-muted border text-sm space-y-2">
                  <div className="flex space-x-2 flex-wrap rtl:space-x-reverse">
                    <Typography variant={"paragraph"}>Hello</Typography>
                    <Typography bold={"bold"}>
                      {session && session.user ? session?.user.name : "User"} !
                    </Typography>
                  </div>

                  <Typography size={"sm"} variant={"paragraph"}>
                    From your account dashboard you can view your{" "}
                    <Button
                      onClick={() => setMenuItemVisiblity("orders", true)}
                      variant={"primaryLink"}
                      size={"sm"}
                      className="underline-offset-4 underline"
                    >
                      recent orders
                    </Button>{" "}
                    , manage your{" "}
                    <Button
                      variant={"primaryLink"}
                      size={"sm"}
                      onClick={() => setMenuItemVisiblity("addresses", true)}
                    >
                      shipping and billing addresses
                    </Button>
                    <Button
                      variant={"primaryLink"}
                      size={"sm"}
                      onClick={() =>
                        setMenuItemVisiblity("accountDetails", true)
                      }
                    >
                      , and edit your account details.{" "}
                    </Button>
                  </Typography>
                </div>
                <div className="space-y-2">
                  <Typography>Recent Purchases</Typography>

                  <div className="w-full py-5 px-3 rounded-lg border-muted border  space-y-4 sm:text-sm text-xs">
                    <Typography size={"sm"}>
                      <i>You don't have any product yet!</i>
                    </Typography>
                  </div>
                </div>
              </div>
            </TransitionComp>
          ) : null}

          {ordersVisibility ? (
            <TransitionComp setTransition={ordersVisibility}>
              {orderDetails && orderDetails.length > 0 ? (
                <div className="space-y-2">
                  {orderDetails.map((orderDetail: any) => (
                    <div className="rounded-lg shadow-sm w-full border border-muted px-7 py-4 md:flex block justify-between">
                      <div className="flex flex-col space-y-3">
                        <Typography
                          bold={"extrabold"}
                          className="md:!text-left !text-center"
                        >
                          #{orderDetail.order_id}
                        </Typography>
                        <div className="pb-2 space-y-2">
                          <Typography
                            bold={"light"}
                            size={"sm"}
                            variant={"paragraph"}
                            className="md:!text-left !text-center"
                          >
                            {orderDetail.user_details.name}
                          </Typography>
                          <Typography
                            bold={"light"}
                            size={"sm"}
                            variant={"paragraph"}
                            className="md:!text-left !text-center"
                          >
                            {orderDetail.user_details.phone}
                          </Typography>
                          <Typography
                            bold={"light"}
                            size={"sm"}
                            variant={"paragraph"}
                            className="md:!text-left !text-center"
                          >
                            {orderDetail.address_details.google_address}
                          </Typography>
                        </div>
                      </div>
                      <div className="space-y-2 ">
                        <Typography
                          alignment={"horizontalCenter"}
                          size={"lg"}
                          variant={"primary"}
                          whitespace={"nowrap"}
                        >
                          {" "}
                          <Typography size={"sm"} type="span">
                            AED
                          </Typography>{" "}
                          {orderDetail.total.toFixed(2)}
                        </Typography>
                        <Button
                          variant={"normal"}
                          size={"lg"}
                          className="!text-xs block mx-auto w-full !text-center"
                        >
                          Pending Payment
                        </Button>
                        <Link
                          href={`/order/${orderDetail.id}`}
                          className={cn(
                            "!text-xs block mx-auto w-full !text-center",
                            buttonVariants({
                              variant: "outline",
                              size: "lg",
                              rounded: "sm",
                            })
                          )}
                        >
                          ORDER DETAILS
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-4 w-full space-y-4 sm:text-sm text-xs">
                  <Typography size={"sm"}>
                    <i>No order has been made yet.</i>
                  </Typography>
                  <Button
                    variant={"outline"}
                    iconRight={
                      <Icon
                        type="chevronRightIcon"
                        sizes={"sm"}
                        className="ml-2"
                      />
                    }
                  >
                    GO SHOP
                  </Button>
                </div>
              )}
            </TransitionComp>
          ) : null}

          {returnOrdersVisibility ? (
            <TransitionComp setTransition={returnOrdersVisibility}>
              <div className="py-4 w-full space-y-4 sm:text-sm text-xs">
                <Typography size={"sm"} variant={"paragraph"}>
                  No return order has been made yet.
                </Typography>
                <Button
                  variant={"outline"}
                  className="px-10"
                  iconRight={
                    <Icon
                      type="rightArrowIcon"
                      sizes={"sm"}
                      className="ml-2 "
                    />
                  }
                >
                  GO SHOP
                </Button>
              </div>
            </TransitionComp>
          ) : null}

          {Prescription ? (
            <TransitionComp setTransition={Prescription}>
              <div className=" w-full  ">
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-muted pb-3">
                    <Typography
                      size={"xl"}
                      bold={"semibold"}
                      variant={"lifeText"}
                    >
                      Prescriptions
                    </Typography>
                    {!precriptionDetailsVisibility ? (
                      <Button
                        rounded={"full"}
                        className="!text-sm"
                        variant={"normal"}
                        iconLeft={
                          <Icon type="plusIcon" sizes={"sm"} className="mr-2" />
                        }
                      >
                        Upload
                      </Button>
                    ) : (
                      <Button
                        rounded={"full"}
                        className="!text-sm"
                        variant={"normal"}
                        iconLeft={
                          <Icon
                            type="chevronLeftIcon"
                            sizes={"sm"}
                            className="mr-2"
                          />
                        }
                        onClick={() => setPrecriptionDetailsVisibility(false)}
                      >
                        Back
                      </Button>
                    )}
                  </div>

                  {prescriptionData && prescriptionData.data.length > 0 ? (
                    !precriptionDetailsVisibility ? (
                      prescriptionData.data.map((prescription: any) => (
                        <div
                          onClick={() => setPrecriptionDetailsVisibility(true)}
                          className="rounded-lg shadow-sm w-full border border-muted px-7 py-4 md:flex block justify-between"
                        >
                          <div className="flex flex-col space-y-3">
                            <Typography
                              bold={"semibold"}
                              className="md:!text-left !text-center"
                            >
                              Request ID #{prescription.id}
                            </Typography>
                            <div className="pb-2">
                              <Typography
                                bold={"light"}
                                size={"sm"}
                                variant={"paragraph"}
                                className="md:!text-left !text-center"
                              >
                                {formatDate(prescription.created_at)}
                              </Typography>
                            </div>
                          </div>
                          <div className="flex space-x-2 items-center">
                            <Button
                              variant={"normal"}
                              size={"lg"}
                              className="!text-xs block mx-auto w-full !text-center h-fit"
                            >
                              Pending
                            </Button>
                            <Icon
                              type="chevronRightIcon"
                              sizes={"lg"}
                              className="text-slate-400"
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="w-full">
                        <div className="flex justify-between border-b pb-3">
                          <div className="space-x-3 flex items-center">
                            <Image
                              height={"50"}
                              width={"50"}
                              src="https://www.lifepharmacy.com/images/svg/emirates_id_front.svg"
                              alt="emirates_id_front"
                            />
                            <Typography bold={"semibold"}>
                              Emirates ID Front
                            </Typography>
                          </div>

                          <Image
                            height={"50"}
                            width={"50"}
                            src={prescriptionData.data[0].emirates_id_front}
                            alt="emiratedId"
                          />
                        </div>
                        <div className="flex justify-between py-3 border-b">
                          <div className="space-x-3 flex items-center">
                            <Image
                              height={"50"}
                              width={"50"}
                              src="https://www.lifepharmacy.com/images/svg/insurance_card_front.svg"
                              alt="insurance_card_front"
                            />
                            <Typography bold={"semibold"}>
                              Insurance Card Front
                            </Typography>
                          </div>

                          <Image
                            height={"50"}
                            width={"50"}
                            src={prescriptionData.data[0].insurance_card_front}
                            alt="emiratedId"
                          />
                        </div>{" "}
                        <div className="flex justify-between  pt-3">
                          <div className="space-x-3 flex items-center">
                            <Image
                              height={"70"}
                              width={"70"}
                              className="-ml-4"
                              src="https://www.lifepharmacy.com/images/svg/prescription_icon.svg"
                              alt="prescription_icon"
                            />
                            <Typography bold={"semibold"}>
                              Prescription
                            </Typography>
                          </div>
                          {prescriptionData.data[0].prescription.map(
                            (pres_img: string) => (
                              <Image
                                height={"50"}
                                width={"50"}
                                src={pres_img}
                                alt="emiratedId"
                              />
                            )
                          )}
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="space-y-5">
                      <Typography size={"sm"} variant={"paragraph"}>
                        No prescription has been made yet.
                      </Typography>
                      <Button
                        variant={"outline"}
                        iconRight={
                          <Icon type="plusIcon" className="ml-2" sizes={"sm"} />
                        }
                      >
                        ADD PRESCRIPTION
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </TransitionComp>
          ) : null}

          {addressesVisibility ? (
            <TransitionComp setTransition={addressesVisibility}>
              <div className="py-4 w-full space-y-5">
                <div className="space-y-3">
                  <Typography size="sm" variant={"paragraph"}>
                    The following addresses will be used on the checkout page by
                    default.
                  </Typography>
                  <div className="flex space-x-2 items-center rtl:space-x-reverse">
                  {!addnewAddressFormVisibility ? 
                     <button>
                     <Icon type="locationPinIcon" sizes={"sm"} /></button> :
                       <button onClick={()=>setaddnewAddressFormVisibility(false)}>
                       <Icon type="chevronLeftIcon" sizes={"sm"} /></button>  }
               
                    <Typography variant={"lifeText"} bold={"bold"}>
                      Addresses
                    </Typography>
                  </div>
                </div>

                {addressData > 0 ? (
                  !addnewAddressFormVisibility ? (
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 my-3">
                      {addressData.map((addr: any) => (
                        <div className="border-muted border shadow-sm rounded-lg px-4 py-3 space-y-4 h-full flex flex-col justify-between ">
                          <div className="space-y-2">
                            <Typography
                              size={"sm"}
                              bold={"bold"}
                              variant={"lifeText"}
                            >
                              {addr.type}
                            </Typography>
                            <div className="w-full bg-[#dee2e6] mx-auto h-[1px]"></div>
                            <div>
                              <Typography
                                size={"xs"}
                                bold={"semibold"}
                                className="mb-2"
                              >
                                {addr.name}
                              </Typography>
                              <Typography size={"xs"}>
                                {addr.google_address}
                              </Typography>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <Button
                              variant={"white"}
                              size={"sm"}
                              className={typographyVariants({
                                variant: "primary",
                                size: "sm",
                              })}
                              iconRight={
                                <Icon
                                  type="editIcon"
                                  sizes={"xs"}
                                  className="ml-1"
                                />
                              }
                              onClick={() => {
                                setValue("name", addr.name);
                                setValue("phone", addr.phone);
                                setValue("type", addr.type);
                                setValue("state", addr.state);
                                setValue("city", addr.city);
                                setValue("street_address", addr.street_address);
                                setValue("flat_number", addr.flat_number);
                                setValue("building", addr.building);
                                setValue("country", addr.country);
                                setValue(
                                  "additional_info",
                                  addr.additional_info
                                );
                                setaddnewAddressFormVisibility(true);
                              }}
                            >
                              Edit
                            </Button>

                            <Button
                              variant={"white"}
                              size={"xs"}
                              className={typographyVariants({
                                variant: "danger",
                                size: "sm",
                              })}
                              onClick={()=>deleteAddress({
                                address_id:addr.id
                              })}
                              iconRight={
                                <Icon
                                  type="crossIcon"
                                  sizes={"sm"}
                                  className="ml-1"
                                />
                              }
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button
                        variant={"outline"}
                        iconLeft={
                          <Icon
                            type="editIcon"
                            sizes={"sm"}
                            className="mr-2 "
                          />
                        }
                      >
                        New Address
                      </Button>
                    </div>
                  ) : (
                    <div className="p-3 border border-muted rounded-lg ">
                      <AddNewAddressForm
                        isModal={false}
                        getValues={getValues}
                        errors={errors}
                        handleSubmit={handleSubmit}
                        register={register}
                      />
                    </div>
                  )
                ) : null}
              </div>
            </TransitionComp>
          ) : null}

          {accountDetails ? (
            <TransitionComp setTransition={accountDetails}>
              <div className=" w-full px-4 py-5 border border-muted rounded-lg h-fit">
                <form className="space-y-6 mb-4">
                  <div className="w-full space-y-2">
                    <Typography
                      requiredField={true}
                      size={"sm"}
                      variant={"paragraph"}
                    >
                      Full Name
                    </Typography>
                    <Input
                      sizes={"sm"}
                      type="text"
                      name="state"
                      defaultValue={
                        session.token.name ? session.token.name : ""
                      }
                      onBlur={(e) => {
                        e.target.value === ""
                          ? e.target.classList.add("border-red-500")
                          : e.target.classList.remove("border-red-500");
                      }}
                      placeholder="Full Name *"
                      required
                    />
                    <Typography size={"xs"} variant={"paragraph"}>
                      Here is shown your first and last name.
                    </Typography>
                  </div>

                  <div className="w-full space-y-2">
                    <Typography
                      requiredField={true}
                      size={"sm"}
                      variant={"paragraph"}
                    >
                      {session.token.email ? "Email Address" : "Phone Number"}
                    </Typography>
                    <Input
                      sizes={"sm"}
                      type="text"
                      name="state"
                      defaultValue={
                        session.token.email
                          ? session.token.email
                          : session.token.phone
                      }
                      onBlur={(e) => {
                        e.target.value === ""
                          ? e.target.classList.add("border-red-500")
                          : e.target.classList.remove("border-red-500");
                      }}
                      placeholder={
                        session.token.email
                          ? "Email Address *"
                          : "Phone Number *"
                      }
                      required
                    />
                  </div>

                  <div className="w-full space-y-2">
                    <Typography size={"sm"} variant={"paragraph"}>
                      Gender (optional)
                    </Typography>
                    <ul className="flex flex-wrap">
                      {genders.map((item) => (
                        <li>
                          <RadioBtnGroup id={item} value={item} name="gender" />
                        </li>
                      ))}
                    </ul>
                  </div>
                </form>
                <Button
                  variant={"outline"}
                  className="px-5 py-2.5"
                  size={"sm"}
                  iconRight={
                    <Icon type="rightArrowIcon" sizes={"sm"} className="ml-2" />
                  }
                >
                  SAVE CHANGES
                </Button>
              </div>
            </TransitionComp>
          ) : null}

          {walletDetails ? (
            <TransitionComp setTransition={walletDetails}>
              <div className="space-y-3 w-full ">
                <div className="bg-[#f4f7ff] p-3 rounded-lg w-full space-x-2 rtl:space-x-reverse sm:text-sm text-xs flex items-center">
                  <Typography bold={"semibold"}>Wallet Balance: </Typography>
                  <Typography
                    variant={"lifeText"}
                    size={"sm"}
                    bold={"semibold"}
                  >
                    AED {session?.token.wallet_balance}.00
                  </Typography>
                </div>
                <div className="border border-muted rounded-lg p-5 space-y-3">
                  <Typography size={"sm"} variant={"paragraph"}>
                    <i>No transactions has been made yet.</i>
                  </Typography>

                  <Button
                    variant={"outline"}
                    className="px-6 py-2.5"
                    size={"sm"}
                    iconRight={
                      <Icon
                        type="rightArrowIcon"
                        sizes={"sm"}
                        className="ml-3"
                      />
                    }
                  >
                    GO SHOP
                  </Button>
                </div>
              </div>
            </TransitionComp>
          ) : null}

          {appointments ? (
            <TransitionComp setTransition={appointments}>
              <div className="py-4 w-full  flex sm:flex-row flex-col justify-between ">
                <div className="space-y-5">
                  <div className="space-y-5">
                    <Typography
                      bold={"semibold"}
                      size={"lg"}
                      variant={"lifeText"}
                    >
                      Appointments
                    </Typography>
                    <Typography size={"sm"} variant={"paragraph"}>
                      No appointment has been made yet.
                    </Typography>
                  </div>

                  <Button
                    variant={"outline"}
                    className="px-6 py-2.5"
                    size={"sm"}
                    iconRight={
                      <Icon
                        type="rightArrowIcon"
                        sizes={"sm"}
                        className="ml-3"
                      />
                    }
                  >
                    BOOK HOME PCR TEST
                  </Button>
                </div>
                <Button
                  variant={"outline"}
                  iconLeft={true}
                  iconType="plusIcon"
                  className="h-fit md:mt-0 mt-3"
                >
                  Add an Appointment
                </Button>
              </div>
            </TransitionComp>
          ) : null}
        </div>
      </div>
      <InvalidOTPModal
        showModal={logOutWarningModal}
        setCloseModal={setLogOutWarningModal}
        modalMessage="Are you sure you want to log out?"
        modalHeader="Logout"
        InvalidAnimationUrl={"/animations/warning-animation.json"}
        buttonProps={
          <div className="flex space-x-2 w-full">
            <Button
              className="mx-auto w-full"
              onClick={() => {
                signOut();
              }}
            >
              OK
            </Button>
            <Button
              variant={"outline"}
              className="mx-auto w-full"
              onClick={() => {
                setLogOutWarningModal(false);
              }}
            >
              Cancel
            </Button>
          </div>
        }
      />
    </div>
  ) : (
    <div className="h-[500px] w-full bg-white"></div>
  );
}
