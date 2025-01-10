const ADMIN_PATH = {
  posts: {
    root: "/admin/posts",
    create: "/admin/posts/create",
    edit: (id: string) => "/admin/posts/" + id,
  },
};
export default ADMIN_PATH;
