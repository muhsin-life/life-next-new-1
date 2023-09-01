export default async function getPrecriptionList() {
  const res = await fetch(
    "https://prodapp.lifepharmacy.com/api/prescription-requests?skip=0&take=5",
    {
      headers: {
        Authorization: `Bearer ${"409109814|9zhcb9wJC8yDVeYO6io8dyLFOb92jr7NxoL2kTzg"}`,
      },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch Data");

  return res.json();
}
