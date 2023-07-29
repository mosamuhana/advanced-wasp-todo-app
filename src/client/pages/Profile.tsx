import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { User } from '@wasp/auth/types';
import api from '@wasp/api';
import {
  useSocket,
  useSocketListener,
  ServerToClientPayload,
} from '@wasp/webSocket';
import { ConnectionState } from '../components/ConnectionState';

async function fetchCustomRoute() {
  const res = await api.get('/foo/bar');
  console.log(res.data);
}

type Props = {
  user: User;
};

export default function ProfilePage({ user: { email, isEmailVerified } }: Props) {
  const [messages, setMessages] = useState<ServerToClientPayload<'chatMessage'>[]>([]);
  const { socket } = useSocket();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchCustomRoute();
  }, []);

  useSocketListener('chatMessage', (msg) =>
    setMessages((priorMessages) => [msg, ...priorMessages])
  );

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (inputRef.current !== null) {
      socket.emit('chatMessage', inputRef.current.value);
      inputRef.current.value = '';
    }
  }

  return (
    <>
      <h2>Profile page</h2>
      <div>
        Hello <strong>{email}</strong>! Your status is{' '}
        <strong>{isEmailVerified ? 'verfied' : 'unverified'}</strong>.
      </div>
      <br />
      <Link to="/">Go to dashboard</Link>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-4 place-items-center">
            <div><ConnectionState /></div>
            <div>
              <input type="text" ref={inputRef} />
            </div>
            <div>
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>

        <ul>
          {messages.map((msg) => (
            <li key={msg.id}>
              <em>{msg.username}</em>: {msg.text}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
