

export class AuthState {
    userInfo?: UserInfo | null;
    userclaims?: UserClaims | null;
    authToken?: AuthToken | null;
    isAuthenticated?: boolean | false;
    isTokenExpired?: boolean | true;
    role?: string;
    isLoading?: boolean | false;
    error?: any | null;
    returnUrl?: string | "";
    constructor() {
        console.log('********************'); 
        try {
            let userclaims = localStorage.getItem("user_claims");
            this.userclaims = JSON.parse(userclaims) || null;
        } catch (err) {
            this.userclaims= null;
        } 
        try {
            let authToken = localStorage.getItem("user_token");
            this.authToken = JSON.parse(authToken) || null;
        } catch (err) {
            this.authToken = null;
        } 
    }
}

export class AuthToken { 
    public userId: number;
    public access_token: string;
    public refresh_token?: string;
    public expires_in?: string; 
    public expires_date?: string; 
    public token_type?: string | "Bearer" ; 
    constructor() {
    }
}

export class UserClaims {
    public userId?: number;
    public id?: string; 
    public email?: string;
    public password?: string;
    public first_name?: string;
    public last_name?: string;
    public name?: string;
    public phone?: string; 
   // 4.1.Registered Claim Names
    public iss?: string;//(Issuer) Claim 
    public sub?: string; // Identifies the subject of the JWT.
    public aud?: string;//(Audience) Claim
    public exp?: number; //(Expiration Time) Claim

    public iat?: number;// (Issued At) Claim
    public jti?: string;//"jti" (JWT ID) Claim
    public nbf?: number;//(Not Before) Claim 
    public GivenName?: string;
    public role?: string;  
    constructor() {
    }
}
export class UserInfo {
    public userId?: number;  
    public first_name?: string;
    public last_name?: string;
    public gender?: any; 
    public email?: string;
    public imageUrl?: string;
    public activated?: boolean;
    public two_factor_auth?: 0 | 1;
    constructor() {
    }
}

export interface UserModel {
    email?: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    password?: string 
}
 
/* Decoded JWT payload */
export interface JwtPayload {
    iss: string;
    iat: number;
    exp: number;
    nbf: number;
    jti: string;
    dbu: number; /* Is a dashboard user */
    spu: number; /* Is a super user */
    dpn: string; /* display name */
    sub: string; /* uuid */
    aud: string; /* login name */
}



