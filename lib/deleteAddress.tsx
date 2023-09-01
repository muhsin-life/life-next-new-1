export default async function deleteAddress(payLoadData: any) {
  var raw = JSON.stringify(payLoadData);
  const res = await fetch(
    "https://prodapp.lifepharmacy.com/api/user/delete-address",
    {
      headers: {
        Authorization: `Bearer 409119874|8AlmWjKAF78I3enUz0cyOvK8gUt4cxVLqbcoGZeQ`,
      },
      body: raw,
    }
  );
  if (!res.ok) throw new Error("Failed to fetch Data");

  return res.json();
}
