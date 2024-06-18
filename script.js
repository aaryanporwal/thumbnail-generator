import Jimp from "jimp";
import fs from "fs";

async function main() {
  const topicFont = await Jimp.loadFont("fonts/u-light-47.fnt");
  const subtitleFont = await Jimp.loadFont("fonts/u-light-grey.fnt");

  const topics = fs.readFileSync("topics.txt", "utf8").split("\n");
  const subtitle = "Plenary Session";

  const images = await Promise.all(
    topics.map(async (text) => {
      const template = await Jimp.read("template.jpg");
      template.print(topicFont, 120, 200, text);
      template.print(subtitleFont, 120, 270, subtitle);
      return template;
    }),
  );
  images.forEach((image, index) => {
    const filename = topics[index].replace(/[^a-z0-9]/gi, "-").toLowerCase();
    image.write("output/" + filename + ".jpg");
  });
}

main();
