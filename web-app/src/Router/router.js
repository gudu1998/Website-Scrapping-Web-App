import React from "react";
import { useRoutes } from "react-router-dom";
import { CompanyHomeComponent } from "../View/Company-Home/companyHome";
import { CompanyDetailsComponent } from "../View/Company-Details/companyDetails";

export const RoutesConfig = () => {
  return useRoutes([
    { path: "/", element: <CompanyHomeComponent /> },
    { path: "details/:id", element: <CompanyDetailsComponent /> },
  ]);
};
