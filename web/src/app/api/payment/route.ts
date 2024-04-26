export async function GET(request: Request) {
  console.log("request", request);
  
  return Response.json({ message: "Hello GET" });
}

export async function POST(request: Request) {
  console.log("request", request);
  return Response.json({ message: "Hello POST" });
}
