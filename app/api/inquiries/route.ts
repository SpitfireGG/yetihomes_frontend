import { NextResponse } from "next/server";
import {
  sendInquiryConfirmation,
  sendNewInquiryAdminNotification,
} from "@/lib/emails";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.message) {
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

    const inquiryId = crypto.randomUUID();
    console.log("[INQUIRY] New inquiry:", {
      name: body.name,
      email: body.email,
      inquiryType: body.inquiryType,
      propertyId: body.propertyId,
    });

    try {
      await sendInquiryConfirmation(
        body.email,
        body.name,
        inquiryId,
        body.inquiryType || "General"
      );
      console.log("[INQUIRY] Confirmation email sent to:", body.email);
    } catch (emailError) {
      console.error("[INQUIRY] Failed to send confirmation email:", emailError);
    }

    try {
      await sendNewInquiryAdminNotification(
        {
          name: body.name,
          email: body.email,
          phone: body.phone,
          inquiryType: body.inquiryType,
          message: body.message,
          propertyId: body.propertyId,
          propertySlug: body.propertySlug,
        },
        inquiryId
      );
      console.log("[INQUIRY] Admin notification email sent");
    } catch (emailError) {
      console.error("[INQUIRY] Failed to send admin email:", emailError);
    }

    return NextResponse.json({
      success: true,
      data: {
        id: inquiryId,
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        inquiryType: body.inquiryType || "General",
        message: body.message,
        status: "pending",
        createdAt: new Date().toISOString(),
      },
      message: "Inquiry submitted successfully",
      statusCode: 201,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[INQUIRY] Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit inquiry", statusCode: 500 },
      { status: 500 }
    );
  }
}