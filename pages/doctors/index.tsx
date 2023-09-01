import getDoctorsListData from "@/lib/getDoctorsListData";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "@/components/accordion-radix";
import * as Accordion from "@radix-ui/react-accordion";
import Link from "next/link";
import BreadCrumb from "@/components/breadcrumb";
import { useRouter } from "next/router";
import { Icon } from "@/components/ui/icons";
import { Typography } from "@/components/ui/typography";
import { Button, buttonVariants } from "@/components/ui/button";


export default function ({
  DoctorsListData,
  SpecialityQuery,
}: {
  DoctorsListData: any;
  SpecialityQuery: any;
}) {
  const [doctorsData, setDoctorsData] = useState(DoctorsListData.data.doctors);
  const [noOfDoctors, setnoOfDoctors] = useState(10);
  const [animateSpin, setAnimateSpin] = useState(false);
  const { query } = useRouter();
  const router = useRouter();

  
  const LoadMoreDoctorsData = () => {
    setAnimateSpin(true);

    getDoctorsListData(
      noOfDoctors,
      10,
      SpecialityQuery ? query.toString() : null
    ).then((dList) => {
      let doctorsListData = SpecialityQuery ? dList.data.doctors : dList.data;
      setDoctorsData([...doctorsData, ...doctorsListData]);
      setAnimateSpin(false);
    });
    setnoOfDoctors((no) => no + 10);
  };

  const specialitiesOnChange = (specialityQuery: string) => {
    router.push({
      pathname: "/doctors",
      query: {
        speciality: specialityQuery,
        slot: query.slot ? query.slot : "",
      },
    });
  };

  const slotsOnChange = (specialityQuery: string) => {
    router.push({
      pathname: "/doctors",
      query: {
        speciality: specialityQuery,
        slot: query.slot ? query.slot : "",
      },
    });
  };

  useEffect(() => {
    setDoctorsData(DoctorsListData.data.doctors);
  });
  return (
    <div className="max-w-[1440px] px-[10px] mx-auto">
      <BreadCrumb
        menuData={["Medical Centre", "Doctors"]}
        type="Medical Centre"
      />
      <div className="grid grid-cols-12 space-x-2 rtl:space-x-reverse">
        <div className="col-span-3">
          <form className="hidden lg:block sticky top-40 ">
            <div className="justify-between flex py-2 text-sm">
              <p>Filters:</p>
              <Link href="/doctors" className="text-primary ">
                <small>Clear All</small>
              </Link>
            </div>
            <hr />
            <Accordion.Root type="single" defaultValue="item-1" collapsible>
              <AccordionItem className="py-2" value="item-1">
                <AccordionTrigger className=" text-lg">
                  Neatest Clinics
                </AccordionTrigger>

                <AccordionContent className="py-2">
                  <div className="mb-2">
                    <p className="text-xs">
                      Visit any Life Walk in clinic to give your sample
                      conviniently located across UAE.
                    </p>
                    <button className="bg-life text-white text-xs px-3 py-0.5 rounded-full my-2">
                      SELECT LOCATION
                    </button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion.Root>
            <hr />
            <Accordion.Root collapsible defaultValue="item-1" type="single">
              <AccordionItem className="py-2" value="item-1">
                <AccordionTrigger className=" text-lg">
                  Now or Later
                </AccordionTrigger>

                <AccordionContent className="py-2">
                  <div className="mb-2">
                    <input
                      type="radio"
                      id="anytime"
                      name="slot"
                      checked={query.slot === "anytime" || !query.slot}
                      onChange={() =>
                        router.push({
                          query: {
                            speciality: query.speciality
                              ? query.speciality
                              : "",
                            slot: "anytime",
                          },
                        })
                      }
                    />
                    <label htmlFor="anytime" className="mx-4 cursor-pointer">
                      AnyTime
                    </label>
                  </div>
                  <div className="mb-2">
                    <input
                      type="radio"
                      id="Today"
                      name="slot"
                      checked={query.slot === "today"}
                      onChange={() =>
                        router.push({
                          query: {
                            speciality: query.speciality
                              ? query.speciality
                              : "",
                            slot: "today",
                          },
                        })
                      }
                    />
                    <label htmlFor="Today" className="mx-4 cursor-pointer">
                      Today
                    </label>
                  </div>
                  <div className="mb-2">
                    <input
                      type="radio"
                      id="Tommorrow"
                      name="slot"
                      checked={query.slot === "tommorrow"}
                      onChange={() =>
                        router.push({
                          query: {
                            speciality: query.speciality
                              ? query.speciality
                              : "",
                            slot: "tommorrow",
                          },
                        })
                      }
                    />
                    <label htmlFor="Tommorrow" className="mx-4 cursor-pointer">
                      Tommorrow
                    </label>
                  </div>
                  <div className="mb-2">
                    <input
                      type="radio"
                      id="NextFriday"
                      name="slot"
                      checked={query.slot === "next_one_day"}
                      onChange={() =>
                        router.push({
                          query: {
                            speciality: query.speciality
                              ? query.speciality
                              : "",
                            slot: "next_one_day",
                          },
                        })
                      }
                    />
                    <label htmlFor="NextFriday" className="mx-4 cursor-pointer">
                      Next Sunday
                    </label>
                  </div>
                  <div className="mb-2">
                    <input
                      type="radio"
                      id="NextSaturday"
                      name="slot"
                      checked={query.slot === "next_two_day"}
                      onChange={() =>
                        router.push({
                          query: {
                            speciality: query.speciality
                              ? query.speciality
                              : "",
                            slot: "next_two_day",
                          },
                        })
                      }
                    />
                    <label
                      htmlFor="NextSaturday"
                      className="mx-4 cursor-pointer"
                    >
                      Next Monday
                    </label>
                  </div>
                  <div className="mb-2">
                    <input
                      type="radio"
                      id="NextSunday"
                      name="slot"
                      checked={query.slot === "next_three_day"}
                      onChange={() =>
                        router.push({
                          query: {
                            speciality: query.speciality
                              ? query.speciality
                              : "",
                            slot: "next_three_day",
                          },
                        })
                      }
                    />
                    <label htmlFor="NextSunday" className="mx-4 cursor-pointer">
                      Next Tuesday
                    </label>
                  </div>
                  <div className="mb-2">
                    <input
                      type="radio"
                      id="NextMonday"
                      name="slot"
                      checked={query.slot === "next_four_day"}
                      onChange={() =>
                        router.push({
                          query: {
                            speciality: query.speciality
                              ? query.speciality
                              : "",
                            slot: "next_four_day",
                          },
                        })
                      }
                    />
                    <label htmlFor="NextMonday" className="mx-4 cursor-pointer">
                      Next Wednesday
                    </label>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion.Root>
            <hr />

            <Accordion.Root type="single" defaultValue="item-1" collapsible>
              <AccordionItem className="py-2" value="item-1">
                <AccordionTrigger className=" text-lg">
                  Specialities
                </AccordionTrigger>
                <AccordionContent className="py-2">
                  <div className="mb-2 ">
                    <input
                      type="radio"
                      id="GeneralMedicine"
                      name="Speciality"
                      checked={
                        query.speciality === "general-medicine" ||
                        !query.speciality
                      }
                      onChange={() => {
                        specialitiesOnChange("general-medicine");
                      }}
                    />
                    <label
                      htmlFor="GeneralMedicine"
                      className="mx-4 cursor-pointer"
                    >
                      General Medicine
                    </label>
                  </div>
                  <div className="mb-2">
                    <input
                      type="radio"
                      id="Paediatrics"
                      name="Speciality"
                      checked={query.speciality === "paediatrics"}
                      onChange={() => {
                        specialitiesOnChange("paediatrics");
                      }}
                    />
                    <label
                      htmlFor="Paediatrics"
                      className="mx-4 cursor-pointer"
                    >
                      Paediatrics
                    </label>
                  </div>
                  <div className="mb-2">
                    <input
                      type="radio"
                      id="Orthopaedics"
                      name="Speciality"
                      checked={query.speciality === "orthopaedics"}
                      onChange={() => {
                        specialitiesOnChange("orthopaedics");
                      }}
                    />
                    <label
                      htmlFor="Orthopaedics"
                      className="mx-4 cursor-pointer"
                    >
                      Orthopaedics
                    </label>
                  </div>
                  <div className="mb-2">
                    <input
                      type="radio"
                      id="ObstetricsGynaecology"
                      name="Speciality"
                      checked={query.speciality === "obstetrics-gynaecology"}
                      onChange={() => {
                        specialitiesOnChange("obstetrics-gynaecology");
                      }}
                    />
                    <label
                      htmlFor="ObstetricsGynaecology"
                      className="mx-4 cursor-pointer"
                    >
                      Obstetrics & Gynaecology
                    </label>
                  </div>
                  <div className="mb-2">
                    <input
                      type="radio"
                      id="Dentistry"
                      name="Speciality"
                      checked={query.speciality === "dentistry"}
                      onChange={() => {
                        specialitiesOnChange("dentistry");
                      }}
                    />
                    <label htmlFor="Dentistry" className="mx-4 cursor-pointer">
                      Dentistry
                    </label>
                  </div>
                  <div className="mb-2">
                    <input
                      type="radio"
                      id="InternalMedicine"
                      name="Speciality"
                      checked={query.speciality === "internal-medicine"}
                      onChange={() => {
                        specialitiesOnChange("internal-medicine");
                      }}
                    />
                    <label
                      htmlFor="InternalMedicine"
                      className="mx-4 cursor-pointer"
                    >
                      Internal Medicine
                    </label>
                  </div>
                  <div className="mb-2">
                    <input
                      type="radio"
                      id="FamilyMedicine"
                      name="Speciality"
                      checked={query.speciality === "family-medicine"}
                      onChange={() => {
                        specialitiesOnChange("family-medicine");
                      }}
                    />
                    <label
                      htmlFor="FamilyMedicine"
                      className="mx-4 cursor-pointer"
                    >
                      Family Medicine
                    </label>
                  </div>
                  <div className="mb-2">
                    <input
                      type="radio"
                      id="Radiology"
                      name="Speciality"
                      checked={query.speciality === "radiology"}
                      onChange={() => {
                        specialitiesOnChange("radiology");
                      }}
                    />
                    <label htmlFor="Radiology" className="mx-4 cursor-pointer">
                      Radiology
                    </label>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion.Root>
          </form>
        </div>
        <div className="lg:col-span-9 col-span-full  my-3 space-y-3">
          {doctorsData.map((dList: any) => (
            <div className="w-full border border-muted shadow rounded-lg p-2 space-y-2 relative py-2">
              <div className="absolute ltr:right-2 rtl:left-2 top-2 rounded-lg bg-[#ffe6e6] text-life text-sm font-bold text-center px-3 leading-tight">
          
                  <Typography bold={"bold"} alignment={"horizontalCenter"} size={"sm"}>XP</Typography>
          
         
                  <Typography bold={"bold"} alignment={"horizontalCenter"} size={"sm"}>{dList.experience.years}</Typography>
        
                <Typography bold={"bold"} alignment={"horizontalCenter"} size={"sm"}>Years</Typography>
              </div>
              <div className="flex justify-between">
                <div className="flex space-x-2">
                  <div className="rounded-md">
                    <Image
                      src={dList.photo}
                      height={100}
                      width={100}
                      alt={dList.name}
                    />
                  </div>
                  <div className="space-y-1">
                    <Typography variant={"lifeText"} bold={"bold"}>{dList.name}</Typography>
                    <Typography variant={"lifeText"} size={"sm"}>{dList.department}</Typography>
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <span className="space-x-1 rtl:space-x-reverse flex items-center">
                        <Icon
                          type="checkIcon"
                          sizes={"sm"}
                          className="text-green-500"
                        />
                        <Typography variant={"primary"} size={"sm"}>
                         {dList.likes.percentage}
                        </Typography>
                      </span>
                      <span className="space-x-1 rtl:space-x-reverse flex items-center">
                        <Icon
                          type="chatIcon"
                          sizes={"sm"}
                       className="text-life"
                        />
                        <Typography variant={"primary"} size={"sm"}>
                         {dList.stories.count}
                        </Typography>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-x-2 rtl:space-x-reverse flex items-center">
                <Typography size={"xs"}>Speak :</Typography>
                <div className="flex space-x-2 rtl:space-x-reverse">
                  {dList.languages.map((langData: any) => (
                    <Button variant={"categoryBtn"} size={"xs"}>
                      {langData.value}
                    </Button>
                  ))}
                </div>
              </div>
              <hr />
              <div>
                {dList.available_clinics.data.map((avClinics: any) => (
          
                    <div className="flex justify-between">
                      <div>
                        <div className="flex space-x-2 rtl:space-x-reverse items-center">
                          <Icon
                            type="homeIconMenu"
              
                            className="text-life w-4 h-4 inline mr-2"
                          />
                          <Typography size={"sm"} variant={"lifeText"}>
                            {avClinics.name}
                          </Typography>
                        </div>
                      </div>
                      <Typography size={"sm"}>({avClinics.distance_text})</Typography>
                    </div>
           
                ))}
                <div className="flex justify-between pt-1">
                  <div>
                    <Typography size={"sm"} className={buttonVariants({variant:"primaryLink", size:"sm"})}>AVAILABILITY STATUS</Typography>
                    <div className="flex space-x-2 rtl:space-x-reverse items-center">
                      <Icon
                        type="listicon"
                        sizes={"sm"}
                        className="text-life w-4 h-4 inline mr-2"
                      />
                      <Typography size={"sm"}>{dList.slot.date_time}</Typography>
                    </div>
                  </div>
                  <Button  className="h-fit">
                    BOOK NOW
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {noOfDoctors >= doctorsData.length ? (
            <div className="py-4">
              <button
                onClick={() => LoadMoreDoctorsData()}
                className="border-slate-300 flex items-center border mx-auto px-3 py-2  rounded-full hover:bg-[#39f] hover:text-white transition-all duration-300"
              >
                <div className="mx-3 text-sm  items-center">Load More</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className={`w-4 h-4  ${animateSpin ? "animate-spin" : " "}`}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }: { query: any }) {
  const DoctorsListData = await getDoctorsListData(10, 0, query);

  return {
    props: {
      DoctorsListData,
      SpecialityQuery: query.speciality ? query.speciality : null,
    },
  };
}
