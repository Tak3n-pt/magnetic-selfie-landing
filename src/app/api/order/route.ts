import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate required fields
    const required = ["name", "phone", "wilaya", "commune"] as const;
    for (const k of required) {
      if (!data?.[k] || typeof data[k] !== "string") {
        return NextResponse.json({ ok: false, error: `Missing: ${k}` }, { status: 400 });
      }
    }

    // Validate delivery type specific requirements
    if (data.deliveryType === "home" && !data.address) {
      return NextResponse.json({ ok: false, error: "Address required for home delivery" }, { status: 400 });
    }

    // Log the order server-side
    console.log("New order:", data);

    // Send to Google Sheets
    const sheetsUrl = process.env.GOOGLE_SHEETS_URL;
    if (sheetsUrl) {
      try {
        const sheetsResponse = await fetch(sheetsUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const sheetsResult = await sheetsResponse.json();
        console.log("Google Sheets response:", sheetsResult);

        if (!sheetsResult.success) {
          console.error("Google Sheets error:", sheetsResult.error);
        }
      } catch (sheetsError) {
        console.error("Failed to send to Google Sheets:", sheetsError);
        // Don't fail the request if Google Sheets fails
      }
    } else {
      console.warn("GOOGLE_SHEETS_URL not configured");
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to process order", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
