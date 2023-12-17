const db = require("../firebase");

async function getCommittees() {
  const dbRef = db.collection("committees");
  const snapshot = await dbRef.get();
  const committees = [];
  snapshot.forEach((doc) => {
    const committeData = doc.data();

    committees.push(committeData);
  });
  return committees;
}

async function getCommitteeById(committeeId) {
  try {
    const dbRef = db.collection("committees").doc(committeeId);
    const doc = await dbRef.get();

    if (!doc.exists) {
      return null;
    }

    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error("Error fetching committee:", error);
    throw error;
  }
}

async function createCommittee(committeeData) {
  try {
    const dbRef = db.collection("committees").doc();
    await dbRef.set(committeeData);
    return { id: dbRef.id, ...committeeData };
  } catch (error) {
    console.error("Error creating committee:", error);
    throw error;
  }
}

async function deleteCommitteeById(commiteeId) {
  try {
    const dbRef = db.collection("committees").doc(commiteeId);
    await dbRef.delete();
    return { id: commiteeId };
  } catch (error) {
    console.error("Error deleting committee:", error);
    throw error;
  }
}

async function updateCommitteesById(committeId, updatedData) {
    try {
        const dbRef = db.collection('committees').doc(committeId);
        await dbRef.update(updatedData);
        return { id: committeId, ...updatedData };
    } catch (error) {
        console.error("Error updating committee:", error);
        throw error;
    }
}

module.exports = {
  getCommittees,
  getCommitteeById,
  createCommittee,
  deleteCommitteeById,
  updateCommitteesById
};
