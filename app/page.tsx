'use client';

import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import Image from 'next/image';
import PokerTable from '@/components/PokerTable';

const socket = socketIOClient(process.env.NEXT_PUBLIC_SERVER_URL as string);

const Page = () => {
  const [roomId, setRoomId] = useState('');
  const [playersCount, setPlayersCount] = useState(0);
  const [username, setUsername] = useState('');

  const [gameStarted, setGameStarted] = useState(false);

  const [cards, setCards] = useState<Array<{ card: string }>>([]);

  const joinRoom = (room: string) => {
    setRoomId(room);
    socket.emit('joinRoom', room);
  };

  const leaveRoom = () => {
    setRoomId('');
    socket.emit('leaveRoom', roomId);
  };

  useEffect(() => {
    socket.on('playersUpdated', data => {
      setPlayersCount(data.players);
    });

    socket.on('gameStarted', () => {
      setGameStarted(true);
    });

    socket.on('dealingResult', data => {
      setCards(data);
    });
  }, []);

  if (gameStarted) {
    return (
      <div>
        Game stared
        <div>{socket.id}</div>
        <div className="flex">
          {cards.map(card => (
            <Image
              width={200}
              height={0}
              key={card.card}
              src={`/images/${card.card}.svg`}
              alt="card"
            />
          ))}
        </div>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={leaveRoom}
        >
          Leave Room
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Holdem Master</h1>

      {roomId ? (
        <div>
          <p>Room ID: {roomId}</p>

          <p>Players in room: {playersCount}</p>

         <PokerTable numPlayers={8} />

          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={leaveRoom}
          >
            Leave Room
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => {
                setUsername(e.target.value);
              }}
            />
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => joinRoom('exampleRoom')}
          >
            Join Room
          </button>
        </>
      )}
    </div>
  );
};

export default Page;
