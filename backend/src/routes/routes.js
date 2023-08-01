const { Router } = require("express");
const router = Router();
const CartController = require("../controllers/CartController")
const ProductoController = require("../controllers/ProductoController");
const UserController = require("../controllers/UserController");
const multer = require("multer");
const path = require("node:path");

//authentication uses
const AuthController = require("../controllers/AuthController");
const passport = require("passport");
router.use("/private", passport.authenticate('jwt', {session: false}));

//upload de imagens
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, callback) {
            callback(null, path.resolve(__dirname, '../', 'uploads'))
        },
        filename(req, file, callback) {
            callback(null, `${Date.now()}-${file.originalname}`);
            
        }
    })
})

//authentication routes
router.post("/login", AuthController.login);
router.get("/private/getDetails", AuthController.getDetails);

router.post("/User", UserController.create);
router.get("/User/:id", UserController.show); 
router.get("/User", UserController.index); 
router.put("/User/:id", UserController.update); 
router.delete("/User/:id", UserController.destroy);

router.post("/Producto", upload.single("image"), ProductoController.create);
router.get("/Producto/:id", ProductoController.show); 
router.get("/Producto", ProductoController.index); 
router.put("/Producto/:id", ProductoController.update);
router.delete("/Producto/:id", ProductoController.destroy);
router.put("/Producto/purchase/:productoId/User/:userId", ProductoController.purchase);
router.put("/Producto/cancelPurchase/:id", ProductoController.cancelPurchase);

router.post("/Cart", CartController.create);  
router.get("/Cart/:id", CartController.show); 
router.get("/Cart", CartController.index); 
router.put("/Cart/:id", CartController.update);
router.delete("/Cart/:id", CartController.destroy);

module.exports = router;
