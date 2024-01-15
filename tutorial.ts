import { editor } from "$sb/silverbullet-syscall/mod.ts";
import { readSetting } from "$sb/lib/settings_page.ts";

const settingsKey = "tutorialPlug";
type TutorialConfig = {
  userCount: number;
};

const defaultConfig: TutorialConfig = {
  userCount: 1,
};

export async function helloWorld() {
  await editor.flashNotification("Hello world!");
}

export async function randomUser() {
  const config = { ...defaultConfig, ...(await readSetting(settingsKey, {})) };

  const selectedUserId = 1 + Math.floor(Math.random() * config.userCount);
  console.log(config, selectedUserId);

  const result = await fetch(
    `https://jsonplaceholder.typicode.com/users/${selectedUserId}`
  );

  if (result.status < 200 || result.status >= 300) {
    // Handle HTTP errors here
    if (result.status == 404) {
      await editor.flashNotification(
        "Couldn't fetch random user, ensure userCount is not greater than 10",
        "error"
      );
      return;
    } else throw new Error(await result.text());
  }
  const data = await result.json();

  await editor.flashNotification(data["name"]);
}
