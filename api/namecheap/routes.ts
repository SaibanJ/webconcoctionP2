import express from 'express';
import { checkDomain, registerNewDomain } from './controller';

const router = express.Router();

/**
 * @route POST /api/namecheap/check
 * @desc Check if a domain is available for registration
 * @access Public
 */
router.post('/check', checkDomain);

/**
 * @route POST /api/namecheap/register
 * @desc Register a new domain
 * @access Public
 */
router.post('/register', registerNewDomain);

export default router;