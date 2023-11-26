export async function GET(
  _request: Request,
  { params }: { params: { id: string; token: string } },
) {
  // TODO: Read the body and store the message in the database!
  return Response.json({
    id: params.id,
    token: params.token,
  });
}
