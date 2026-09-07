import { Navigate, Outlet, Route, Routes } from "react-router";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Transactions from "./pages/Transactions";
import Settings from "./pages/Settings";
import useStore from "./store";
import { setAuthToken } from "./libs/apiCall";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";

const RootLayout = () => {
  const { user } = useStore((state) => state);
  setAuthToken(user?.token ?? "");

  return !user ? (
    <Navigate to="/sign-in" replace={true} />
  ) : (
    <>
      <Navbar />
      <div className="min-h-[cal(h-screen - 100px)]">
        <Outlet />
      </div>
    </>
  );
};

const App = () => {
  return (
    <main>
      <div className="w-full min-h-screen px-6 bg-gray-100 md:px-20 dark:bg-slate-500">
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Navigate to="/overview" replace />} />
            <Route path="/overview" element={<Dashboard />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </div>
      <Toaster richColors position="top-center" />
    </main>
  );
};

export default App;
