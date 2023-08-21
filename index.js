const express = require("express");
const app = express();
const cors = require("cors");
const { connection } = require("./configs/connection.js");
const { userRouter } = require("./routes/user.route.js");
const { loginRouter } = require("./routes/login.js");
const { registerRouter } = require("./routes/register.js");
const { appointmentRouter } = require("./routes/appointment.js");
app.use(cors());
app.use(express.json())


app.get("/",async(req,res)=>{
    try {
        res.send("Evaluation 21/08/2023 Monday ")
    } catch (error) {
        console.log(error)
    }
})

app.use("/users",userRouter);
app.use("/login",loginRouter);
app.use("/register",registerRouter);
app.use("/appointment",appointmentRouter);





app.listen(4000, async(req,res)=>{
    try {
        console.log("app started at http://localhost:4000")
        await connection;
        console.log("connected to remote database")
    } catch (error) {
        console.log("error in connection",error)
    }
})
