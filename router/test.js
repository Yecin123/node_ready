

const express = require("express");
const router = express.Router();


router.get("", (req, res) => {
    
    res.send("test success");
});

router.get("/:param1/:param2", (req, res) => {
    
    const { param1, param2 } = req.params;
    res.send("router test" + JSON.stringify({param1,param2}));
});



module.exports = router;



