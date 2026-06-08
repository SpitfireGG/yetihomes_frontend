import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      secret?: string;
      tag?: string;
      slug?: string;
    };

    if (body.secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    revalidateTag(body.tag || "properties", "public-dynamic");

    if (body.slug) {
      revalidateTag(`property:${body.slug}`, "public-dynamic");
    }

    return NextResponse.json({ revalidated: true, tag: body.tag || "properties", slug: body.slug });
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
