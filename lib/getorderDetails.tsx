export default async function getOrderDetails(sessionToken:any) {
  const res = await fetch(
    "https://prodapp.lifepharmacy.com/api/orders?skip=0&take=5&lang=ae-en", {
      headers: {
        Authorization: `Bearer ${"408933214|ioBpRoFyCvMKKTK0gSq8Wtby4ct1zMFXl1ByyI5V"}`
    }
    }
  );
  if (!res.ok) throw new Error("failed to fetch data");

  return res.json();
}
