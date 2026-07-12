export {
  LoginForm,
  RegisterForm,
  ForgotPasswordForm,
  AuthLayoutShell,
} from "./ui/AuthForms";
export { AuthRedirectIfLoggedIn } from "./ui/AuthRedirectIfLoggedIn";
export {
  AuthProvider,
  useAuth,
  useMockAuth,
  AuthApiError,
  getRoleDashboardPath,
} from "./api/AuthProvider";
export {
  getNavForRole,
  getShellTitle,
  getShellBasePath,
  type NavItem,
  type NavSection,
} from "./lib/dashboardNav";
