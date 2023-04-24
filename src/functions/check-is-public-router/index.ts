import { APP_ROUTES } from "@/constants/app-routes"

/**
 * 
 * @param asPath string
 * @returns boolean
 */

export const checkIsPublicRouter = (asPath: string)=>{
  const appPublicRouter = Object.values(APP_ROUTES.public);

  return appPublicRouter.includes(asPath);
}