export interface Application {
    id: string; 
    userId: string;
    company:string;
    position:string; 
    location:string;
    status: "wishlist" | "applied" | "interview" | "offer" | "rejected";
    dateApplied: string;
    logo?: string;
}