import { redirect } from "next/navigation";

export default async function HomePage() {
  redirect("/my_drive/1");
}
