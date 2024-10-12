
import { RedirectToHome } from "./RedirectToHome"


export default async function Homepage() {
  //FIXME for somereason, it was not possible to do redirect in server component (auth info missing if done there)
  return (<RedirectToHome />)
}
