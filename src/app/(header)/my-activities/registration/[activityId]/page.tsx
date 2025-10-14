"use client";

import { SideNavigationMenu } from "@/components/layout/SideNavigationMenu/SideNavigationMenu";
import { ExperienceForm } from "@/components/my-activities/registration/ExperienceForm";
import { useParams } from "next/navigation";

const MyActivitiesRegistrationEditPage = () => {
  const { activityId } = useParams();

  return (
    <main className="pb-[200px] pt-[70px] px-[16px] md:px-[32px]">
      <div className="mx-auto flex max-w-[1200px] w-full gap-x-[24px]">
        <div className="shrink-0 hidden md:block">
          <SideNavigationMenu />
        </div>
        <ExperienceForm mode="edit" id={Number(activityId)} />
      </div>
    </main>
  );
};

export default MyActivitiesRegistrationEditPage;
