import { app } from "./app";
import { fastifyCors } from "@fastify/cors"
import { 
    validatorCompiler, 
    serializerCompiler 
} from "fastify-type-provider-zod"

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
    origin: true, // Production example: 'http://localhost:3000'

})

app.listen({ port: 3333 }).then(() => {
    console.log('👽 HTTP Server Running!')
})