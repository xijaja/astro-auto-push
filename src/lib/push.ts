import { Octokit } from "@octokit/rest";

function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`环境变量 ${key} 可能未被设置～`);
  }
  return value;
}

export async function createCommit(content: string, path: string, message: string) {
  const octokit = new Octokit({ auth: getEnv('GITHUB_TOKEN') });

  // 获取当前文件内容
  const { data: fileData } = await octokit.repos.getContent({
    owner: getEnv('GITHUB_OWNER'), // 仓库所有者的用户名
    repo: getEnv('GITHUB_REPO'),  // 仓库名称
    path: path,  // 文件路径
  });

  // 创建新的提交
  await octokit.repos.createOrUpdateFileContents({
    owner: getEnv('GITHUB_OWNER'), // 仓库所有者的用户名
    repo: getEnv('GITHUB_REPO'),  // 仓库名称
    path: path,  // 文件路径
    message: message,  // 提交信息
    content: Buffer.from(content).toString('base64'),  // 文件内容
    sha: Array.isArray(fileData) ? fileData[0]?.sha : fileData.sha,  // 文件的 SHA 值
    branch: `updates-${Date.now()}`,  // 创建新分支
  });

  // 创建 Pull Request
  await octokit.pulls.create({
    owner: getEnv('GITHUB_OWNER'),  // 仓库所有者的用户名
    repo: getEnv('GITHUB_REPO'),  // 仓库名称
    title: `内容更新：${path}`,  // 标题
    head: 'updates',  // 新分支
    base: 'main',  // 目标分支
  });
}