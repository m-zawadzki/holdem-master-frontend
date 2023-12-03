import React from 'react';

const PokerTable = ({ numPlayers }) => {
  const getSeatPosition = (index) => {
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
    <div className="flex items-center justify-center h-screen">
      <div
        className="relative bg-amber-900 p-8 rounded-full shadow-lg"
        style={{ width: '400px', height: '200px' }}
      >
        <div className="bg-green-500 h-full w-full rounded-full" />

        <div className="absolute border-4 border-amber-500 top-4 bottom-4 left-4 right-4 rounded-full" />

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
