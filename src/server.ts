import { app } from "./app";
import { fastifyCors } from "@fastify/cors"
import { 
    validatorCompiler, 
    serializerCompiler 
} from "fastify-type-provider-zod"
import { z } from "zod"

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
    origin: true, // Production example: 'http://localhost:3000'

})

app.post('/subscriptions', {
    schema: {
        body: z.object({
            name: z.string(),
            email: z.string().email(),
        }),
        response: {
            201: z.object({
                name: z.string(),
                email: z.string().email(),
            }),
        },
    }
} , async (request, reply) => {
    const { name, email } = request.body

    return reply.status(201).send({
        name,
        email
    })
})

app.listen({ port: 3333 }).then(() => {
    console.log('👽 HTTP Server Running!')
})