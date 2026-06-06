"use client";

import { createContext, useContext, type ReactNode } from "react";

import { mockAuth, type AkylRole } from "./mockAuth";

type MockAuthContextValue = {
  isAuthenticated: boolean;
  role: AkylRole;
  user: typeof mockAuth.user;
};

const MockAuthContext = createContext<MockAuthContextValue>({
  isAuthenticated: mockAuth.isAuthenticated,
  role: mockAuth.role,
  user: mockAuth.user,
});

export function MockAuthProvider({ children }: { children: ReactNode }) {
  return (
    <MockAuthContext.Provider
      value={{
        isAuthenticated: mockAuth.isAuthenticated,
        role: mockAuth.role,
        user: mockAuth.user,
      }}
    >
      {children}
    </MockAuthContext.Provider>
  );
}

export function useMockAuth() {
  return useContext(MockAuthContext);
}
