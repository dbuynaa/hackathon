import React from "react";
import { AdminLayoutContainer } from "@/layouts/adminLayout/AdminLayoutContainer";
import { IoArrowBackOutline } from "react-icons/io5";
import { Vendor, VendorDocument, VendorQuery } from "@/graphql/generated";
import { getClient } from "@/lib/apollo/ApolloClientRSC";
import { CompanyDetail } from "./components";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function AdminVendorUpdatePage({ params }: Props) {
  const { data } = await getClient().query<VendorQuery>({
    query: VendorDocument,
    variables: { where: { id: params.id } },
  });
  return (
    <AdminLayoutContainer title="プロフィール" icon={<IoArrowBackOutline />}>
      <div className="grid grid-cols-12 gap-lg">
        <CompanyDetail data={data.vendor as Vendor} />
        <div className="col-span-12 lg:col-span-8 gap-lg">
          {/* <CompanyPostContainer companyId={data.company?.id || ""} /> */}
        </div>
      </div>
    </AdminLayoutContainer>
  );
}
