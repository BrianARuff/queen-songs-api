import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

const server = express();

server.use(helmet());
server.use(morgan("dev"));
server.use(cors());
server.use(express.json());

export default server;