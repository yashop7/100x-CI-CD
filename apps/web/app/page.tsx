import { client } from "@repo/db/client";

export default async function Page() {
  const users = await client.user.findMany();
  console.log("users: ", users);
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <h1>Welcome back, {user.username}!</h1>
          <p>Your user ID is: {user.id}</p>
        </div>
      ))}
    </div>
  );
}