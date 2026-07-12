import { Suspense } from "react";

import { AuthRedirectIfLoggedIn } from "@/features/auth";
import { LoginForm } from "@/features/auth";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <AuthRedirectIfLoggedIn />
      <LoginForm />
    </Suspense>
  );
}
