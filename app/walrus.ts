export async function uploadToWalrus(data: object): Promise<string> {
  const response = await fetch("/api/walrus", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Walrus upload failed");
  }

  const result = await response.json();
  const blobId =
    result.newlyCreated?.blobObject?.blobId ||
    result.alreadyCertified?.blobId;
  return blobId;
}

export async function getFromWalrus(blobId: string): Promise<object> {
  const response = await fetch("/api/walrus?blobId=" + blobId);

  if (!response.ok) {
    throw new Error("Walrus fetch failed");
  }

  return response.json();
}