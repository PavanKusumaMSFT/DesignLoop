"use client";

import ProjectLayout from "../../components/shared/project-layout";
import AzureHomePage from "../../components/projects/azure-home-page";

export default function AzureHomePagePage() {
  return (
    <ProjectLayout id="azure-home-page" fullWidth hideProjectHeader>
      <AzureHomePage />
    </ProjectLayout>
  );
}
