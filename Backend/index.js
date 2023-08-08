const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const bodyParser = require("body-parser");
const adminRoutes = require("./Routes/adminRoutes");
const userRoutes = require("./Routes/userRoutes");

app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

app.use("/admin", adminRoutes);
app.use("/users", userRoutes);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const courses = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: courses.map((c) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: c.title,
            },
            unit_amount: c.price * 100,
          },
          quantity: 1,
        };
      }),
      success_url: `${process.env.CLIENT_URL}/courses`,
      cancel_url: `${process.env.CLIENT_URL}`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const initiate = () => {
  connectDB()
    .then(() => {
      console.log("Connected to MongoDB");
      app.listen(process.env.PORT || 4000, () =>
        console.log("Server running on port 4000")
      );
    })
    .catch((err) => console.log(err.message));
};
initiate();
