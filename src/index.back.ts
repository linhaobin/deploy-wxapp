// const fs = require('fs')
import * as fs from "fs";
// import * as request from "request";
import * as path from "path";
import * as spawn from "cross-spawn";

const idePath =
  "/Users/linhaobin/Library/Application Support/微信web开发者工具/Default/.ide";
const cliPath =
  "/Applications/wechatwebdevtools.app/Contents/Resources/app.nw/bin/cli";
const projectPath =
  "/Users/linhaobin/Projects/haojigeyi/wxapp/health-wxapp-build/dist";
const projectConfigJsonPath = path.join(projectPath, "project.config.json");
const extJsonPath = path.join(projectPath, "ext.json");

const infoJsonPath = path.join(__dirname, "info.json");

const appId = "wxc7124277285973fc";

// 修改 project.config.json 的 appid
if (!fs.existsSync(projectConfigJsonPath)) {
  throw new Error("project.config.json 文件不存在");
}

const projectConfigJson = require(projectConfigJsonPath);
projectConfigJson.appid = appId;
fs.writeFileSync(
  projectConfigJsonPath,
  JSON.stringify(projectConfigJson, null, 2)
);

// 修改 ext.json 的 extAppid
if (!fs.existsSync(extJsonPath)) {
  throw new Error("ext.json");
}
const extJson = require(extJsonPath);
extJson.extAppid = appId;
extJson.extEnable = true;
fs.writeFileSync(extJsonPath, JSON.stringify(extJson, null, 2));

if (!fs.existsSync(idePath)) {
  throw new Error("找不到.ide文件");
}
// const port = fs.readFileSync(idePath);

// console.log(port.toString());

// const baseUrl = `http://127.0.0.1:${port}`;

// 打开项目
// request(
//   {
//     method: "get",
//     baseUrl,
//     uri: `open?projectpath=${projectPath}`
//   },
//   (_, __, body) => {
//     console.log(JSON.parse(body));
//   }
// );

// 上传代码
const version = "1.0.3";
// const desc = "";
// request(
//   {
//     method: "get",
//     baseUrl,
//     uri: `upload?projectpath=${projectPath}&version=${version}&desc=${desc}`
//   },
//   (error, response, body) => {
//     console.log(error);
//     console.log(response.statusCode);
//     console.log(body);
//   }
// );
console.info("infoJsonPath", infoJsonPath);

spawn.sync(
  cliPath,
  [
    "-o",
    "--upload",
    `${version}@${projectPath}`,
    "--upload-info-ouput",
    infoJsonPath
  ],
  { stdio: "inherit" }
);