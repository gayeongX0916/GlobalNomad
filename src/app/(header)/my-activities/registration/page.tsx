import { ExperienceForm } from "@/components/ExperienceForm";
import { SideNavigationMenu } from "@/components/layout/SideNavigationMenu";

const MyActivitiesRegistration = () => {
  return (
    <main className="pb-[200px] pt-[70px] flex justify-center gap-x-[24px] w-full px-[16px] md:px-[32px] lg:px-0">
      <div className="shrink-0 hidden md:block">
        <SideNavigationMenu />
      </div>
      <ExperienceForm />
    </main>
  );
};

export default MyActivitiesRegistration;
