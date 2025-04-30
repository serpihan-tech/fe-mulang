import { useBreadcrumb } from "@/context/BreadCrumbContext";
import Breadcrumb from "./Breadcrumb";

const BreadcrumbRenderer = () => {
  const { showBreadcrumb } = useBreadcrumb();
  
  if (!showBreadcrumb) return null;
  
  return (
    <Breadcrumb
      separator={<span> / </span>}
      firstClasses="text-pri-main dark:text-[#5D8BF8] font-semibold"
      containerClasses="flex items-center"
      listClasses="hover:underline m-2"
      capitalizeLinks
    />
  );
};

export default BreadcrumbRenderer;