export async function getPosts() {
  const res = await fetch("http://127.0.0.1:8000/posts/");
  const data = await res.json();

  return data;
}
