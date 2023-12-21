export interface GithubLanguages {
  aliases: string[];
  name: string;
}

export async function fetchLangauges() {
  try {
    const languages = await fetch("https://api.github.com/languages/javscript")
      .then((response) => response.json())
      .then((data: GithubLanguages[]) =>
        data.map((item) => {
          return { ...item, value: item.name, label: item.name };
        }),
      );
    // console.log(languages);
    return languages;
  } catch (error) {
    throw error;
  }
}
