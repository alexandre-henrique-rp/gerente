import { useSession } from "next-auth/react";


export const checkUserAuthenticated = () => {
  const { data: session, status } = useSession();
  return !!session && status
};