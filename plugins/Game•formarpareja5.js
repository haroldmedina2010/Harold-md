let R = Math.random;
let Fl = Math.floor;
let toM = (a) => "@" + a.split("@")[0];

function getRandomUnique(arr, count) {
  const selected = new Set();
  while (selected.size < count && selected.size < arr.length) {
    const rand = Fl(R() * arr.length);
    selected.add(arr[rand]);
  }
  return [...selected];
}

async function handler(m, { groupMetadata }) {
  const ps = groupMetadata.participants.map((v) => v.id);

  if (ps.length < 10) {
    return m.reply("🚫 El grupo necesita al menos 10 participantes para formar 5 parejas.");
  }

  const [a, b, c, d, e, f, g, h, i, j] = getRandomUnique(ps, 10);

  m.reply(
    `*_😍Las 5 mejores parejas del grupo😍_*\n\n` +
    `*_1.- ${toM(a)} y ${toM(b)}_*\n- Esta pareja está destinada a estar junta 💙\n\n` +
    `*_2.- ${toM(c)} y ${toM(d)}_*\n- Son dos pequeños tortolitos enamorados ✨\n\n` +
    `*_3.- ${toM(e)} y ${toM(f)}_*\n- Ufff, ya hasta familia deberían tener 🤱🧑‍🍼\n\n` +
    `*_4.- ${toM(g)} y ${toM(h)}_*\n- Estos ya se casaron en secreto 💍\n\n` +
    `*_5.- ${toM(i)} y ${toM(j)}_*\n- Esta pareja está de luna de miel ✨🥵😍❤️*`,
    null,
    {
      mentions: [a, b, c, d, e, f, g, h, i, j],
    }
  );
}

handler.help = ["formarpareja5"];
handler.tags = ["main", "fun"];
handler.command = ["formarpareja5"];
handler.register = true;
handler.group = true;

export default handler;
