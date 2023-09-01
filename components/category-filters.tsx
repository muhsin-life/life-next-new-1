import * as Accordion from "@radix-ui/react-accordion";
import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "./accordion-radix";

import { BrandsButton } from "./Button";
import { useEffect, useState } from "react";
import getCategoryData from "@/lib/getCategoryData";
import { Icon } from "./ui/icons";
import { Checkbox } from "./ui/checkbox";
import { Typography } from "./ui/typography";
import { useRouter } from "next/router";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { useLanguage } from "@/hooks/useLanguage";
const FiltersSection = ({
  brandsData,
  selectedBrands,
  filterSet,
  filterPath,
}: {
  brandsData: any;
  selectedBrands: any;
  filterSet: any;
  filterPath: string;
}) => {
  const [catData, setCatData] = useState({
    data: [{}],
  });
  useEffect(() => {
    getCategoryData().then((cat_data) => {
      setCatData(cat_data);
    });
  }, []);

  const { currentCountryDetails } = useLanguage();

  const rangeSliderValueChange = (newValue: number[]) => {
    setRangeSliderValue([newValue[0], newValue[1]]);
  };
  function slugify(text: any) {
    if (text) {
      return text.toLowerCase().replace(/[\/\s&]+/g, "-");
    } else {
      return "";
    }
  }
  const router = useRouter();
  function generatePath(slug: string) {
    router.push(`/products?categories=${slug}`);
  }

  const [rangeSliderValue, setRangeSliderValue] = useState([0, 9999]);
  const [checkedCat, setCheckedCat] = useState<any>({
    item: null,
    checkedState: false,
  });

  return (
    <div className="hidden lg:block  top-40">
      {catData.data[1] ? (
        <>
          <Accordion.Root
            className=""
            type="single"
            defaultValue="item-1"
            collapsible
          >
            <AccordionItem className="border-y py-2" value="item-1">
              <AccordionTrigger className="py-3 flex justify-between">
                Category
                <Icon
                  type="chevronBottomIcon"
                  className="mx-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
                />
              </AccordionTrigger>

              {catData.data.map((item: any) => (
                <AccordionContent className="">
                  <Accordion.Root className="" type="single" collapsible>
                    <AccordionItem className="" value="item-1">
                      <div
                        className={`rounded-lg flex justify-between py-1 items-center ${
                          checkedCat && checkedCat.item != null
                            ? checkedCat.item === item.name
                              ? ""
                              : ""
                            : ""
                        }`}
                      >
                        <button
                          className="flex space-x-3"
                          onClick={() => {
                            generatePath(slugify(item.name));

                            setCheckedCat((prevState: any) =>
                              prevState && prevState.item === item.name
                                ? null
                                : {
                                    item: item.name,
                                    checkedState: true,
                                  }
                            );
                          }}
                        >
                          <Checkbox
                            id="terms"
                            checked={
                              checkedCat
                                ? checkedCat.item === item.name
                                  ? checkedCat.checkedState
                                  : false
                                : false
                            }
                          />
                          <Typography size={"sm"}>{item.name}</Typography>
                        </button>

                        <AccordionTrigger className="">
                          <Icon
                            type="chevronBottomIcon"
                            sizes={"sm"}
                            className="mx-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
                          />
                        </AccordionTrigger>
                      </div>

                      {item.children.map((child: any) => (
                        <AccordionContent className="">
                          <Accordion.Root
                            className=""
                            type="single"
                            collapsible
                          >
                            <AccordionItem className="" value="item-1">
                              <div
                                className={` rounded-lg flex justify-between p-1 ml-4 items-center ${
                                  checkedCat && checkedCat.item != null
                                    ? checkedCat.item === item.name ||
                                      checkedCat.item.includes(child.name)
                                      ? ""
                                      : ""
                                    : ""
                                }`}
                              >
                                <button
                                  className="flex space-x-3"
                                  onClick={() => {
                                    generatePath(child.slug);

                                    setCheckedCat((prevState: any) =>
                                      prevState && prevState.item === item.name
                                        ? {
                                            item: child.name,
                                            checkedState: true,
                                          }
                                        : prevState &&
                                          prevState.item === child.name
                                        ? null
                                        : {
                                            item: child.name,
                                            checkedState: true,
                                          }
                                    );
                                  }}
                                >
                                  <Checkbox
                                    id="terms"
                                    checked={
                                      checkedCat
                                        ? checkedCat.item === child.name
                                          ? checkedCat.checkedState
                                          : checkedCat.item === item.name
                                          ? checkedCat.checkedState
                                          : false
                                        : false
                                    }
                                  />
                                  <Typography size={"sm"}>
                                    {child.name}
                                  </Typography>
                                </button>
                                <AccordionTrigger className="">
                                  <Icon
                                    type="chevronBottomIcon"
                                    sizes={"sm"}
                                    className="mx-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
                                  />
                                </AccordionTrigger>
                              </div>

                              {child.sections.map((sec_data: any) => (
                                <AccordionContent className="ml-7">
                                  <div
                                    className={` rounded-lg flex space-x-4 p-1 ml-4 items-center ${
                                      checkedCat && checkedCat.item != null
                                        ? checkedCat.item === item.name ||
                                          checkedCat.item.includes(
                                            child.name
                                          ) ||
                                          checkedCat.item.includes(
                                            sec_data.name
                                          )
                                          ? ""
                                          : ""
                                        : ""
                                    }`}
                                  >
                                    <button className="flex space-x-3">
                                      <Checkbox
                                        id="terms"
                                        checked={
                                          checkedCat
                                            ? checkedCat.item === sec_data.name
                                              ? checkedCat.checkedState
                                              : checkedCat.item === child.name
                                              ? checkedCat.checkedState
                                              : checkedCat.item === item.name
                                              ? checkedCat.checkedState
                                              : false
                                            : false
                                        }
                                        onClick={() => {
                                          generatePath(slugify(sec_data.name));

                                          setCheckedCat((prevState: any) =>
                                            prevState &&
                                            prevState.item === item.name
                                              ? {
                                                  item: sec_data.name,
                                                  checkedState: true,
                                                }
                                              : prevState &&
                                                prevState.item === child.name
                                              ? {
                                                  item: sec_data.name,
                                                  checkedState: true,
                                                }
                                              : prevState &&
                                                prevState.item === sec_data.name
                                              ? null
                                              : {
                                                  item: sec_data.name,
                                                  checkedState: true,
                                                }
                                          );
                                        }}
                                      />
                                      <Typography lineClamp={"one"} size={"sm"}>
                                        {" "}
                                        {sec_data.name}
                                      </Typography>
                                    </button>
                                  </div>
                                </AccordionContent>
                              ))}
                            </AccordionItem>
                          </Accordion.Root>
                        </AccordionContent>
                      ))}
                    </AccordionItem>
                  </Accordion.Root>
                </AccordionContent>
              ))}
            </AccordionItem>
          </Accordion.Root>
          {brandsData ? (
            <Accordion.Root
              className=""
              type="single"
              defaultValue="item-1"
              collapsible
            >
              <AccordionItem className="border-b py-2" value="item-1">
                <AccordionTrigger className="py-3 flex justify-between">
                  Brands
                  <Icon
                    type="chevronBottomIcon"
                    className="mx-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
                  />
                </AccordionTrigger>
                <AccordionContent>
                  <div className="h-[10rem] overflow-y-auto ">
                    {brandsData.map((brand: any) =>
                      brand.featured === true ? (
                        <BrandsButton
                          selectedBrands={selectedBrands}
                          brandName={brand.name}
                          filterSet={filterSet}
                        />
                      ) : null
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion.Root>
          ) : null}
        </>
      ) : null}

      <Accordion.Root
        className=""
        type="single"
        defaultValue="item-1"
        collapsible
      >
        <AccordionItem className="border-b py-2" value="item-1">
          <AccordionTrigger className="py-2 flex justify-between">
            Price
            <Icon
              type="chevronBottomIcon"
              className="mx-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
            />
          </AccordionTrigger>

          <AccordionContent>
            <Slider
              onValueChange={rangeSliderValueChange}
              value={[rangeSliderValue[0], rangeSliderValue[1]]}
              max={9999}
              step={100}
              className={cn("w-full py-4 mb-2")}
            />
            <div className="flex justify-between mb-1">
              <div>Min Price</div>
              <div>Max Price</div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <Input
                  className="!rounded-none  font-semibold"
                  onChange={(e) =>
                    rangeSliderValueChange([
                      Number(e.target.value.replace(`${currentCountryDetails.currency}`, "")),
                      rangeSliderValue[1],
                    ])
                  }
                  sizes={"sm"}
                  value={`${currentCountryDetails.currency} ${rangeSliderValue[0]}`}
                />
              </div>
              <Icon type="minusIcon" className="mx-4" />
              <div>
                <Input
                  className="!rounded-none  font-semibold"
                  onChange={(e) =>
                    rangeSliderValueChange([
                      rangeSliderValue[0],
                      Number(e.target.value.replace(`${currentCountryDetails.currency}`, "")),
                    ])
                  }
                  sizes={"sm"}
                  value={`${currentCountryDetails.currency} ${rangeSliderValue[1]}`}
                />
              </div>
            </div>
            <Button
              onClick={() => {
                filterSet("min_price", rangeSliderValue[0].toFixed(2));
              }}
              rounded={"none"}
              className="w-full !text-sm mt-3"
            >
              FILTER
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion.Root>
    </div>
  );
};

export { FiltersSection };
