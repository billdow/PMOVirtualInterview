import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUsers = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('pmoUsers');
    if (savedUsers) {
      return JSON.parse(savedUsers);
    }
    // Default admin user
    return [{
      id: '1',
      username: 'admin',
      password: 'admin123',
      role: 'admin',
      email: 'admin@example.com',
      createdAt: new Date().toISOString(),
    }];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedCurrentUser = localStorage.getItem('pmoCurrentUser');
    return savedCurrentUser ? JSON.parse(savedCurrentUser) : null;
  });

  useEffect(() => {
    localStorage.setItem('pmoUsers', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('pmoCurrentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('pmoCurrentUser');
    }
  }, [currentUser]);

  const addUser = (userData) => {
    // Check if username already exists
    if (users.some(user => user.username.toLowerCase() === userData.username.toLowerCase())) {
      throw new Error('Username already exists');
    }

    // Check if email already exists
    if (users.some(user => user.email.toLowerCase() === userData.email.toLowerCase())) {
      throw new Error('Email already exists');
    }

    const newUser = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      role: userData.role || 'user', // Default to 'user' if role not specified
    };

    setUsers(prevUsers => [...prevUsers, newUser]);
    return newUser;
  };

  const updateUser = (userId, userData) => {
    setUsers(prevUsers => {
      // Check if username is being changed and if it's already taken
      if (userData.username) {
        const existingUser = prevUsers.find(
          u => u.username.toLowerCase() === userData.username.toLowerCase() && u.id !== userId
        );
        if (existingUser) {
          throw new Error('Username already exists');
        }
      }

      // Check if email is being changed and if it's already taken
      if (userData.email) {
        const existingUser = prevUsers.find(
          u => u.email.toLowerCase() === userData.email.toLowerCase() && u.id !== userId
        );
        if (existingUser) {
          throw new Error('Email already exists');
        }
      }

      return prevUsers.map(user =>
        user.id === userId ? { ...user, ...userData } : user
      );
    });
  };

  const deleteUser = (userId) => {
    // Prevent deleting the last admin user
    const user = users.find(u => u.id === userId);
    if (user?.role === 'admin' && users.filter(u => u.role === 'admin').length <= 1) {
      throw new Error('Cannot delete the last admin user');
    }

    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));

    // If the deleted user is the current user, log them out
    if (currentUser?.id === userId) {
      setCurrentUser(null);
    }
  };

  const login = (username, password) => {
    const user = users.find(
      u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value = {
    users,
    currentUser,
    addUser,
    updateUser,
    deleteUser,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
