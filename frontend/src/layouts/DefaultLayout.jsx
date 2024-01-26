import { useAuth } from "@/context/AuthContext";
import API from "@/utils/API";
import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

const DefaultLayout = () => {
  const { loggedIn, setLoggedIn } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      await API.get("/api/users/user")
        .then((res) => {
          setLoggedIn(true);
        })
        .catch((err) => {
          setLoggedIn(false);
        });
    };
    fetchUser();
  }, [setLoggedIn]);

  const submitLogout = async () => {
    API.post("/api/users/logout/").then((res) => {
      setLoggedIn(false);
    });
  };

  return (
    <div>
      <header className="bg-indigo-400 text-white font-bold flex h-16 items-center justify-between px-5">
        <div className="left">
          <h1 className="text-2xl hover:opacity-50">
            <Link to="/">Django React Session Auth</Link>
          </h1>
        </div>
        <div className="right">
          {loggedIn && (
            <ul className="flex space-x-4">
              <li>Logged In</li>
              <li
                onClick={submitLogout}
                className="cursor-pointer hover:opacity-50"
              >
                Logout
              </li>
            </ul>
          )}
          {!loggedIn && (
            <div className="flex space-x-4">
              <Link className="hover:opacity-50" to="/login">
                Login
              </Link>
              <Link className="hover:opacity-50" to="/register">
                Register
              </Link>
            </div>
          )}
        </div>
      </header>
      <div className="h-[calc(100vh-4rem)]">
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
