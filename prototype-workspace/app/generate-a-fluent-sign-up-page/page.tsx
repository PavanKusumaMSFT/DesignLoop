"use client";

import ProjectLayout from "../../components/shared/project-layout";
import SignUpPage from "../../components/projects/generate-a-fluent-sign-up-page";

export default function GenerateAFluentSignUpPageRoute() {
  return (
    <ProjectLayout
      id="generate-a-fluent-sign-up-page"
      fullWidth
      hideProjectHeader
    >
      <SignUpPage />
    </ProjectLayout>
  );
}
