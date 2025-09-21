"use client";

import { getUserAction } from "@/app/stores/reduces/user";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function UserProfile() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  useEffect(() => {
    if (!pathname.startsWith("/auth")) {
      dispatch(getUserAction());
    }
  }, [pathname, dispatch]);
  return null;
}
