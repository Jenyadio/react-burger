const NORMA_API = "https://norma.nomoreparties.space/api";

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((e) => Promise.reject(e))
};

export default function getIngredients() {
    return fetch(`${NORMA_API}/ingredients`)
     .then(res => checkResponse(res))
     .catch(e => {
        console.log(e)
      });
}
 