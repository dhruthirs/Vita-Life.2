const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let donors = [
  { id: 1, name: 'John Doe', bloodGroup: 'A+', city: 'Springfield', phone: '555-0101' },
  { id: 2, name: 'Jane Smith', bloodGroup: 'B-', city: 'Shelbyville', phone: '555-0202' }
];

app.get('/api/donors', (req, res) => {
  res.json(donors);
});

app.post('/api/donors', (req, res) => {
  const donor = req.body;
  if (!donor || !donor.name) {
    return res.status(400).json({ message: 'Invalid donor data' });
  }
  const newId = donors.length ? Math.max(...donors.map(d => d.id)) + 1 : 1;
  const newDonor = { id: newId, ...donor };
  donors.push(newDonor);
  res.status(201).json(newDonor);
});

app.get('/api/donors/search', (req, res) => {
  const { bloodGroup = '', city = '' } = req.query;
  const result = donors.filter(d => {
    const matchBlood = bloodGroup ? d.bloodGroup.toLowerCase() === bloodGroup.toLowerCase() : true;
    const matchCity = city ? d.city.toLowerCase() === city.toLowerCase() : true;
    return matchBlood && matchCity;
  });
  res.json(result);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
