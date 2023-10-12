import CONFIG from "../CONFIG.json";

export async function cacheSearch(imageHash) {
  try {
    const response = await fetch(CONFIG.API_BASE + "api/search/" + imageHash, {
      method: "GET",
    });
    const body = response.json();
    return body;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function uploadSearch(file) {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(CONFIG.API_BASE + "api/search", {
    method: "POST",
    body: formData,
  });
  const result = await response.json();
  return result;
}
