import {
  AiFillHome,
  AiFillStar,
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineStar,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";
import Username from "../features/user/Username";
import LogoutButton from "./LogoutButton";

const Link = [
  {
    name: "Home",
    to: "/home",
    iconUnselected: <AiOutlineHome />,
    iconSelected: <AiFillHome />,
  },
  {
    name: "Leaderboard",
    to: "/leaderboard",
    iconUnselected: <AiOutlineStar />,
    iconSelected: <AiFillStar />,
  },
  {
    name: "Login",
    to: "/login",
    iconUnselected: <AiOutlineLogin />,
    iconSelected: <AiOutlineLogin />,
  },
];

function SideNav() {
  const { isAuthorized } = useSelector((state) => state.auth);

  return (
    <div
      className="max-h-[30rem] border-r border-r-gray-600 p-2"
      data-testid="sidenav"
    >
      <Username />
      <nav>
        <ul className="space-y-1">
          {Link.map((link, i) => (
            <li key={i}>
              {link.name === "Login" ? (
                isAuthorized ? (
                  <LogoutButton />
                ) : (
                  <NavLink
                    to={link.to}
                    className="flex items-center justify-start gap-1 rounded-md px-1 py-3 text-2xl"
                  >
                    {link.iconUnselected}
                    <span className="text-base">{link.name}</span>
                  </NavLink>
                )
              ) : (
                <NavLink
                  to={link.to}
                  className="flex items-center justify-start gap-1 rounded-md px-1 py-3 text-2xl"
                >
                  {link.iconUnselected}
                  <span className="text-base">{link.name}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default SideNav;
