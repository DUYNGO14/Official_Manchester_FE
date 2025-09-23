
import { Metadata } from "next";
export const metadata : Metadata = {
  title: "Profile Page",
  description: "This is the profile page",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
}
