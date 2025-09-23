
import { Metadata } from "next";
export const metadata : Metadata = {
  title: "Players Page",
  description: "This is the home page layout",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
}
