export async function GET(request: Request) {
  console.log("request", request);
  return Response.json({ message: "Hello from payment" });
}
