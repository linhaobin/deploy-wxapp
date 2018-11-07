// const fs = require('fs')
import * as fs from "fs";
import * as path from "path";
import * as spawn from "cross-spawn";

interface Options {
  wechatWebDevToolsCliPath: string;
  projectPath: string;
  appId: string;
  version: string;
  extEnable: boolean;
}

/**
 *
 */
export function deploy(options: Options) {
  const { appId, extEnable, version, wechatWebDevToolsCliPath } = options;

  const projectPath = getProjectPath(options.projectPath);
  const projectConfigJsonPath = path.join(projectPath, "project.config.json");
  const extJsonPath = path.join(projectPath, "ext.json");

  // 修改 project.config.json 的 appid
  if (!fs.existsSync(projectConfigJsonPath)) {
    throw new Error(`${projectConfigJsonPath}文件不存在`);
  }

  const projectConfigJson = require(projectConfigJsonPath);
  projectConfigJson.appid = appId;
  projectConfigJson.projectname = getProjectName(projectConfigJson.projectname);
  fs.writeFileSync(
    projectConfigJsonPath,
    JSON.stringify(projectConfigJson, null, 2)
  );

  if (extEnable) {
    // 修改 ext.json 的 extAppid
    if (!fs.existsSync(extJsonPath)) {
      throw new Error(`${extJsonPath}文件不存在`);
    }
    const extJson = require(extJsonPath);
    extJson.extAppid = appId;
    extJson.extEnable = true;
    fs.writeFileSync(extJsonPath, JSON.stringify(extJson, null, 2));
  }

  // 上传代码
  spawn.sync(
    wechatWebDevToolsCliPath,
    ["-o", "--upload", `${version}@${projectPath}`],
    {
      stdio: "inherit"
    }
  );
}

function getProjectPath(projectPath: string) {
  if (path.isAbsolute(projectPath)) {
    return projectPath;
  }
  return path.join(process.cwd(), projectPath);
}

function getProjectName(projectName: string) {
  const arr = projectName.split("-");
  const ts = arr[arr.length - 1];
  if (ts.length === 13 && parseInt(ts).toString() === ts) {
    arr.pop();
  }
  arr.push(new Date().getTime().toString());
  return arr.join("-");
}
