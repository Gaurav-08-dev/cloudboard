import { useState } from "react";
import { api } from "../api/client";
import { useAuthStore } from "../store/authStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const handleLogin = async () => {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    setAccessToken(res.data.accessToken);
  };

  return (
    <div>
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />

      <input
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
