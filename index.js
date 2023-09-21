import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const newUser = await prisma.user.create({
    data: {
      name: 'Jonatandb 3',
      email: 'jonatandb3@gmail.com'
    }
  })

  console.log(newUser)
}

main()