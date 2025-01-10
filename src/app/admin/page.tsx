import Link from "next/link";

async function AdminPage() {
  return (
    <>
      <Link href={"/admin/posts"}>posts</Link>
    </>
  );
}

export default AdminPage;
