const express = require("express");
const cors = require("cors");
 
const { connection } = require("./config/db");
const { formRouter } = require("./routes/api.routes"); 

const app = express();
 
app.use(cors());
app.use(express.json());
app.use("/post", formRouter);

//----------------------------------Checking Backend is Connected or not----------------------------->
app.use("/", async (req, res) => {
  try {
    res.status(200).send({ msg: `Welcome to trello board` });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});


//-------------------------------Connection build ---------------------------------->
app.listen(8000, async () => {
  try {
    await connection;
  } catch (error) {
    console.log(error);
  }
  console.log("connected with DB and port 8000");
});
