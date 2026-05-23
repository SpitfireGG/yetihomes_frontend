import { NextResponse } from "next/server";
import { sendNewsletterWelcome } from "@/lib/emails";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.email || !body.email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Valid email is required", statusCode: 400 },
        { status: 400 }
      );
    }

    const email = body.email;
    console.log("[NEWSLETTER] New subscription:", email);

    try {
      await sendNewsletterWelcome(email);
      console.log("[NEWSLETTER] Welcome email sent to:", email);
    } catch (emailError) {
      console.error("[NEWSLETTER] Failed to send email:", emailError);
    }

    return NextResponse.json({
      success: true,
      data: {
        id: crypto.randomUUID(),
        email: body.email,
        subscribedAt: new Date().toISOString(),
      },
      message: "Successfully subscribed to newsletter",
      statusCode: 201,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[NEWSLETTER] Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to subscribe", statusCode: 500 },
      { status: 500 }
    );
  }
}