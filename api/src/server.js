import express from 'express';

const app = express();

app.post('/certifications', (req, res) => {
  return res.json({ message: 'Certification created' });
})