import React from "react";

interface Card {
  id: number;
  name: string;
  email: string;
}

export const Card = ({ name, email, id }: Card) => {
  return (
    <div
      className="bg-white shadow-lg rounded-lg p-2 mb-2 hover:bg-gray-100"
      key={id}
    >
      <div className="text-sm text-gray-600">ID: {id}</div>
      <div className="text-lg font-semibold text-gray-800">{name}</div>
      <p className="text-gray-700">{email}</p>
    </div>
  );
};
