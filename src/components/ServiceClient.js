export function haesanonta(callback) {
    return fetch('kysymykset')
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Error message");
            }
            return response.json();
        })
        .then(function (kysymykset) {
            callback(kysymykset);
        });
}