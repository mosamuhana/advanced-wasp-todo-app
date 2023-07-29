import { useSocket } from '@wasp/webSocket';

export function ConnectionState() {
  const { isConnected } = useSocket();

  return <span>{isConnected ? '🟢' : '🔴'}</span>;
}
