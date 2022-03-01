import * as express from 'express';

const router = express.Router();

router.get('/api/hello', (req, res, next) => {
    res.json('Mr World');
});


router.get('/api/hena', (req, res, next) => {
    res.json('Ms Hena Aktar');
});

export default router;