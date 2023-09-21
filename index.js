import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function userCreation() {
  const newUser = await prisma.user.create({
    data: {
      name: 'Jonatandb 3',
      email: 'jonatandb3@gmail.com'
    }
  })

  console.log(newUser)
}

// userCreation()


async function usersQuery() {
  const users = await prisma.user.findMany()

  //console.log(users)
  users.map(u => console.log(`${u.id} - ${u.name}`))
}

usersQuery()