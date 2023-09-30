import fs from "fs";

const fsPromise = fs.promises;

async function log(data) {
  try {
    // const logData = new Date().toString() + " data : " + data;
    const logData = `\n ${new Date().toString()} -${data}`;

    fsPromise.appendFile("log.txt", logData);
  } catch (Error) {
    console.log(error);
  }
}

const loggerMiddleware = async (req, res, next) => {
  //1. log request body
  if (!req.url.includes("signin")) {
    const logData = `${req.url}-${JSON.stringify(req.body)}`;
    await log(logData);
  }
  next();
};
export default loggerMiddleware;
