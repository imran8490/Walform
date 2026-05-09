import { NextRequest, NextResponse } from "next/server";

const WALRUS_AGGREGATOR = "https://aggregator.walrus-testnet.walrus.space";
const WALRUS_PUBLISHER = "https://publisher.walrus-testnet.walrus.space";

export async function GET(request: NextRequest) {
  const blobId = request.nextUrl.searchParams.get("blobId");
  if (!blobId) return NextResponse.json({ error: "No blob ID" }, { status: 400 });

  try {
    const response = await fetch(WALRUS_AGGREGATOR + "/v1/blobs/" + blobId);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await fetch(WALRUS_PUBLISHER + "/v1/blobs?epochs=5", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}