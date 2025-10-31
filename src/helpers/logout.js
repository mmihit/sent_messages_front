import { RemoveToken } from "./token";

export async function Logout(reload) {
    await RemoveToken();
    await reload();
}