const fastify = require('fastify')()
const fastifyStatic = require('fastify-static')
const path = require('path')

fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public')
})

const start = async () => {
  try {
    await fastify.listen(9304)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
