import { APP_ROUTES } from "@/constants/app-routes";
import { checkUserAuthenticated } from "@/functions/check-user-authenticated";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type PrivateRouterProps = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouterProps) => {
  const { push } = useRouter();

  const isUserAuthenticated = checkUserAuthenticated();
  
  useEffect(() => {
    console.log(isUserAuthenticated)
    if (!isUserAuthenticated) {
      localStorage.clear();
      push(APP_ROUTES.public.Login);
    }
  }, []);

  return (
    <>
      {!isUserAuthenticated && null}
      {isUserAuthenticated && children}
    </>
  );
};

export default PrivateRoute;
