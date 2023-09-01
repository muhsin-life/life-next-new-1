import { cn } from "@/lib/utils";
import Link from "next/link";
import { typographyVariants } from "./ui/typography";
import { buttonVariants } from "./ui/button";
import { Icon } from "./ui/icons";

const BreadCrumb = ({ menuData, type }: { menuData: any; type: string }) => {
  function generatedUrl(indx: number) {
    let generatedUrl = "/";
    menuData.slice(0, indx + 1).map((itemName: string) => {
      generatedUrl += slugify(itemName) + "/";
    });
    if (type === "category" || type === "category-menu") {
      return `/${type}${generatedUrl}`;
    } else {
      return `${generatedUrl}`;
    }
  }

  function slugify(text: string) {
    return text.toLowerCase().replace(/[\/\s&]+/g, "-");
  }
  const IsLastItem = (indx: number) => menuData.length - 1 !== indx;

  return (
    <nav
      className=" px-2 sm:py-3 py-1 text-gray-700 sm:flex hidden  border-muted border-b"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 ">
        <li className="inline-flex items-center">
          <Link
            href={`/`}
            className={cn(
              `ml-1 capitalize`,
              buttonVariants({ variant: "footerLink", size: "sm" })
            )}
          >
            Home
          </Link>
        </li>
        {menuData.map((item: any, indx: number) => (
          <li>
            <div className="flex items-center">
              <Icon type="chevronRightIcon" sizes={"sm"} />
              <Link
                href={`${IsLastItem(indx) ? generatedUrl(indx):"#"}`}
                className={cn(
                  `ml-1 capitalize`,
                  IsLastItem(indx) 
                    ? buttonVariants({ variant: "footerLink", size: "sm" })
                    : "text-sm"
                )}
              >
                {item}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
