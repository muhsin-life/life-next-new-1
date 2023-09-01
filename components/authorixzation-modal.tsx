import React from "react";
import ModalContainer from "./ui/modal-container";
import {
  Tabs,
  Tab,
  TabsHeader,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import { useState } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useTimer } from "use-timer";
import { signIn } from "next-auth/react";
import { Button, buttonVariants } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { Input } from "./ui/input";
import Image from "next/image";

import OtpInput from "react-otp-input";
import { useModal } from "./ui/modalcontext";
import Link from "next/link";
import { useRouter } from "next/router";
import { Typography, typographyVariants } from "./ui/typography";
import { Icon } from "./ui/icons";
import { cn } from "@/lib/utils";
import InvalidOTPModal from "./invalid-otp-modal";
import countriesData from "../data/countries-data.json";

const AuthModal = () => {
  // const [isPhoneNumberValid, setPhoneNumberValidState] = useState<any>("");
  const [signInUsing, signInSet] = useState({ value: "", type: "" });
  // const [isEmailValid, setEmailValidState] = useState<any>(null);
  const [otpPageVisibility, setOtpPageVisibility] = useState(false);
  const [state, setState] = useState("");
  const [countDownVisible, setCountDownVisible] = useState(false);
  const handleChange = (state: string) => setState(state);
  const [phoneNumberforOTP, setPhoneNumberforOtp] = useState("");
  const [LoginSignUpPageVisibility, setLoginSignUpPageVisibility] =
    useState(true);

  const [notValidOTPPageVisib, setnotValidOTPPageVisib] = useState(false);
  const [credentialValidState, setCredentialValidState] = useState<any>({
    email: {
      state: null,
    },
    phone: {
      state: null,
    },
  });
  const { pathname } = useRouter();

  const {
    setSheetOpen,
    setaddNewAddress,
    setaddnewAddressFormVisibility,
    isSheetOpen,
    setLocationModal,
    isFixedModal,
    setTermsModal,
    setPrivacyPolicyModalState,
    countriesDrawerState,
    setCountriesDrawerState,
    selectedCountryData,
    setSelectedCountryData,
  } = useModal();

  const { time, start, pause, reset, status } = useTimer({
    initialTime: 59,
    timerType: "DECREMENTAL",
  });

  async function otpIsValid(otpValue: string) {
    debugger;

    if (signInUsing.type === "phone") {
      await signIn("credentials", {
        phone: phoneNumberforOTP,
        code: otpValue,
        isPhone: "true",
        redirect: false,
      }).then(async (res) => {
        debugger;

        if (res?.ok) {
          setaddNewAddress(true);
          setaddnewAddressFormVisibility(false);
          setLocationModal(false);
          setSheetOpen(false);
        } else {
          setnotValidOTPPageVisib(true);
        }
      });
    } else {
      await signIn("credentials", {
        email: phoneNumberforOTP,
        code: otpValue,
        isPhone: "false",
        redirect: false,
      }).then(async (res) => {
        debugger;

        if (res?.ok) {
          setaddNewAddress(true);
          setaddnewAddressFormVisibility(false);
          setLocationModal(false);
          setSheetOpen(false);
        } else {
          setnotValidOTPPageVisib(true);
        }
      });

      setCredentialValidState({
        email: {
          state: null,
        },
        phone: {
          state: null,
        },
      });
    }
  }

  function sendOTPRequest(credential: string, type: string) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw;
    if (type === "phone") {
      raw = JSON.stringify({
        phone: credential,
      });
    } else if (type === "email") {
      raw = JSON.stringify({
        email: credential,
      });
    }

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    setPhoneNumberforOtp(credential);
    const res = fetch(
      "https://devapp.lifepharmacy.com/api/auth/request-otp",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error while fetching search data", error));
  }

  const [phoneNumberValidTimeout, setPhoneNumberValidTimeout] =
    useState<any>(null);

  function isValidCredentials(credentialType: string, credentialValue: string) {
    // setPhoneNumberValidState("loading");
    setCredentialValidState((prevState: any) => ({
      ...prevState,
      [credentialType]: {
        state: "loading",
      },
    }));
    clearTimeout(phoneNumberValidTimeout);
    const timeout = setTimeout(() => {
      if (credentialValue != null || "") {
        if (
          (credentialType === "phone" && isValidPhoneNumber(credentialValue)) ||
          (credentialType === "email" &&
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
              credentialValue
            ))
        ) {
          signInSet({ type: credentialType, value: credentialValue });
          setCredentialValidState((prevState: any) => ({
            ...prevState,
            [credentialType]: {
              state: "success",
            },
          }));
        } else {
          setCredentialValidState((prevState: any) => ({
            ...prevState,
            [credentialType]: {
              state: "failed",
            },
          }));
        }
      } else {
        setCredentialValidState((prevState: any) => ({
          ...prevState,
          [credentialType]: {
            state: "failed",
          },
        }));
      }
    }, 400);
    setPhoneNumberValidTimeout(timeout);
  }

  function startTimer() {
    start();
    setCountDownVisible(true);
  }
  const stopTimer = () => {
    setCountDownVisible(false);
    reset();
    return 0;
  };

  function isValidPhoneNoInput(SetOtpVisb: boolean) {
    if (SetOtpVisb) {
      setLoginSignUpPageVisibility(false);
      setOtpPageVisibility(true);
      setState("");
      startTimer();

      sendOTPRequest(signInUsing.value, signInUsing.type);
    } else {
      setLoginSignUpPageVisibility(true);
      setOtpPageVisibility(false);
      stopTimer();
      setCredentialValidState({
        email: {
          state: null,
        },
        phone: {
          state: null,
        },
      });
    }
  }

  return (
    <>
      <ModalContainer
        size={"lg"}
        showModal={isSheetOpen}
        setCloseModal={
          isFixedModal && pathname === "/checkout" ? () => {} : setSheetOpen
        }
      >
        <div className=" flex justify-between items-center pb-1 font-semibold ">
          <Typography size={"xxl"} bold={"bold"}>
            Login or Sign up
          </Typography>

          <Button
            size={"sm"}
            rounded={"full"}
            variant={"closeBtn"}
            onClick={() => {
              isFixedModal ? () => {} : setSheetOpen(false);
            }}
          >
            <Icon type="crossIcon" />
          </Button>
        </div>
        {LoginSignUpPageVisibility ? (
          <form className="sm:space-y-2 space-y-0 pb-2" action="#">
            <div className="mt-3 flex-1">
              <Tabs value="phone" className="border-none">
                <TabsHeader className="bg-slate-100">
                  <Tab key="phone" value="phone" className="z-20">
                    <Typography bold={"semibold"}>Using Phone</Typography>
                  </Tab>
                  <Tab key="email" value="email">
                    <Typography bold={"semibold"}>Using Email</Typography>
                  </Tab>
                </TabsHeader>
                <TabsBody>
                  <TabPanel key="phoneinput" value="phone">
                    <div>
                      <Typography
                        bold={"semibold"}
                        size={"lg"}
                        requiredField={true}
                      >
                        Enter Your Mobile Number
                      </Typography>

                      <Input
                        sizes={"sm"}
                        buttonLeft={
                          <Button
                            onClick={(e) => {
                              e.preventDefault();
                              setCountriesDrawerState(true);
                            }}
                            variant={"normal"}
                            position={"inputLeftBtn"}
                            className=""
                          >
                            {selectedCountryData ? (
                              <>
                                {" "}
                                <Image
                                  src={`https://hatscripts.github.io/circle-flags/flags/${selectedCountryData.alpha2Code.toLowerCase()}.svg`}
                                  width="50"
                                  height="50"
                                  className={`sm:w-8 sm:h-8 h-7 w-7  `}
                                  alt={selectedCountryData.name}
                                />
                                <Typography
                                  className="px-2"
                                  bold={"bold"}
                                  size={"lg"}
                                >
                                  {" "}
                                  +{selectedCountryData.callingCodes}
                                </Typography>
                                <Icon
                                  type="chevronBottomIcon"
                                  className="text-black"
                                />
                              </>
                            ) : null}
                          </Button>
                        }
                        className={cn(
                          typographyVariants({
                            bold: "bold",
                            size: "lg",
                          })
                        )}
                        onChange={(e) =>
                          isValidCredentials(
                            "phone",
                            "+" +
                              selectedCountryData.callingCodes +
                              e.target.value
                          )
                        }
                        iconRight={
                          credentialValidState.phone.state === "loading" ? (
                            <Icon
                              variant={"inputIconRight"}
                              className={typographyVariants({
                                variant: "lifeText",
                              })}
                              type="loadingIcon"
                              animation={"spin"}
                            />
                          ) : credentialValidState.phone.state === "success" ? (
                            <Icon
                              type="checkIcon"
                              variant={"inputIconRight"}
                              className="fill-green-500 text-white"
                            />
                          ) : credentialValidState.phone.state === "failed" ? (
                            <Icon
                              type="errorIcon"
                              className="text-red-500"
                              variant={"inputIconRight"}
                            />
                          ) : null
                        }
                      />
                    </div>
                  </TabPanel>
                  <TabPanel key="emailInput" value="email">
                    <div>
                      <Typography
                        bold={"semibold"}
                        size={"lg"}
                        requiredField={true}
                      >
                        Enter Your Email Address
                      </Typography>

                      <Input
                        sizes={"sm"}
                        className={typographyVariants({
                          bold: "bold",
                          size: "lg",
                        })}
                        iconRight={
                          credentialValidState.email.state === "loading" ? (
                            <Icon
                              variant={"inputIconRight"}
                              className={typographyVariants({
                                variant: "lifeText",
                              })}
                              type="loadingIcon"
                              animation={"spin"}
                            />
                          ) : credentialValidState.email.state === "success" ? (
                            <Icon
                              type="checkIcon"
                              variant={"inputIconRight"}
                              className="fill-green-500 text-white"
                            />
                          ) : credentialValidState.email.state === "failed" ? (
                            <Icon
                              type="errorIcon"
                              className="text-red-500"
                              variant={"inputIconRight"}
                            />
                          ) : null
                        }
                        iconLeft={
                          <Icon
                            type="mailIcon"
                            variant={"inputIconLeft"}
                            className="text-slate-400"
                          />
                        }
                        iconSize={"lg"}
                        onChange={(e) => {
                          isValidCredentials("email", e.target.value);
                        }}
                      />
                    </div>
                  </TabPanel>
                </TabsBody>
              </Tabs>
            </div>
            <div className="space-y-2">
              <Typography size={"sm"}>
                By continuing, I agree to the{" "}
                <Button
                  variant="primaryLink"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    setTermsModal(true);
                  }}
                >
                  Terms of Use
                </Button>{" "}
                &{" "}
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setPrivacyPolicyModalState(true);
                  }}
                  variant="primaryLink"
                  size="sm"
                >
                  Privacy Policy
                </Button>{" "}
              </Typography>

              <div className="flex space-x-2">
                {isFixedModal && pathname === "/checkout" ? (
                  <Link
                    href="/cart"
                    onClick={() => setSheetOpen(false)}
                    className={
                      "w-2/3 sm:1/3 sm:text-base text-sm " +
                      buttonVariants({ variant: "outline", size: "default" })
                    }
                  >
                    Back To Cart
                  </Link>
                ) : null}
                <Button
                  disableBtn={
                    credentialValidState.phone.state === "success" ||
                    credentialValidState.email.state === "success"
                      ? false
                      : true
                  }
                  className="w-full"
                  onClick={() => {
                    isValidPhoneNoInput(true);
                  }}
                >
                  PROCEED
                </Button>
              </div>
            </div>
          </form>
        ) : null}
        {otpPageVisibility ? (
          <div className="py-2 space-y-1" id="otpPage">
            <Typography bold={"semibold"} variant={"primary"} size={"xl"}>
              OTP Code
            </Typography>
            <Typography type="p" requiredField={true}>
              Please check your {signInUsing.type} and enter the OTP code{" "}
            </Typography>
            <form className="space-y-6" action="#">
              <OtpInput
                value={state}
                onChange={handleChange}
                containerStyle={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                numInputs={4}
                inputStyle={{
                  width: "100%",
                  fontSize: "1.5rem",
                  paddingTop: "0.5rem",
                  paddingBottom: "0.5rem",
                }}
                renderSeparator={<span className="w-[7rem] "> </span>}
                renderInput={(props: any) => (
                  <Input {...props} className="h-14" />
                )}
              />
              <div>
                {countDownVisible ? (
                  <div className="flex justify-between" id="seconds-count">
                    <Typography size={"sm"}>Didn't Receive Code?</Typography>{" "}
                    <Typography size={"sm"}>
                      Request again in {time >= 0 ? time : stopTimer()} seconds
                    </Typography>{" "}
                  </div>
                ) : (
                  <Button
                    variant={"outline"}
                    onClick={() => {
                      isValidPhoneNoInput(true);
                    }}
                    type="button"
                    size={"sm"}
                  >
                    RESEND OTP
                  </Button>
                )}
              </div>
              <div className="flex space-x-3">
                <Button
                  onClick={() => {
                    isValidPhoneNoInput(false);
                  }}
                  variant={"outline"}
                  className="w-1/3"
                >
                  Back
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    otpIsValid(state);
                  }}
                  className="w-full"
                  disabled={state.length === 4 ? false : true}
                >
                  PROCEED
                </Button>
              </div>
            </form>
          </div>
        ) : null}
      </ModalContainer>

      <ModalContainer
        showModal={countriesDrawerState}
        setCloseModal={setCountriesDrawerState}
        size={"lg"}
      >
        <div className="pb-2">
          <Typography bold={"semibold"} size={"xxl"}>
            Select a Country
          </Typography>
        </div>
        <Command className="rounded-lg border shadow-md ">
          <CommandInput placeholder="Search for Countries..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {selectedCountryData ? (
                <CommandItem className="bg-green-100 items-center flex justify-between pr-5">
                  <div
                    className="flex items-center cursor-pointer  py-1"
                    onClick={() => {
                      setCountriesDrawerState(false);
                    }}
                  >
                    <Image
                      src={`https://hatscripts.github.io/circle-flags/flags/${selectedCountryData.alpha2Code.toLowerCase()}.svg`}
                      width="50"
                      height="50"
                      className="w-8 h-8 mx-3"
                      alt={selectedCountryData.name}
                    />
                    <Typography>{selectedCountryData.name}</Typography>
                    <Typography size={"sm"} bold={"semibold"}>
                      (+{selectedCountryData.callingCodes})
                    </Typography>
                  </div>
                  <Icon type="checkIcon" className="text-green-500" />
                </CommandItem>
              ) : null}
              {countriesData
                ? countriesData.map((countr: any) => (
                    <CommandItem
                      className={` ${
                        selectedCountryData &&
                        selectedCountryData.name === countr.name
                          ? "hidden"
                          : ""
                      } `}
                    >
                      <div
                        className=" items-center flex pr-5 cursor-pointer py-1"
                        onClick={() => {
                          setSelectedCountryData(countr);
                          setCountriesDrawerState(false);
                        }}
                      >
                        <Image
                          src={`https://hatscripts.github.io/circle-flags/flags/${countr.alpha2Code.toLowerCase()}.svg`}
                          width="50"
                          height="50"
                          className="w-8 h-8 mx-3"
                          alt={countr.name}
                        />

                        <Typography> {countr.name}</Typography>
                        <Typography size={"sm"} bold={"semibold"}>
                          (+{countr.callingCodes})
                        </Typography>
                      </div>
                    </CommandItem>
                  ))
                : null}
            </CommandGroup>
            <CommandSeparator />
          </CommandList>
        </Command>
      </ModalContainer>

      <InvalidOTPModal
        modalHeader="Invalid OTP Entered"
        modalMessage="Please try Again!"
        showModal={notValidOTPPageVisib}
        setCloseModal={setnotValidOTPPageVisib}
        buttonProps={
          <Button
            className="mx-auto w-full"
            onClick={() => {
              setnotValidOTPPageVisib(false);
            }}
          >
            OK
          </Button>
        }
      />
    </>
  );
};

export default AuthModal;
