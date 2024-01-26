import { useAuth } from "@/context/AuthContext";
import API from "@/utils/API";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    API.post("/api/users/login/", { email, password }).then((res) => {
      setLoggedIn(true);
      navigate("/");
    });
  };

  return (
    <form
      className="flex flex-col justify-center items-center h-[400px] space-y-6 w-[350px] mx-auto"
      onSubmit={handleSubmit}
    >
      <h3 className="text-3xl text-indigo-600 font-bold underline">
        Login to your account
      </h3>
      <div className="flex flex-col w-[100%]">
        <label className="text-lg" htmlFor="">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col w-[100%]">
        <label className="text-lg" htmlFor="">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-indigo-600 px-5 py-2 text-white font-bold rounded-md text-xl hover:opacity-50"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
