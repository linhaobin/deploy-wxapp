import * as deployWxapp from "../src/index";

const wechatWebDevToolsCliPath =
  "/Applications/wechatwebdevtools.app/Contents/Resources/app.nw/bin/cli";
const projectPath =
  "/Users/linhaobin/Projects/haojigeyi/wxapp/health-wxapp-build/dist";
const appId = "wxc7124277285973fc";

deployWxapp.deploy({
  wechatWebDevToolsCliPath,
  projectPath,
  extEnable: true,
  appId,
  version: "1.0.4"
});
