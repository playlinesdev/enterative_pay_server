import { Logger } from "@nestjs/common"
import { exception } from "console"

var envExpire = Number(process.env.JWT_EXPIRES_IN)
export const jwtConstants: { secret: string, expiresIn: number } = {
    secret: process.env.JWT_SECRET ?? '1234',
    expiresIn: 300
}