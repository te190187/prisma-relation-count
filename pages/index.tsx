import { GetServerSideProps } from "next";
import { prisma } from "../prisma/prismadb";

export const getServerSideProps: GetServerSideProps = async () => {
  const raw = await prisma.$queryRaw`
    SELECT
      User.id
      , COUNT(PostLike.id)
    FROM
      PostLike
      LEFT JOIN Post
        ON (PostLike.postId = Post.id)
      LEFT JOIN User
        ON (Post.userId = User.id)
    WHERE
      PostLike.createdAt > (NOW() - INTERVAL 1 MONTH)
    GROUP BY
      User.id
    ORDER BY
      COUNT(PostLike.id) DESC
      , Post.createdAt DESC
    LIMIT
      10
  `;

  const p1 = await prisma.post.findFirst({
    where: { id: "post1" },
    include: { _count: { select: { likes: true } } },
  });
  const p2 = await prisma.post.findFirst({
    where: { id: "post2" },
    include: { _count: { select: { likes: true } } },
  });
  console.log("s----------");
  console.log(p1);
  console.log(p2);
  console.log("----------e");

  return { props: {} };
};

export default function Home() {
  return <div>test</div>;
}
