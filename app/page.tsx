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

  const [playerCards, setPlayerCards] = useState<Array<{ card: string }>>([]);
  const [cards, setCards] = useState([]);

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
      setPlayerCards(data);
    });

    socket.on('flop', flop => {
      setCards(flop);
    });

    socket.on('turn', turn => {
      setCards(turn);
    });

    socket.on('river', river => {
      setCards(river);
    });
  }, []);

  if (gameStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <PokerTable numPlayers={playersCount} cards={cards} />

        <div className="flex gap-4 mt-10">
          {playerCards.map(card => (
            <Image
              className="w-14 sm:w-20 md:w-24 lg:w-28"
              width={100}
              height={0}
              key={card.card}
              src={`/images/${card.card}.svg`}
              alt="card"
            />
          ))}
        </div>
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

          <PokerTable numPlayers={playersCount} cards={cards} />

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
