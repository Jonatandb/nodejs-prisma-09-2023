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

// multipleUsersUpdate()


async function upsertUser() {
  const result = await prisma.user.upsert({
    where: {
      email: 'test@example.com',
    },
    create: {
      email: 'test@example.com',
      name: 'Jonatan',
    },
    update: {
      name: 'Jonatan updated',
    },
  })

  console.log(result);

  const users = await prisma.user.findMany()
  console.log(users);

}

// upsertUser()


async function relatedDataCreationExample1() {
  const newUser = await prisma.user.create({
    data: {
      name: 'John 5',
      email: 'test5@example.com'
    }
  })

  console.log(newUser);

  const newPost = await prisma.post.create({
    data: {
      title: 'First post',
      content: 'First post content',
      authorId: newUser.id,
      //Otra forma de hacer la relación (en lugar de usar authorId):
      // author: {
      //   connect: {
      //     id: newUser.id,
      //   },
      // },
    },
  })

  console.log({ newPost })
}

//relatedDataCreationExample1()


async function relatedDataCreationExample2() {
  const newUser = await prisma.user.create({
    data: {
      name: 'John 6',
      email: 'test6@example.com',
      posts: {
        create: {
          title: 'Prácticas con Primas',
          content: 'Se comienza por...'
        }
      }
    }
  })

  console.log(newUser)

  const posts = await prisma.post.findMany()
  console.log(posts)
}

relatedDataCreationExample2()