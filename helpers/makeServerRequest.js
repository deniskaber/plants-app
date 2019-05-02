export function makeServerRequest(url) {
    return fetch(url, {
        headers: {
            Accept: 'application/json',
        },
        mode: 'cors',
    })
        .then((response) => response.json())
        .catch((error) => {
            console.error(error.message);
            throw error;
        });
}
