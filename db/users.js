const db = require("../firebase");

async function getUsersPublicData() {
  const usersRef = db.collection("brothers");
  const snapshot = await usersRef.get();
  const users = [];
  snapshot.forEach((doc) => {
    const userData = doc.data();

    users.push({
      first_name: userData.first_name,
      last_name: userData.last_name,
      pledge_class: userData.pledge_class,
      major: userData.major,
      city: userData.city,
      state: userData.state,
      headshot: userData.headshot,
    });
  });
  return users;
}

async function getUsersAuthenticatedData() {
  const usersRef = db.collection("brothers");
  const snapshot = await usersRef.get();
  const users = [];
  snapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });
  return users;
}

async function getUserById(userId) {
  try {
    const userRef = db.collection("brothers").doc(userId);
    const doc = await userRef.get();

    if (!doc.exists) {
      return null;
    }

    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

async function createUser(userData) {
  try {
    const userRef = db.collection("brothers").doc();
    await userRef.set(userData);
    return { id: userRef.id, ...userData };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

async function deleteUserById(userId) {
  try {
    const userRef = db.collection("brothers").doc(userId);
    await userRef.delete();
    return { id: userId };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

async function updateUserById(userId, updatedData) {
    try {
        const userRef = db.collection('brothers').doc(userId);
        await userRef.update(updatedData);
        return { id: userId, ...updatedData };
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}

module.exports = {
  getUsersPublicData,
  getUsersAuthenticatedData,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById
};
