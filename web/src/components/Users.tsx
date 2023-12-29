import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/utils/constants";
import { User } from "@/utils/types";

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
    <div className={`w-full max-w-2xl`}>
      <figure>
        <img
          src={`/go-logo.svg`}
          alt={`Logo`}
          className="w-24 h-auto mb-6 mx-auto"
        />
      </figure>
      <h2 className="text-center text-2xl font-bold">
        Go + Next + Postgres + Docker
      </h2>
      <h3 className="text-xl text-center font-semibold">Users List</h3>
      {/* display users */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[...users, { id: 1, name: "abhinav", email: "abhinav" }].map(
              (user) => (
                <tr key={user.id}>
                  <th>{user.id}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className={`btn btn-xs btn-error btn-circle`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-auto w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>

      <h3 className="text-center text-xl font-semibold">Actions</h3>
      <div className="w-full grid grid-cols-2">
        {/* Create user */}
        <form onSubmit={createUser} className="card p-2 space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="w-full input input-bordered"
          />
          <input
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="w-full input input-bordered"
          />
          <div className="card-actions w-full">
            <button className="btn btn-success w-full" type="submit">
              Add User
            </button>
          </div>
        </form>
        {/* Update user */}
        <form onSubmit={handleUpdateUser} className="card p-2 space-y-4">
          <input
            placeholder="User ID"
            type="text"
            value={updateUser.id}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, id: e.target.value })
            }
            className="w-full input input-bordered"
          />
          <input
            placeholder="New Name"
            type="text"
            value={updateUser.name}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, name: e.target.value })
            }
            className="w-full input input-bordered"
          />
          <button type="submit" className="btn btn-info w-full">
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};
