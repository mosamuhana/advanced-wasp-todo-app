import { Link } from 'react-router-dom';

import logout from '@wasp/auth/logout';
import useAuth from '@wasp/auth/useAuth';
import getDate from '@wasp/queries/getDate';
import { useQuery } from '@wasp/queries';
import { ConnectionState } from './components/ConnectionState';

import './Main.scss';

export function App({ children }: any) {
  const { data: user } = useAuth();
  const { data: date } = useQuery(getDate);

  return (
    <div className="flex flex-col min-h-screen">
      <header
        className="
          flex justify-between items-center bg-gray-300 p-2 border-b border-b-gray-400
          shadow-md
        "
      >
        <h1 className="font-bold text-lg">
          <Link to="/">Todo App</Link>
        </h1>

        <h3>Your site was loaded at: {date?.toLocaleString()} <ConnectionState /></h3>

        {!!user && (
          <div className="flex gap-3 items-center">
            <div>
              Hello, <Link to="/profile">{user.email}</Link>
            </div>
            <div>
              <button className="btn btn-primary" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="p-2 flex-1">{children}</main>

      <footer className="mt-8 text-center">Created with Wasp</footer>
    </div>
  );
}
