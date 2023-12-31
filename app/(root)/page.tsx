//app/page.tsx
import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts, fetchUserAndFollowsPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default async function Home() {
  const result = await fetchPosts(1, 30);
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  const userAndFollowsPosts = await fetchUserAndFollowsPosts(userInfo._id, 1, 30);

  return (
    <>
      {/* <UserButton afterSignOutUrl="/"/> */}
      <h1 className="head-text text-left">Home</h1>

      {/* mt-9 => margin-top=9 */}
      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
            {userAndFollowsPosts.posts.map((post) => (
              <ThreadCard 
                key={post._id}
                id={post._id}
                currentUserId={user?.id || ""}
                currentUserInfoID={JSON.stringify(userInfo._id) || ""}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
                likes={post.userLikes}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
}