import { useRouter } from "next/router";
import { Typography } from "./ui/typography";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdownMenu";
import { Button } from "./ui/button";
import { Icon } from "./ui/icons";
import { useEffect, useState } from "react";
import { useModal } from "./ui/modalcontext";

const ProductFilters = ({
  productsLength,
  noOfProductsCurrently,
  filterSet,
}: {
  productsLength: any;
  noOfProductsCurrently: any;
  filterSet: any;
}) => {
  const filters = [
    { name: "popularity", text: "Most Popular" },
    { name: "most-rated", text: "Most Rated" },
    { name: "price-asc", text: "Price: Low to High" },
    { name: "price-desc", text: "Price: High to Low" },
  ];

  const userPreferences = [
    { title: "Grid View", value: "grid", IconType: "gridIcon" },
    { title: "Row View", value: "row", IconType: "listicon" },
  ];

  const [selectedFilter, setFilter] = useState(filters[0]);

  const { setUsersPreference, selectedUserPrefernece } = useModal();

  const changeUserPreference = (pref: any) => {
    localStorage.setItem("user-preference-view-type", pref.value);
    setUsersPreference(pref);
  };

  const { pathname } = useRouter();

  useEffect(() => {
    if (localStorage.getItem("user-preference-view-type") === "row") {
      setUsersPreference(userPreferences[1]);
    } else {
      setUsersPreference(userPreferences[0]);
    }
  }, []);

  return !pathname.includes("search") ? (
    <div className="flex justify-between py-3">
      <div className="h-fit my-auto">
        <Typography size={"sm"}>
          Showing <span className="text-black">{noOfProductsCurrently}</span> of{" "}
          <span className="text-black ">{productsLength}</span> Products
        </Typography>
      </div>
      <div className=" items-center md:flex hidden">
        <div className="relative inline-block text-left group/sort-menu">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"normal"} size={"sm"}>
                <span className="mx-2"> {selectedFilter.text}</span>
                <Icon type="chevronBottomIcon" sizes={"sm"} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" forceMount>
              {filters.map((filter: any, indx: number) => (
                <DropdownMenuItem
                  onClick={() => {
                    filterSet( "order_by", filters[indx].name);
                    setFilter(filter)
                  }}
                >
                  <span>{filter.text}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mx-5">
          {selectedUserPrefernece && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"normal"} size={"sm"}>
                  <Icon
                    type={selectedUserPrefernece.IconType}
                    className="text-slate-400"
                    sizes={"sm"}
                  />
                  <span className="mx-2">{selectedUserPrefernece.title}</span>
                  <Icon type="chevronBottomIcon" sizes={"sm"} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" forceMount>
                {userPreferences.map((pref: any, indx: number) => (
                  <DropdownMenuItem onClick={() => changeUserPreference(pref)}>
                    <Icon
                      type={pref.IconType}
                      className="text-slate-400"
                      sizes={"sm"}
                    />
                    <span className="mx-2">{pref.title}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export { ProductFilters };
