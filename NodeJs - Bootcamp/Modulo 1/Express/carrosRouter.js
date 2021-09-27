import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  console.log('GET /carros');
  res.send();
});

export default router;
