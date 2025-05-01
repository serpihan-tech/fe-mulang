"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Breadcrumb = ({
  separator,
  containerClasses,
  listClasses,
  firstClasses,
  activeClasses,
  capitalizeLinks,
}) => {
  const paths = usePathname() || "";
  const pathNames = paths.split("/").filter((path) => path);
  return (
    <div className="text-sm text-black dark:text-slate-100 bg-[#FAFAFA] dark:bg-dark_net-pri transition duration-300 md:mb-5 lg:mb-10">
      <ul className={containerClasses}>
        {pathNames.map((link, index) => {
          let href = `/${pathNames.slice(0, index + 1).join("/")}`;
          let itemClasses =
            paths === href ? `${listClasses} ${activeClasses}` : listClasses;
          if (index === 0) {
            itemClasses = `${itemClasses} ${firstClasses}`;
          }
          let formattedLink = link.replace(/-/g, " ");
          let itemLink = capitalizeLinks
            ? formattedLink.charAt(0).toUpperCase() + formattedLink.slice(1)
            : formattedLink;

          return (
            <React.Fragment key={index}>
              <li className={itemClasses}>
                {index === 0 ? (
                  <span>{itemLink}</span>
                ) : (
                  <Link href={href}>{itemLink}</Link>
                )}
              </li>
              {pathNames.length !== index + 1 && separator}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

// PropTypes untuk validasi props
import PropTypes from "prop-types";

Breadcrumb.propTypes = {
  separator: PropTypes.node,
  containerClasses: PropTypes.string,
  listClasses: PropTypes.string,
  firstClasses: PropTypes.string,
  activeClasses: PropTypes.string,
  capitalizeLinks: PropTypes.bool,
};

Breadcrumb.defaultProps = {
  separator: "/",
  containerClasses: "",
  listClasses: "",
  firstClasses: "",
  activeClasses: "",
  capitalizeLinks: false,
};

export default Breadcrumb;
