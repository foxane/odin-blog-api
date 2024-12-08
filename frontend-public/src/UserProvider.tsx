import { createContext, useEffect, useState } from 'react';

const UserContext = createContext<UserContextType>({
  user: null,
  loading: false,
  error: '',
  login: () => {},
  logout: () => {},
  register: () => {},
});

const UserProvider = ({
  children,
}: {
  children: React.JSX.Element | React.JSX.Element[];
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoading(true);
      fetch(import.meta.env.VITE_API_URL + '/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then((data: User) => {
          setUser(data);
        })
        .catch((err: unknown) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const login = (credentials: Login) => {
    fetch(import.meta.env.VITE_API_URL + '/auth/login', {
      body: JSON.stringify(credentials),
    })
      .then(res => {
        console.log(res);
      })
      .catch((err: unknown) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const register = (credentials: Register) => {
    fetch(import.meta.env.VITE_API_URL + '/auth/login', {
      body: JSON.stringify(credentials),
    })
      .then(res => {
        console.log(res);
      })
      .catch((err: unknown) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setError('');
    setUser(null);
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
  error: string;
  login: (credentials: Login) => void;
  logout: () => void;
  register: (credentials: Register) => void;
};
