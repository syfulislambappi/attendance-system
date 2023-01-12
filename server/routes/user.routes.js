const router = require("express").Router();
const userController = require("../controller/user.controller");

/**
 * Get user by id or email
 */
router.get("/:userId", userController.getUserById);

/**
 * Update user by id
 * @method PUT
 */
router.put("/:userId", userController.putUserById);

/**
 * Update user by id
 * @method PATCH
 */
router.patch("/:userId", userController.patchUserById);

/**
 * Delete user by id
 * @method DELETE
 */
router.delete("/:userId", userController.deleteUserById);

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
router.post("/", userController.postUser);

module.exports = router;
