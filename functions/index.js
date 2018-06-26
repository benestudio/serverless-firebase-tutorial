const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

exports.addCalories = functions.https.onRequest((req, res) => {
  const calories = Number(req.query.calories);
  const food = req.query.food;

  const newCaloryRef = db.collection('calories').doc();

  return newCaloryRef.set({
    calories: calories,
    food: food,
  }).then((snapshot) => {
    return res.json({
      success: true,
    });
  });
});

exports.getAll = functions.https.onRequest((req, res) => {
  const allCaloriesRef = db.collection('calories');
  return allCaloriesRef.get()
  .then(allCaloriesSnapshot => {
    const allCalories = [];
    allCaloriesSnapshot.forEach(doc => {
      allCalories.push(doc.data());
    });
    return res.json({
      allCalories: allCalories,
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });
});
