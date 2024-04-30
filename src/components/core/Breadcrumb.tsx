"use client";

import { styled } from "styled-components";
import { Breadcrumb as AntBreadcrumb, BreadcrumbProps } from "antd";
import { Typography } from "@/components";
import { IoHomeOutline } from "react-icons/io5";

type Props = BreadcrumbProps & {
  title: string | string[];
  separator?: "slash" | "dot" | "arrow";
  item?: { title: string; link: string } | undefined;
  isHome?: boolean;
};

const StyledBreadcrumb = styled(AntBreadcrumb)`
  display: flex !important;
`;

export function Breadcrumb({
  children,
  className,
  title,
  separator,
  item,
  isHome = true,
  ...props
}: Props) {
  const Separator = () => {
    let _sep = "/";
    if (separator === "slash") _sep = "/";

    if (separator === "dot") _sep = "・";
    if (separator === "arrow") _sep = ">";

    return (
      <Typography className=" text-neutral-300" base="Caption">
        {_sep}
      </Typography>
    );
  };

  return (
    <StyledBreadcrumb
      {...props}
      className={className}
      separator={<Separator />}
      items={[
        {
          ...(isHome && {
            title: (
              <div className="flex flex-row gap-xxs px-tiny py-none items-center">
                <IoHomeOutline className="text-secondary" size="16px" />
                <Typography base="Body" className="text-secondary mt-micro">
                  home
                </Typography>
              </div>
            ),
            href: "/",
          }),
        },
        { ...(item && { title: item.title, href: item.link }) },
        {
          title: (
            <Typography
              base="Body"
              weight="bold"
              className="text-primary mt-micro"
            >
              {title}
            </Typography>
          ),
        },
      ]}
    >
      {children}
    </StyledBreadcrumb>
  );
}
