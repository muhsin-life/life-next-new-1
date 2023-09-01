import ModalContainer from "./ui/modal-container";
import React, { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { useModal } from "./ui/modalcontext";
import { Typography } from "./ui/typography";
import { Button } from "./ui/button";
import { Icon } from "./ui/icons";
import { useForm } from "react-hook-form";
import { Player } from "@lottiefiles/react-lottie-player";
import { Radio } from "./ui/skeleton";
import { AddNewAddressForm } from "./addnewAddressForm";

const AddressModal = () => {
  const [addNewAddressClick, setAddNewAddressClick] = useState(true);
  const { data: session } = useSession();

  const {
    setaddNewAddress,
    addNewAddress,
    setAddressDataIndex,
    AddressDataIndex,
    availableAddresses,
    setavailableAddresses,
    setaddnewAddressFormVisibility,
    addnewAddressFormVisibility,
    addressData,
  } = useModal();



  function setCloseModal() {
    setaddNewAddress(false);
    setaddnewAddressFormVisibility(false);
  }


  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
  });

  return (
    <ModalContainer
      size={"lg"}
      showModal={session && addNewAddress ? true : false}
      setCloseModal={setCloseModal}
    >
      {addNewAddressClick && addressData === 0 ? (
        <div className=" bg-white rounded-lg   overflow-y-auto no-scrollbar min-h-fit  max-h-[calc(80vh-1rem)] ">
          <div className="space-y-6">
            <Player
              speed={0.7}
              src={
                "https://lottie.host/65751e04-d11e-477e-8312-59ffd9f6aeb5/QaZAktKuHA.json"
              }
              autoplay
              loop
              keepLastFrame={true}
              className="w-80 h-80"
            />
            <div className="py-5">
              <Typography bold={"bold"} size={"xl"}>
                You have no saved Addresses
              </Typography>
              <p className="text-gray-400 text-sm py-1">
                Start by adding a new address
              </p>
            </div>
          </div>
          <div className="flex items-center  space-x-2 border-t border-gray-200 rounded-b  sticky bottom-0">
            <Button
              type="button"
              className="w-full"
              onClick={() => {
                setAddNewAddressClick(false);
                setaddnewAddressFormVisibility(true);
              }}
            >
              ADD NEW ADDRESS
            </Button>
          </div>
        </div>
      ) : (
        ""
      )}
      {addnewAddressFormVisibility ? (
        <AddNewAddressForm isModal={true} setCloseModal={setCloseModal} getValues={getValues} handleSubmit={handleSubmit} register={register} errors={errors}/>
      ) : (
        ""
      )}
      {addressData && addressData.length > 0 && availableAddresses ? (
        <div className=" overflow-y-auto overflow-x-hidden  no-scrollbar  min-h-fit  max-h-[calc(80vh-1rem)]">
          <div className="w-full flex justify-between pb-2 items-center">
            <div className="flex space-x-2 items-center">
              <Icon type="locationPinIcon" />
              <Typography size={"lg"} bold={"bold"} variant={"lifeText"}>
                Addresses
              </Typography>
            </div>

            <Button
              size={"sm"}
              onClick={() => {
                setavailableAddresses(false);
                setaddnewAddressFormVisibility(true);
              }}
            >
              Add New Address
            </Button>
          </div>
          <RadioGroup value={AddressDataIndex} onChange={setAddressDataIndex}>
            <div className="rounded-lg p-3 bg-slate-50 border-2 border-muted">
              <div className="rounded-full p-1 px-2 bg-violet-100">
                <Typography size={"xs"} bold={"bold"}>
                  AVAILABLE ADDRESSES
                </Typography>
              </div>
              {addressData.map((addr: any, indx: number) => (
                <RadioGroup.Option
                  key={addr.id}
                  value={addr}
                  className={({ active, checked }) =>
                    ` ${active ? "" : ""}
                  ${checked ? " bg-opacity-75 " : "bg-slate-50"}
                    relative flex cursor-pointer p-2 ${
                      indx != addressData.length - 1
                        ? " border-muted border-b-2 focus:outline-none"
                        : ""
                    }`
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <div className="flex w-full  justify-between">
                        <div className="flex items-center">
                          <div className="text-sm flex space-x-7">
                            <RadioGroup.Description
                              as="span"
                              className={`inline ${checked ? "" : ""}`}
                            >
                              <div className="flex space-x-3 items-start">
                                <Radio checked={checked} />
                                <table className="table-auto">
                                  <tbody>
                                    <tr>
                                      <td className="table-data ">
                                        <Typography size={"xs"}>
                                          NAME
                                        </Typography>
                                      </td>
                                      <td className="table-data">
                                        <Typography
                                          size={"xs"}
                                          bold={"semibold"}
                                        >
                                          {" "}
                                          {addr.name}
                                        </Typography>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="table-data">
                                        <Typography size={"xs"}>
                                          ADDRESS
                                        </Typography>
                                      </td>
                                      <td className="table-data">
                                        <Typography
                                          size={"xs"}
                                          bold={"semibold"}
                                          lineClamp={"one"}
                                        >
                                          {" "}
                                          {addr.google_address}
                                        </Typography>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="table-data">
                                        <Typography size={"xs"}>
                                          PHONE
                                        </Typography>
                                      </td>
                                      <td className="table-data">
                                        <Typography
                                          size={"xs"}
                                          bold={"semibold"}
                                        >
                                          {" "}
                                          {addr.phone}
                                        </Typography>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </RadioGroup.Description>
                          </div>
                        </div>
                        {
                          <Button
                            variant={"closeBtn"}
                            className="shrink-0 text-life cursor-pointer p-0"
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
                              setValue("additional_info", addr.additional_info);
                              setavailableAddresses(false);
                              setaddnewAddressFormVisibility(true);
                            }}
                          >
                            <Icon type="editIcon" sizes={"xs"} />
                          </Button>
                        }
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>

          <div className="w-full bg-white pt-3 sticky bottom-0">
            <Button
              className="w-full"
              size={"sm"}
              onClick={() => {
                setaddNewAddress(false);
                setaddnewAddressFormVisibility(false);
              }}>
              CONFIRM ADDRESS
            </Button>
          </div>
        </div>
      ) : (
        ""
      )}
    </ModalContainer>
  );
};

export default AddressModal;
