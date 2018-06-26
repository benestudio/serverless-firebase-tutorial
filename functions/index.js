const functions = require('firebase-functions');

// admin is needed for db operations
const admin = require('firebase-admin');
admin.initializeApp();

// db is initialized here
const db = admin.firestore();

// this is a backend endpoint for adding food-calories pairs
exports.addCalories = functions.https.onRequest((req, res) => {
  // get query parameters
  const calories = Number(req.query.calories);
  const food = req.query.food;

  // initialize new reference
  const newCaloryRef = db.collection('calories').doc();

  // write to db
  return newCaloryRef.set({
    calories: calories,
    food: food,
  }).then((snapshot) => {
    // respond with a json
    return res.json({
      success: true,
    });
  });
});

// this is a backend endpoint for listing all food-calories pairs
exports.getAll = functions.https.onRequest((req, res) => {
  const allCaloriesRef = db.collection('calories');
  // query all documents from db
  return allCaloriesRef.get()
  .then(allCaloriesSnapshot => {
    const allCalories = [];
    allCaloriesSnapshot.forEach(doc => {
      // extract only the data pard of the doc
      allCalories.push(doc.data());
    });
    // respond with a json containing all pairs
    return res.json({
      allCalories: allCalories,
    });
  })
  // some error handling
  .catch(err => {
    console.log('Error getting documents', err);
    return res.json({
      error: err,
    });
  });
});
