module.exports.config = {
  name: "schoolid",
  version: "1.0.0",
  role: 0,
  author: "Kaiden",
  description: "enroll na mga bobo",
  category: "Giáº£i trÃ­",
  usages: "@mention",
  cooldowns: 0
};

module.exports.onText = (ctx, name, maxWidth) => {
        return new Promise(resolve => {
                if (ctx.measureText(name).width < maxWidth) return resolve([name]);
                if (ctx.measureText('W').width > maxWidth) return resolve(null);
                const words = name.split(' ');
                const lines = [];
                let line = '';
                while (words.length > 0) {
                        let split = false;
                        while (ctx.measureText(words[0]).width >= maxWidth) {
                                const temp = words[0];
                                words[0] = temp.slice(0, -1);
                                if (split) words[1] = `${temp.slice(-1)}${words[1]}`;
                                else {
                                        split = true;
                                        words.splice(1, 0, temp.slice(-1));
                                }
                        }
                        if (ctx.measureText(`${line}${words[0]}`).width < maxWidth) line += `${words.shift()} `;
                        else {
                                lines.push(line.trim());
                                line = '';
                        }
                        if (words.length === 0) lines.push(line.trim());
                }
                return resolve(lines);
        });
} 

module.exports.onStart = async function ({ args, usersData, threadsData, api, event, Currencies }) {
  const { loadImage, createCanvas } = require("canvas");
  const fs = require("fs");
  const axios = require("axios");
  let pathImg = __dirname + "/cache/background.png";
  let pathAvt1 = __dirname + "/cache/Avtmot.png";


  var id = Object.keys(event.mentions)[0] || event.senderID;
  var name = await usersData.getName(event.senderID);
  var ThreadInfo = event.threadID;

  var background = [
    "https://imgur.com/da5GfX8.jpeg"
  ];
  var rd = background[Math.floor(Math.random() * background.length)];

  let getAvtmot = (
    await axios.get(
      `https://graph.facebook.com/${id}/picture?width=232&height=232&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
      { responseType: "arraybuffer" }
    )
  ).data;
  fs.writeFileSync(pathAvt1, Buffer.from(getAvtmot, "utf-8"));

  let getbackground = (
    await axios.get(`${rd}`, {
      responseType: "arraybuffer",
    })
  ).data;
  fs.writeFileSync(pathImg, Buffer.from(getbackground, "utf-8"));

  let baseImage = await loadImage(pathImg);
  let baseAvt1 = await loadImage(pathAvt1);

  let canvas = createCanvas(baseImage.width, baseImage.height);
  let ctx = canvas.getContext("2d");
  ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
  ctx.font = "400 23px Arial";
  ctx.fillStyle = "#c2a24a";
  ctx.textAlign = "start";

  const lines = await this.onText(ctx, name, 2000);
  ctx.fillText(lines.join('\n'), 270, 790);//comment
  ctx.beginPath();

  // Adjust the position and size here
  ctx.drawImage(baseAvt1, 155, 153, 232, 232);

  const imageBuffer = canvas.toBuffer();
  fs.writeFileSync(pathImg, imageBuffer);
  fs.unlinkSync(pathAvt1);
  return api.sendMessage({ body: ` `, attachment: fs.createReadStream(pathImg) },
      event.threadID,
      () => fs.unlinkSync(pathImg),
      event.messageID);
}


//nothing