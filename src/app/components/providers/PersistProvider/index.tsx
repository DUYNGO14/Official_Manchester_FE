// components/PersistProvider.tsx
'use client';

import { persistor } from "@/app/stores";
import { PersistGate } from "redux-persist/integration/react";

interface PersistProviderProps {
  children: React.ReactNode;
}

export default function PersistProvider({ children }: PersistProviderProps) {
  return (
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  );
}