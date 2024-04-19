"use client";

import { usePostsQuery } from "@/graphql/generated";
import Image from "next/image";

export default function Home() {
  const { data, loading } = usePostsQuery({
    variables: {
      skip: 0,
      take: 5,
    },
  });
  return (
    <div>
      <h1>Home</h1>
      {loading && <p>Loading...</p>}
      {data?.posts?.data?.map((post) => (
        <div key={post.title}>
          <h2>{post.title}</h2>
        </div>
      ))}
    </div>
  );
}
