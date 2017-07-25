const readFile = filename =>
  new Promise((resolve, reject) => {
    chrome.runtime.getPackageDirectoryEntry(root => {
      root.getFile(filename, {}, fileEntry => {
        fileEntry.file(file => {
          var reader = new FileReader();
          reader.onloadend = e => resolve(e.target.result);
          reader.readAsText(file);
        }, reject);
      }, reject);
    });
  });

readFile("kanji.txt")
  .then(kanjiText => {
    { // Set random kanji
      const kanjis = kanjiText.split("\n");
      const kanji = kanjis[Math.floor(Math.random() * kanjis.length)];
      const kanjiMeaning = kanji.split(" ")[0];
      const kanjiCharacter = kanji.split(" ").slice(1).join(" ");
      document.querySelector("#kanji-meaning").textContent = kanjiMeaning;
      document.querySelector("#kanji-character").textContent = kanjiCharacter;
    }

    { // Set random background color
      const colors = [
        "#5a58e2", // blue
        "#58cfe2", // cyan
        "#58e2b5", // green
        "#58e296", // green
        "#dae258", // yellow
        "#e29e58", // orange
        "#e25858", // red
        "#e2589e", // magenta
        "#da58e2", // purple
      ];

      const color = colors[Math.floor(Math.random() * colors.length)];
      document.querySelector("body").style.backgroundColor = color;
    }
  })
  .catch(err => console.log(err));
