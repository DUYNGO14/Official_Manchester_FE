"use client";

import { store } from "@/app/stores";
import { Provider } from "react-redux";
export default function ReduxProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Provider store={store}>{children}</Provider>;
}