import Notification from "@/app/components/containers/Notification";
import MuiThemeProviders from "@/app/components/providers/MuiProvider";
import ReduxProviders from "@/app/components/providers/ReducerProvider";

export default function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProviders>
        <MuiThemeProviders>
          <Notification />
          {children}
        </MuiThemeProviders>
    </ReduxProviders>
  );
}
