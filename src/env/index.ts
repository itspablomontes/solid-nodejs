import "dotenv/config";
import {z} from "zod";

const envSchema = z.object({
NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
PORT: z.coerce.number()
}) 

const _env = envSchema.safeParse(process.env)

if(!_env.success){
    console.error("Invalid Enviroment Variables", _env.error.format())

    throw new Error("Invalid enviroment variables.")
}

export const env = _env.data