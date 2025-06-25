const router = require("express").Router();
const Propertycontroller = require("../controllers/property-controller");
const upload=require("../middelware/Image_upload");


router.post("/addproperty" ,upload.array("images", 5),Propertycontroller.addProperty);
router.get("/fetchProperty",Propertycontroller.fetchProperty);
router.post("/filter", Propertycontroller.filterProperties);
router.get("/:id",Propertycontroller.getDisById);
router.put('/:id/views', Propertycontroller.incrementViews);

module.exports =router;