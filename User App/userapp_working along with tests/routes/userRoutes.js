import express from 'express';
const router = express.Router();

import { create, readAll, read, update, remove, userByID } from '../controllers/userController.js';

router.route('/')
  .post(create)
  .get(readAll);

router.route('/:userId')
  .get(read)
  .put(update)
  .delete(remove);

router.param('userId', userByID);

export default router;
