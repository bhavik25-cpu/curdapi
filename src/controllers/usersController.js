const User = require('../models/userModel');
let users = [];

const getUsers = (req, res) => {
  res.status(200).json(users);
};

const getUserById = (req, res) => {
  const userId = req.params.userId;
  const user = users.find((user) => user.id === userId);

  if (!userId || !/^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/.test(userId)) {
    return res.status(400).json({ error: 'Invalid userId format' });
  }

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json(user);
};

const createUser = (req, res) => {
  const { username, age, hobbies } = req.body;

  if (!username || !age) {
    return res.status(400).json({ error: 'Username and age are required fields' });
  }

  const newUser = new User(username, age, hobbies);
  users.push(newUser);

  res.status(201).json(newUser);
};

const updateUser = (req, res) => {
  const userId = req.params.userId;
  const { username, age, hobbies } = req.body;
  const userIndex = users.findIndex((user) => user.id === userId);

  if (!userId || !/^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/.test(userId)) {
    return res.status(400).json({ error: 'Invalid userId format' });
  }

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  const updatedUser = { id: userId, username, age, hobbies };
  users[userIndex] = updatedUser;

  res.status(200).json(updatedUser);
};

const deleteUser = (req, res) => {
  const userId = req.params.userId;
  const userIndex = users.findIndex((user) => user.id === userId);

  if (!userId || !/^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/.test(userId)) {
    return res.status(400).json({ error: 'Invalid userId format' });
  }

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users.splice(userIndex, 1);

  res.status(204).send();
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
