"use client";

// context/authContext.tsx
import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
  FC,
} from "react";
import { jwtToAddress } from "@mysten/zklogin";

interface AuthContextProps {
  address: string | null;
}

export const AuthContext = createContext<AuthContextProps>({ address: null });

export const AuthProvider: FC = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);

  const fetchSalt = useCallback(async (jwtToken: string) => {
    try {
      const response = await fetch(`http://localhost:5000?token=${jwtToken}`);
      const result = await response.json();
      return result.salt;
    } catch (error) {
      console.error(error);
    }
    return "";
  }, []);

  const getAddress = useCallback(
    async (idToken: string | null) => {
      if (idToken) {
        const salt = await fetchSalt(idToken);
        const userAddress = jwtToAddress(idToken, salt);
        console.log(userAddress);
        setAddress(userAddress);
      }
    },
    [fetchSalt]
  );

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.slice(1));
    const idToken = params.get("id_token");
    getAddress(idToken);
  }, [fetchSalt, getAddress]);

  console.log({ address });

  return (
    <AuthContext.Provider value={{ address }}>{children}</AuthContext.Provider>
  );
};
