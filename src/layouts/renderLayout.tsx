"use client";

import { AdminLayout, LandingLayout } from "@/layouts";
// import { Category, useCategoriesQuery } from '@/graphql/generated';
import { usePathname } from "next/navigation";

export const RenderLayout = ({ children }: { children: React.ReactNode }) => {
  // const { data: category, loading } = useCategoriesQuery();
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return <AdminLayout>{children}</AdminLayout>;
  }
  // return !loading ? (
  //   <LandingLayout categories={category?.categories as Category[]}>
  //     {children}
  //   </LandingLayout>
  // ) : null;
};
