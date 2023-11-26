export default function extractGitHubUserId(avatarUrl: string) {
  const regex = /\/u\/(\d+)\?v=4/;
  const match = avatarUrl.match(regex);
  return match ? match[1] : null;
}
