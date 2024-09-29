import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, params }) => {
  const { path } = params;
  const reqData = await request.json();

  console.log("path:", path);
  console.log("reqData:", reqData);

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
