import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function userCreation() {
  const newUser = await prisma.user.create({
    data: {
      name: 'Jonatandb 6',
      email: 'jonatandb6@gmail.com'
    }
  })

  console.log(newUser)
}

//userCreation()


async function usersQuery() {
  const users = await prisma.user.findMany()

  //console.log(users)
  users.map(u => console.log(`${u.id} - ${u.name}`))
}

// usersQuery()


async function userQuery() {
  const user = await prisma.user.findFirst({
    // where: {
    //   //id: 3
    //   name: "Jonatandb"
    // }
    where: {
      OR: [{ id: 2 }, { name: 'Jonatandb' }],
    },
  })

  console.log(user)
}

//userQuery()


async function userDeletion() {
  try {
    const user = await prisma.user.delete({
      where: {
        id: 2, //  name: 'Jonatandb 2'
      },
    })

    console.log(user)
  } catch(err) {
    if(err.code == "P2025") {
      console.log("User not found");
    } else {
      console.log(err.code, err.meta.cause);
    }
  }
}

//userDeletion()


async function userUpdate() {
  const updatedUser = await prisma.user.update({
    where: {
      //id: 3,
      email: "jonatandb@gmail.com"
    },
    data: {
      name: 'Jonatan',
      lastname: 'db'
    }
  })

  console.log(updatedUser)
}

//userUpdate()


async function multipleUsersUpdate() {
  const affectedRows = await prisma.user.updateMany({
    where: {
      OR: [{ id: 4 }, { id: 5 }, { id: 6 }],
    },
    data: {
      name: 'Jonatan',
      lastname: 'db',
    },
  })

  console.log({affectedRows})

  const users = await prisma.user.findMany()
  console.log(users);
}

multipleUsersUpdate()