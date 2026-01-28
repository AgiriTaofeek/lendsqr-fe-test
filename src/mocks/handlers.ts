import { http, HttpResponse, delay } from "msw";
import { db } from "./db";

export const handlers = [
  // GET /api/users
  http.get("/api/users", async ({ request }) => {
    // Simulate network latency
    await delay(500);

    // Initialize DB if needed (lazy init)
    db.init();

    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || 1);
    const limit = Number(url.searchParams.get("limit") || 10);
    const search = url.searchParams.get("search")?.toLowerCase();
    const org = url.searchParams.get("org");
    const status = url.searchParams.get("status");

    let users = db.getAll();

    // 1. Filtering
    if (search) {
      users = users.filter(
        (u) =>
          u.username.toLowerCase().includes(search) ||
          u.email.toLowerCase().includes(search) ||
          u.organization.toLowerCase().includes(search) ||
          u.phoneNumber.includes(search),
      );
    }

    if (org) {
      users = users.filter((u) => u.organization === org);
    }

    if (status) {
      users = users.filter((u) => u.status === status);
    }

    // 2. Pagination
    const total = users.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedUsers = users.slice(start, end);

    return HttpResponse.json({
      data: paginatedUsers,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  }),

  // GET /api/users/:id
  http.get("/api/users/:id", async ({ params }) => {
    await delay(300);
    const { id } = params;
    const user = db.getById(id as string);

    if (!user) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(user);
  }),

  // POST /api/users/:id/status
  http.post("/api/users/:id/status", async ({ params, request }) => {
    await delay(500);
    const { id } = params;
    const body = (await request.json()) as { status: string }; // e.g. "Active", "Blacklisted"

    const updatedUser = db.update(id as string, { status: body.status as any });

    if (!updatedUser) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(updatedUser);
  }),

  // POST /api/auth/login
  http.post("/api/auth/login", async ({ request }) => {
    await delay(800);
    const body = (await request.json()) as { email: string };

    // Derive name from email (e.g., "adedeji@..." -> "Adedeji")
    const derivedName = body.email.split("@")[0];
    const capitalizedName =
      derivedName.charAt(0).toUpperCase() + derivedName.slice(1);

    // Simulate successful login
    return HttpResponse.json({
      user: {
        id: "mock-user-123",
        email: body.email,
        name: capitalizedName,
        avatarUrl: `https://api.dicebear.com/9.x/adventurer/svg?seed=${derivedName}`,
      },
      token: "mock-jwt-token",
    });
  }),
];
