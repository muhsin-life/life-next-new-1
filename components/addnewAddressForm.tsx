import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Icon } from "./ui/icons";
import { Input } from "./ui/input";
import { useModal } from "./ui/modalcontext";
import { Typography } from "./ui/typography";
import { useSession } from "next-auth/react";
import { isValidPhoneNumber } from "react-phone-number-input";
import Image from "next/image";
import countriesData from "../data/countries-data.json";
import { inputVariants } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdownMenu";
import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

const AddNewAddressForm = ({
  isModal,
  setCloseModal,
  getValues,
  handleSubmit,
  register,
  errors,
}: {
  isModal: boolean;
  setCloseModal?: any;
  getValues: any;
  handleSubmit: any;
  register: any;
  errors: any;
}) => {
  const { data: session } = useSession();
  const { countries, currentCountryDetails } = useLanguage();

  const {
    setavailableAddresses,
    selectedCountryData,
    setCountriesDrawerState,
    setaddnewAddressFormVisibility,
    setAddNewAddressClick,
    formDataInitState,
    setAddressDataIndex,
    setaddNewAddress,
    setFormData,
  } = useModal();

  const deliveryOptions = ["Home", "Other"];
  const [deliverToTypes, setDeliverTo] = useState("Home");
  const [selectedCountry, setCountrySelected] = useState<any>(
    currentCountryDetails.country
  );
  //   const {
  //     handleSubmit,
  //     register,
  //     getValues,
  //     formState: { isValid, errors },
  //   } = useForm({
  //     mode: "onChange",
  //   });

  const addressFormOnSubmit = (data: any): void => {
    debugger;
    saveAddresstoDb({
      ...formDataInitState,
      ...data,
      ...{
        phone: "+" + selectedCountryData.callingCodes + getValues("phone"),
      },
    });
  };

  function saveAddresstoDb(formDatas: any) {
    debugger;
    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.token.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDatas),
    };
    fetch(
      "https://devapp.lifepharmacy.com/api/user/save-address",
      requestOptions
    )
      .then((response) => {
        debugger;
        if (response.ok) {
          setAddressDataIndex(0);
          setaddNewAddress(false);
          setaddnewAddressFormVisibility(false);
          setFormData(formDataInitState);
        } else {
          throw new Error("Request failed");
        }
      })
      .then((result) => console.log(result))
      .catch((error) => console.log("error while fetching search data", error));
  }
  return (
    <div className="relative   rounded-lg  overflow-y-auto no-scrollbar bg-white">
      <div className="flex">
        <div className=" flex items-center space-x-3 rtl:space-x-reverse">
          {isModal && (
            <>
              <Button rounded={"full"} variant={"closeBtn"} size={"xs"}>
                <Icon
                  onClick={() => {
                    setaddnewAddressFormVisibility(false);
                    setAddNewAddressClick(true);
                    setavailableAddresses(true);
                  }}
                  type="chevronLeftIcon"
                />
              </Button>

              <Typography size={"xl"} variant={"lifeText"} bold={"bold"}>
                Your Address
              </Typography>
            </>
          )}
        </div>
        {isModal && (
          <Button
            variant={"closeBtn"}
            size={"xs"}
            rounded={"full"}
            onClick={() => setCloseModal(false)}
          >
            <Icon type="crossIcon" />
          </Button>
        )}
      </div>

      <div className="  bg-white">
        <form
          className="space-y-3 pt-3"
          onSubmit={handleSubmit(addressFormOnSubmit)}
        >
          <div className="space-y-2">
            <Button
              variant={"default"}
              size={"sm"}
              rounded={"txl"}
              className="!text-xs"
            >
              PERSONAL DETAILS
            </Button>
            <Input
              sizes={"sm"}
              {...register("name", {
                required: true,
              })}
              className={`${
                errors.name?.type === "required" ? "border-red-500" : ""
              }`}
              type="text"
              name="name"
              placeholder="Full Name *"
            />
            {errors.name?.type === "required" && (
              <Typography variant={"danger"} size={"xs"}>
                First Name is Required
              </Typography>
            )}
          </div>
          <div className="space-y-2">
            <Typography>
              Enter your mobile number <span className="text-red-500">*</span>
            </Typography>

            <Input
              sizes={"xs"}
              {...register("phone", {
                required: true,
                validate: (value: any) =>
                  isValidPhoneNumber(
                    "+" + selectedCountryData.callingCodes + value
                  ),
              })}
              className={`font-semibold !text-lg ${
                errors.phone?.type === "validate" ? "border-red-500" : ""
              }`}
              buttonLeft={
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setCountriesDrawerState(true);
                  }}
                  variant={"normal"}
                  className="text-black"
                  position={"inputLeftBtn"}
                >
                  {selectedCountryData ? (
                    <>
                      {" "}
                      <Image
                        src={`https://hatscripts.github.io/circle-flags/flags/${selectedCountryData.alpha2Code.toLowerCase()}.svg`}
                        width="50"
                        height="50"
                        className={`sm:w-6 sm:h-6 h-6 w-6`}
                        alt={countriesData[0].name}
                      />
                      <Typography className="px-2" bold={"bold"} size={"lg"}>
                        {" "}
                        +{selectedCountryData.callingCodes}
                      </Typography>
                    </>
                  ) : null}
                </Button>
              }
            />
            {errors.phone?.type === "required" && (
              <Typography variant={"danger"} size={"xs"}>
                Phone Number is Required
              </Typography>
            )}
          </div>
          <div className="space-y-2">
            <Button
              variant={"default"}
              size={"sm"}
              rounded={"full"}
              className="!text-xs"
            >
              ADDRESS DETAILS
            </Button>

            <Input
              sizes={"sm"}
              {...register("type", { value: deliverToTypes })}
              buttonLeft={
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="rounded-r-none">
                    <Button variant={"normal"} size={"sm"}>
                      <Icon type="homeIconMenu" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" forceMount>
                    {deliveryOptions.map((opt) => (
                      <DropdownMenuItem onClick={() => setDeliverTo(opt)}>
                        <span> {opt}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              }
              className="rounded-l-none"
              value={deliverToTypes}
            />
          </div>
          <div className="flex space-x-6 ">
            <Input
              {...register("state", { required: true })}
              sizes={"sm"}
              className={`${
                errors.emirates?.type === "required" ? "border-red-500" : ""
              }`}
              placeholder="Emirates *"
              required
            />

            <Input
              sizes={"sm"}
              {...register("city", { required: true })}
              placeholder="City *"
              required
            />
          </div>

          <Input
            {...register("street_address", { required: true })}
            sizes={"sm"}
            className={`${
              errors.street_address?.type === "required" ? "border-red-500" : ""
            }`}
            placeholder="Street Address *"
            required
          />

          <div className="flex space-x-6">
            <Input
              {...register("flat_number", { required: true })}
              sizes={"sm"}
              className={`${
                errors.flatorVilla?.type === "required" ? "border-red-500" : ""
              }`}
              placeholder="Flat / Villa *"
              required
            />
            <Input
              {...register("building", { required: true })}
              sizes={"sm"}
              className={`${
                errors.building?.type === "required" ? "border-red-500" : ""
              }`}
              placeholder="Building *"
              required
            />
          </div>

          <div className="flex ">
            <Input
              {...register("country", { value: currentCountryDetails })}
              sizes={"sm"}
              buttonLeft={
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="rounded-r-none">
                    <Button variant={"normal"} size={"sm"}>
                      {/* <span className="mx-2"> {selectedFilter.text}</span> */}
                      {/* <Icon type="chevronBottomIcon" size={"sm"} /> */}
                      <Typography size={"sm"}>Country</Typography>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" forceMount>
                    {countries.map((countryData) => (
                      <DropdownMenuItem
                        onClick={() => setCountrySelected(countryData.country)}
                      >
                        <span> {countryData.country}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              }
              className="rounded-l-none"
              value={selectedCountry}
            />
          </div>
          <textarea
            {...register("additional_info", { required: false })}
            rows={2}
            placeholder="Additional information (eg. Area, Landmark)"
            className={inputVariants({ variant: "default" })}
          ></textarea>

          <Button type="submit" size={"sm"} className="w-full">
            SAVE ADDRESS
          </Button>
        </form>
      </div>
    </div>
  );
};

export { AddNewAddressForm };
