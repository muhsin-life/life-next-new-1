import { Skeleton } from "./ui/skeleton";

interface skeletonProps {
  noOfSuggestions: number;
}

const SugesstionsSkeleton: React.FC<skeletonProps> = ({ noOfSuggestions }) => {
  return (
    <>
      {Array(noOfSuggestions).fill(
        <Skeleton className="w-24 p-4 rounded-full mr-2 mb-2" />
      )}
    </>
  );
};

const ProductsSkeleton: React.FC<skeletonProps> = ({ noOfSuggestions }) => {
  return (
    <>
      {Array(noOfSuggestions).fill(
        <div className="flex space-x-2 rtl:space-x-reverse">
          <Skeleton className="w-11 p-6 rounded-lg " />
          <div className="w-full flex flex-col space-y-3">
            <Skeleton className="w-full p-2 rounded-lg " />
            <Skeleton className="w-1/3 p-3 rounded-lg " />
          </div>
        </div>
      )}
    </>
  );
};

const BrandsSkeleton: React.FC<skeletonProps> = ({ noOfSuggestions }) => {
  return (
    <div className="flex justify-between w-full col-span-full">
      {Array(noOfSuggestions).fill(
        <Skeleton className="w-14 p-10 rounded-lg " />
      )}
    </div>
  );
};


export {
  SugesstionsSkeleton,
  ProductsSkeleton,
  BrandsSkeleton
};
