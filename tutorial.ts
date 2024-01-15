import { editor } from "$sb/silverbullet-syscall/mod.ts";
import { readSettings } from "$sb/lib/settings_page.ts";

export async function helloWorld() {
  await editor.flashNotification("Hello world!");
}

export async function randomUser() {
  const config = await readSettings({ userCount: 1 });
  console.log(config);

  const result = await fetch("https://jsonplaceholder.typicode.com/users/1");
  if (result.status < 200 || result.status >= 300) {
    // Handle HTTP error here
    throw new Error(await result.text());
  }
  const data = await result.json();

  await editor.flashNotification(data["name"]);
}
