import React from 'react';
import Image from 'next/image';

type Props = {
  numPlayers: number;
  cards: Array<{ card: string }>;
};

const PokerTable = ({ numPlayers, cards }: Props) => {
  const getSeatPosition = (index: number) => {
    const positions = [
      '-bottom-8 left-[50%] -translate-x-1/2',
      '-top-8 left-[50%] -translate-x-1/2',
      '-top-6 left-[15%] -translate-x-1/2',
      '-top-6 left-[85%] -translate-x-1/2',
      'top-[50%] -left-8 -translate-y-1/2',
      'top-[50%] -right-8 -translate-y-1/2',
      '-bottom-6 left-[15%] -translate-x-1/2',
      '-bottom-6 left-[85%] -translate-x-1/2',
    ];

    const numValidPlayers = Math.min(numPlayers, 8);
    const selectedPositions = positions.slice(0, numValidPlayers);

    return selectedPositions[index] || '';
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative bg-amber-900 p-8 rounded-full shadow-lg w-[350px] h-[200px] sm:w-[600px] sm:h-[300px] md:w-[700px] md:h-[350px] lg:w-[800px] lg:h-[400px]">
        <div className="bg-green-500 h-full w-full rounded-full" />

        <div className="absolute border-4 border-amber-500 top-4 bottom-4 left-4 right-4 rounded-full flex justify-center items-center gap-2">
          {cards.map(card => (
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

        {Array.from({ length: numPlayers }).map((_, index) => (
          <div
            key={index}
            className={`flex justify-center items-center text-black h-10 w-10 bg-yellow-300 rounded-full absolute ${getSeatPosition(
              index
            )}`}
          >
            {index}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokerTable;
