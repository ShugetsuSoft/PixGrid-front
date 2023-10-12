import Pica from "pica";

const pica = Pica();

export async function calculateSHA256(file) {
  const reader = new FileReader();
  const fileReadPromise = new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
  reader.readAsArrayBuffer(file);

  const fileData = await fileReadPromise;
  const hashBuffer = await crypto.subtle.digest("SHA-256", fileData);

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

export async function resize(file) {
  const reader = new FileReader();
  const readFile = new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
  reader.readAsDataURL(file);

  const uri = await readFile;
  const img = new Image();
  const readImage = new Promise((resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
  img.src = uri;
  await readImage;

  var canvas = document.createElement("canvas");
  canvas.width = 224;
  canvas.height = 224;

  await pica.resize(img, canvas);

  const blob = await new Promise((resolve) => {
    canvas.toBlob((b) => {
      resolve(b);
    }, "image/jpeg");
  });

  return new File([blob], "file.jpg", {
    type: "image/jpeg",
  });
}
