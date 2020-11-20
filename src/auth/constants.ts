export const jwtConstants = {
    secret: process.env.JWT_SECRET ?? '1234',
    expiresIn: process.env.JWT_EXPIRES_IN ?? '300s'
}