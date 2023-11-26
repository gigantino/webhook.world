import { getServerSession } from "next-auth";

function extractGitHubUserId(avatarUrl: string) {
  const regex = /\/u\/(\d+)\?v=4/;
  const match = avatarUrl.match(regex);
  return match ? match[1] : null;
}

export async function getLoggedUser() {
  const session = await getServerSession();
  if (!session || !session.user || typeof session.user.image !== "string") {
    return {
      id: null,
      error: Response.json(
        {
          error: "Unauthorized",
        },
        { status: 401 },
      ),
    };
  }

  const userId = extractGitHubUserId(session.user.image);
  if (!userId) {
    return {
      id: null,
      error: Response.json(
        {
          error: "Couldn't get user-id",
        },
        { status: 500 },
      ),
    };
  }
  return { id: userId };
}
