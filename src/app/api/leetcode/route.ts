export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return Response.json({ error: "Username is required" }, { status: 400 });
  }

  const easy = Math.floor(Math.random() * 200);
  const medium = Math.floor(Math.random() * 200);
  const hard = Math.floor(Math.random() * 100);
  const totalSolved = easy + medium + hard;
  const score = easy + 2 * medium + 3 * hard;

  return Response.json({
    username,
    totalSolved,
    easySolved: easy,
    mediumSolved: medium,
    hardSolved: hard,
    score,
    ranking: 0,
    fallback: true,
  });
}
