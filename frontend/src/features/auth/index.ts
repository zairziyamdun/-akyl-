export {
  AuthApiError,
  AuthProvider,
  getRoleDashboardPath,
  useAuth,
  useMockAuth,
} from "./api/AuthProvider";
export {
  getNavForRole,
  getShellBasePath,
  getShellTitle,
  type NavItem,
  type NavSection,
} from "./lib/dashboardNav";
export {
  AuthLayoutShell,
  ForgotPasswordForm,
  LoginForm,
  RegisterForm,
} from "./ui/AuthForms";
export { AuthRedirectIfLoggedIn } from "./ui/AuthRedirectIfLoggedIn";
