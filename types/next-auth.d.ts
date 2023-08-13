
declare module "next-auth" {
    interface Session {
        user: {
            user:{
                id: number,
                first_name: string,
                last_name: string,
                email: string
            }
        token: string
        },
    }
}