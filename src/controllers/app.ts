import dotenv from "dotenv";
import express, { Request, Response } from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import dbConnect from "../../utils/DB/dbConfigure";
import newsApp from "./newsController";
import showTaxiData from "./showTaxiData";
import { stockController } from "./stockController";
import taxiCreate from './taxiController';
import { signIn, userCreate ,logOutDate} from './userController';
import yesterDayStockData from './yesterDayStockData';
import myDrivingCar from './myDrivingCar';
import myTaxiData from "./myTaxiData";
dotenv.config({ path: "../../.env" }); // env 경로 설정
const root = path.join(__dirname, "..", ".."); //C:\Users\over9\KDT-2_FullStack\KDT-2-Project-A-5
const rootPublic = path.join(root, "public"); //C:\Users\over9\KDT-2_FullStack\KDT-2-Project-A-5\public
const app = express();
const socketServer = http.createServer(app);
export const io = new Server(socketServer);
// ! 주식 데이터 전송 모듈
stockController(io)

// DB 연결
dbConnect.connect((err) => {
  if (err) {
    console.error("DB연결에 실패했습니다", err);
    return;
  }
  console.log("DB연결에 성공했습니다");
});
app.get("/news", newsApp);
app.use(express.static(root)); //root 디렉토리
app.use(express.static(rootPublic)); //root의 하위 디렉토리는 첫번째만 접근 가능하기 때문에 별도로 지정.
app.use('/showTaxiData', showTaxiData) // station 화면 랜더링 요청 처리 미들웨어
app.get('/myTaxiData', (req:Request,res:Response)=>{
  console.log(req.url)
  const userName = req.url.split("?")[1]
  const _userName = userName.split("=")[1]
  console.log(_userName+"check")
  myTaxiData(_userName,dbConnect,res)
}) // /myTaxiData url 입력시 로그인 된 유저 이름의 택시 목록 검색
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(rootPublic, "index.html"));
})
app.use(express.json()); // JSON 형식의 본문을 파싱할 수 있도록 설정
app.use(express.urlencoded({ extended: true })); // URL-encoded
app.post('/user', userCreate); // 회원가입 요청 미들워에
app.use('/signIn', signIn); // 로그인 요청 미들웨어
app.use('/logOut', logOutDate); // 로그아웃 요청을 하고 최종 접속 시간 인설트
app.post('/yesterDayDataRequest',yesterDayStockData); //전날 데이터 요청 하는 미들웨어
app.post('/taxi',taxiCreate) // 택시방 만들기 요청 하는 미들웨어
app.post('/drivingCar',myDrivingCar) // 내가 참여 하거나 운행중인 차량






app.use((req, res) => {
  res.status(404).send("not found");
});


socketServer.listen(8080, () => {
  console.log("소켓 서버 on")
})