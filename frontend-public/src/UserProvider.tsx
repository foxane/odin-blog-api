import axios, { AxiosError } from 'axios';
import { createContext, useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) {
  throw new Error('API URL is not configured');
}

const api = axios.create({
  baseURL: API_URL,
});

class ApiError extends Error {
  errorDetails?: string[] | null;
  constructor(msg: string, detailsArr?: string[] | null) {
    super(msg);
    this.errorDetails = detailsArr;
  }
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: false,
  error: null,
  login: async () => {},
  logout: () => {},
  register: async () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setLoading(true);
        try {
          const response = await api.get<User>('/users/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (err) {
          console.error(err);
          setError(new ApiError('Failed to fetch user details', null));
        } finally {
          setLoading(false);
        }
      }
    };

    void fetchUser();
  }, []);

  const login = async (credentials: Login) => {
    setLoading(true);
    try {
      const { data }: { data: LoginResponse } = await api.post(
        '/auth/login',
        credentials,
      );
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setError(null);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials: Register) => {
    setLoading(true);
    try {
      const { data }: { data: LoginResponse } = await api.post(
        '/auth/register',
        credentials,
      );
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setError(null);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setError(null);
  };

  const handleError = (err: unknown) => {
    if (err instanceof AxiosError) {
      const { message, errorDetails } = err.response?.data as ApiError;
      setError(new ApiError(message, errorDetails || null));
    } else {
      setError(new ApiError('Internal server error', null));
    }
  };

  return (
    <UserContext.Provider
      value={{ user, loading, error, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

export type User = {
  id: string;
  name: string;
  email: string;
  authValue: number;
};

interface Login {
  email: string;
  password: string;
}

interface Register extends Login {
  name: string;
}

type UserContextType = {
  user: User | null;
  loading: boolean;
  error: ApiError | null;
  login: (credentials: Login) => Promise<void>;
  logout: () => void;
  register: (credentials: Register) => Promise<void>;
};

type LoginResponse = {
  token: string;
  user: User;
};
