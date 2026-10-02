import app from './src/app.js'
import config from './src/config/config.js'
import { connectDB, connection } from './src/config/dbconnection.js'

import "./src/models/relationModel.js"

const port = config.PORT || 4000

const startServer = async () => {
    try {
        await connectDB()
        await connection.sync({ alter: true })

        app.listen(port, () => {
            console.log(`🚀 Server running on port ${port}`)
        })
    } catch (error) {
        console.error("❌ Failed to start server:", error)
        process.exit(1)
    }
}

startServer()