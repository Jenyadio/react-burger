const NORMA_API = "https://norma.nomoreparties.space/api";

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((e) => Promise.reject(e))
};

export default function getIngredients() {
    return fetch(`${NORMA_API}/ingredients`)
     .then(checkResponse)
}
 
export async function sendRequest(method, body) {
    return await fetch(`${NORMA_API}/orders`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: body,
      }),
    })
    .then(checkResponse)
}