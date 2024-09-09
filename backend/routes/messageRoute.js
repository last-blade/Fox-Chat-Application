import express from 'express';
import { receiveMessage, sendMessage } from '../controllers/messageController.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.route("/send/:id").post(isAuthenticated, sendMessage)

router.route("/:id").get(isAuthenticated, receiveMessage);


export default router;