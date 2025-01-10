import Link from "next/link";

async function MainPage() {
  return (
    <>
      <Link href={"/admin/posts"}>posts</Link>
    </>
  );
}

export default MainPage;
