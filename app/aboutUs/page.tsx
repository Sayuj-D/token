import React from "react";
import { useAuthCheck } from "@/utils/authCheck";

const About = () => {
  useAuthCheck();
  return (
    <>
      <p>This is a about page.</p>
    </>
  );
};

export default About;
