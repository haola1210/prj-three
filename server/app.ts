import express from 'express';
import { userNaming, userTerminate } from './service';
import { createServer } from "http"
import { Server } from "socket.io"
import socketController from './socket';
import cors from "cors"

const app = express();
const port = 4000;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

var corsOptions = {
  origin: 'http://localhost:3000',
  
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))


app.post("/user-naming", userNaming)
app.post("/user-terminate", userTerminate)

const httpServer = createServer(app);

const io = new Server(httpServer, { 
  cors : {
    ...corsOptions
  }  
});
socketController(io)

httpServer.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
});