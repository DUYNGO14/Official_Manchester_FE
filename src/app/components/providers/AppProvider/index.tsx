import MuiThemeProviders from "@/app/components/providers/MuiProvider";
import PersistProvider from "@/app/components/providers/PersistProvider";
import ReduxProviders from "@/app/components/providers/ReducerProvider";
import Notification from "@/app/components/containers/Notification";

export default function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProviders>
      <PersistProvider>
        <MuiThemeProviders>
          <Notification />
          {children}
        </MuiThemeProviders>
      </PersistProvider>
    </ReduxProviders>
  );
}
