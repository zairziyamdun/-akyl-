import { Suspense } from "react";

import { AuthRedirectIfLoggedIn } from "@/components/auth/AuthRedirectIfLoggedIn";
import { LoginForm } from "@/components/auth/AuthForms";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <AuthRedirectIfLoggedIn />
      <LoginForm />
    </Suspense>
  );
}
