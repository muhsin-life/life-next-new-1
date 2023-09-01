export default async function getSessionDataAddress(sessionToken:any) {
    if (sessionToken) {
        const userAddrheaderRes = await fetch('https://devapp.lifepharmacy.com/api/user/addresses', {
            headers: {
                Authorization: `Bearer ${sessionToken}`
            }
        });
        return userAddrheaderRes.json();
    }
}

