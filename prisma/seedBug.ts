import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  //ユーザーを作成
  await prisma.user.upsert({
    where: { id: "user1" },
    create: { id: "user1", name: "user1" },
    update: {},
  });
  await prisma.user.upsert({
    where: { id: "user2" },
    create: { id: "user2", name: "user2" },
    update: {},
  });

  //投稿を作成
  await prisma.post.upsert({
    where: { id: "post1" },
    create: { id: "post1", title: "1", userId: "user1" },
    update: {},
  });
  await prisma.post.upsert({
    where: { id: "post2" },
    create: { id: "post2", title: "2", userId: "user2" },
    update: {},
  });
  console.log("投稿を作成");

  //いいね
  await prisma.postLike.upsert({
    where: { id: "like1" },
    create: { id: "like1", postId: "post1", userId: "user2" },
    update: {},
  });
  await prisma.postLike.upsert({
    where: { id: "like2" },
    create: { id: "like2", postId: "post2", userId: "user1" },
    update: {},
  });
  console.log("いいね");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect;
    process.exit(1);
  });
