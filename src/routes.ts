import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagControllers } from "./controllers/CreateTagControllers";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagControllers();
const createComplimentController = new CreateComplimentController();
const authenticateUserController = new AuthenticateUserController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post("/create/users", createUserController.handle);
router.post("/create/tags", ensureAuthenticated, ensureAdmin, createTagController.handle);   
router.post("/create/compliment", ensureAuthenticated, createComplimentController.handle);
router.post("/authenticate", authenticateUserController.handle);
router.get("/users/list/send", ensureAuthenticated, listUserSendComplimentsController.handle);
router.get("/users/list/receive", ensureAuthenticated, listUserReceiveComplimentsController.handle);
router.get("/list/tags", ensureAuthenticated, listTagsController.handle);
router.get("/list/users", ensureAuthenticated, listUsersController.handle);

export { router }