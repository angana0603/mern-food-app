const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = "FastDeliver";

router.post(
  "/creatuser",
  [
    body("name").isLength({ min: 8 }),
    body("email", "Incorrect email").isEmail(),
    body("password", "Incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(req.body.password, salt);
    try {
      await User.create({
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email,
        location: req.body.location,
      }).then(user => {
        const data = {
          id: user.id
        }
      })

      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "Incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Fetch user by email
    let email = req.body.email;
    try {
      let userInfo = await User.findOne({ email });
      if (!userInfo) {
        return res
          .status(400)
          .json({ errors: "Try logged in with correct credentials" });
      }
      // Compare passwords
      const passwordMatch = await bcrypt.compare(
        req.body.password.trim(),
        userInfo.password
      );
      if (!passwordMatch) {
        return res
          .status(400)
          .json({ errors: "Try logged in with correct credentials" });
      }
      // Generate JWT token
      const info = {
        user: {
          id: userInfo.id,
        },
      };
      const authToken = jwt.sign(info, jwtSecret);

      return res.status(200).json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false });
    }
  }
);

router.post('/getuser', fetch, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message)
    res.send("Server Error")

  }
});


router.post('/getlocation', async (req, res) => {
  try {
    let lat = req.body.latlong.lat
    let long = req.body.latlong.long
    console.log(lat, long)
    let location = await axios
      .get("https://api.opencagedata.com/geocode/v1/json?q=" + lat + "+" + long + "&key=74c89b3be64946ac96d777d08b878d43")
      .then(async res => {
        // console.log(`statusCode: ${res.status}`)
        console.log(res.data.results)
        // let response = stringify(res)
        // response = await JSON.parse(response)
        let response = res.data.results[0].components;
        console.log(response)
        let { village, county, state_district, state, postcode } = response
        return String(village + "," + county + "," + state_district + "," + state + "\n" + postcode)
      })
      .catch(error => {
        console.error(error)
      })
    res.send({ location })

  } catch (error) {
    console.error(error.message)
    res.send("Server Error")

  }
})

exports.logout = (req, res) => {
  // You can invalidate the token here if needed
  res.status(200).json({ message: "Logout successful" });
};
module.exports = router;
