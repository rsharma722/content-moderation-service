import { Router } from "express";
import {
    moderatePost,
    flagUser,
    getPostById,
    getUserProfile,
    getFlaggedContentStats,
} from "../controllers/moderationController";

const router: Router = Router();

/**
 * @openapi
 * /moderation/post/{id}:
 *   get:
 *     summary: Retrieve a post by ID
 *     tags: [Moderation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the post
 *     responses:
 *       "200":
 *         description: Post retrieved successfully
 *       "404":
 *         description: Post not found
 */
router.get("/post/:id", getPostById);

/**
 * @openapi
 * /moderation/post/{id}/moderate:
 *   post:
 *     summary: Moderate a post (internal)
 *     tags: [Moderation]
 *     responses:
 *       "200":
 *         description: Post moderated successfully
 */
router.post("/post/:id/moderate", moderatePost);

/**
 * @openapi
 * /moderation/user/{id}/profile:
 *   get:
 *     summary: Retrieve user profile by ID
 *     tags: [Moderation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the user
 *     responses:
 *       "200":
 *         description: User profile retrieved successfully
 *       "404":
 *         description: User not found
 */
router.get("/user/:id/profile", getUserProfile);
router.post("/user/:id/flag", flagUser);
router.get("/content/flags/stats", getFlaggedContentStats);

export default router;