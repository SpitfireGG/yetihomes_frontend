import { NextResponse } from "next/server";
import {
  sendSupportTicketConfirmation,
  sendNewTicketAdminNotification,
} from "@/lib/emails";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = body.fullName || body.name;
    if (!name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, message: "Name, email, and message are required", statusCode: 400 },
        { status: 400 }
      );
    }

    if (!body.email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Valid email is required", statusCode: 400 },
        { status: 400 }
      );
    }

    const ticketId = crypto.randomUUID();
    console.log("[TICKET] New support ticket:", {
      name,
      email: body.email,
      subject: body.subject,
      category: body.category,
    });

    try {
      await sendSupportTicketConfirmation(
        body.email,
        name,
        ticketId,
        body.subject || "General Inquiry"
      );
      console.log("[TICKET] Confirmation email sent to:", body.email);
    } catch (emailError) {
      console.error("[TICKET] Failed to send confirmation email:", emailError);
    }

    try {
      await sendNewTicketAdminNotification(
        {
          name,
          email: body.email,
          phone: body.phone,
          subject: body.subject,
          category: body.category,
          message: body.message,
        },
        ticketId
      );
      console.log("[TICKET] Admin notification email sent");
    } catch (emailError) {
      console.error("[TICKET] Failed to send admin email:", emailError);
    }

    return NextResponse.json({
      success: true,
      data: {
        id: ticketId,
        name,
        email: body.email,
        subject: body.subject || "General Inquiry",
        status: "pending",
        createdAt: new Date().toISOString(),
      },
      message: "Support ticket created successfully",
      statusCode: 201,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[TICKET] Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create ticket", statusCode: 500 },
      { status: 500 }
    );
  }
}