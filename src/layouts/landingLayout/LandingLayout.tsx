import { LandingHeader } from "@/layouts/landingLayout/header/Header";
import { LandingFooter } from "@/layouts/landingLayout/footer/Footer";
import { Category } from "@/graphql/generated";

export const LandingLayout = ({
  children,
  categories,
}: {
  children: React.ReactNode;
  categories: Category[];
}) => {
  return (
    <div className="w-full">
      <LandingHeader categories={categories} />
      {children}
      <LandingFooter />
    </div>
  );
};
