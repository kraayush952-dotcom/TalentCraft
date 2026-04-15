const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

const allowedOrigin = "https://talent-craft-inky.vercel.app"

// ✅ 1. CORS FIRST
app.use(cors({
  origin: allowedOrigin,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

// ✅ 2. FORCE handle preflight (THIS IS YOUR MAIN FIX)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", allowedOrigin)
  res.header("Access-Control-Allow-Credentials", "true")
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization")

  if (req.method === "OPTIONS") {
    return res.sendStatus(200)  // 🔥 IMPORTANT
  }

  next()
})

app.use(express.json())
app.use(cookieParser())

// routes
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")

app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

module.exports = app