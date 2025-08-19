import express, { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Employee } from "./models//Employee"

const app = express()
app.use(express.json())

// Kết nối database
AppDataSource.initialize()
  .then(() => {
    console.log("📦 Data Source has been initialized!")

    // Sample route
    app.get("/", (req: Request, res: Response) => {
      res.send("🚀 HRM API running...")
    })

    // Example: Lấy danh sách nhân viên
    app.get("/employees", async (req: Request, res: Response) => {
      const employeeRepo = AppDataSource.getRepository(Employee)
      const employees = await employeeRepo.find({
        relations: ["department", "position"],
      })
      res.json(employees)
    })

    const PORT = 3000
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error("❌ Error during Data Source initialization", err)
  })
