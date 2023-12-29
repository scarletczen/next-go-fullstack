import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "./Card";
import { API_URL } from "@/utils/constants";

interface User {
  id: number;
  name: string;
  email: string;
}

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [updateUser, setUpdateUser] = useState({ id: "", name: "", email: "" });

  // Fetch all users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/users`);
        setUsers(response.data.reverse());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Create a new user
  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/v1/users`, newUser);
      setUsers([response.data, ...users]);
      setNewUser({ name: "", email: "" });
    } catch (error) {
      console.log("Error creating user:", error);
    }
  };

  // Update a user
  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/api/v1/users/${updateUser.id}`, {
        name: updateUser.name,
      });
      setUsers(
        users.map((user) => {
          if (user.id === parseInt(updateUser.id)) {
            return { ...user, name: updateUser.name, email: updateUser.email };
          }
          return user;
        }),
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Delete a user
  const deleteUser = async (userId: number) => {
    try {
      await axios.delete(`${API_URL}/api/v1/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div
      className={`user-interface bg-cyan-500 w-full max-w-md p-4 my-4 rounded shadow`}
    >
      <img
        src={`/go-logo.svg`}
        alt={`Logo`}
        className="w-20 h-20 mb06 mx-auto"
      />
      <h2 className="text-xl font-bold text-center text-white mb-6">
        Go Backend
      </h2>
      {/* Create user */}
      <form
        onSubmit={createUser}
        className="flex items-center justify-between bg-white p-4 rounded shadow"
      >
        <input
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="mb-2 w-full p-2 border border-gray-300 rounded"
        />
        <input
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="mb-2 w-full p-2 border border-gray-300 rounded"
        />
        <button
          className="w-full p-2 text-white bg-blue-500 roudned hover:bg-blue-600"
          type="submit"
        >
          Add User
        </button>
      </form>
      {/* Update user */}
      <form
        onSubmit={handleUpdateUser}
        className="mb-6 p-4 bg-blue-100 rounded shadow"
      >
        <input
          placeholder="User ID"
          value={updateUser.id}
          onChange={(e) => setUpdateUser({ ...updateUser, id: e.target.value })}
          className="mb-2 w-full p-2 border border-gray-300 rounded"
        />
        <input
          placeholder="New Name"
          value={updateUser.name}
          onChange={(e) =>
            setUpdateUser({ ...updateUser, name: e.target.value })
          }
          className="mb-2 w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full p-2 text-white bg-green-500 rounded hover:bg-green-600"
        >
          Update User
        </button>
      </form>
      {/* display users */}
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
          >
            <Card {...user} />
            <button
            onClick={()=>deleteUser(user.id)}
            className={`text-white py-2 px-4 rounded`}>
              Delete User
            </button> 
          </div>
        ))}
      </div>
    </div>
  );
};
