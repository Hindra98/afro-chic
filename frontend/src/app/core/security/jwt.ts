import { toInt } from "../text";

export type claim = 'name' | 'nameidentifier' | 'role' | 'fullname' | 'userlanguage' | 'tenantid' | 'contactmedia' | 'exp';

export class Jwt {

    private static decode(token: string){
        return JSON.stringify(decodeURIComponent(atob(token.split('.')[1].replace('-', '+').replace('_', '/'))
        .split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join('')));
    }

    private static findClaimValue = (decodedToken: string, key: claim) : string => {
        let claim = "";

        decodedToken.split(",").filter((item) => item.toLocaleLowerCase().includes(`${key}`))
          .forEach(value => {
            const element = value.split(":");
            const urlParams = element[1].split("/")
            const claimValue = urlParams[urlParams.length-1].slice(0, -1);

            if(claimValue.toLocaleLowerCase() === key.toLocaleLowerCase())
                claim = element[2].slice(1, element[2].length - 1);
          });
        return claim;
    }

    public static getClaim = (token: string, key: claim): string => {
        const decodedToken: string = JSON.parse(this.decode(token));
        return this.findClaimValue(decodedToken, key);
    };

    public static getClaims = (token: string, keys: claim[]) : Map<claim, string> => {

        const claims: Map<claim, string> = new Map<claim, string>();
        const decodedToken: string = JSON.parse(this.decode(token));

        for(let i = 0; i< keys.length; i++){
            claims.set(keys[i], this.findClaimValue(decodedToken, keys[i]));
        }
        return claims;
    }

    public static decodeToken (token: string) {
        return this.decode(token);
    }

    public static isAccessTokenExpired(token: string) : boolean {
        
        const decodedToken: string = JSON.parse(this.decode(token));
        const tokenExpires = this.findClaimValue(decodedToken, 'exp');
        let isExpired: boolean = false;

        if(tokenExpires){
            const expires = toInt(tokenExpires);
            if(expires * 1000 < Date.now())
                isExpired = true;

            return isExpired;
        }

        throw new Error('The expiration claim of token was not found into a jwt received from the authentication server.')
    }

    public static isRefreshTokenExpired(value: number): boolean {

        return value * 1000 < Date.now();
    }
}