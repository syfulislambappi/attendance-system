const router = require("express").Router();
const userController = require("../controller/user.controller");

/**
 * Get user by id or email
 */
router.get("/:userId", () => {});

/**
 * Update user by id
 * @method PUT
 */
router.put("/:userId", () => {});

/**
 * Update user by id
 * @method PATCH
 */
router.patch("/:userId", () => {});

/**
 * Delete user by id
 * @method DELETE
 */
router.delete("/:userId", () => {});

/**
 * Get all users, include
 * - filter
 * - sort
 * - pagination
 * - select properties
 * @route /api/v1/users?sort=["by", "name"]
 * @method GET
 * @visibility PRIVATE
 */
router.get("/", userController.getUsers);

/**
 * Create new user
 * @method POST
 */
router.post("/", () => {});

module.exports = router;
