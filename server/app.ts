import express from 'express';
import { userNaming } from './service';

const app = express();
const port = 4000;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.post("/user-naming", userNaming)

app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
});