let KEY = '7ed78319e99cb66bc78eabc63db9941b';

let query = "https://api.the-odds-api.com/v4/sports/basketball/odds/?apiKey=" + KEY + "&regions=eu&markets=h2h";

/**
 * pobiera dane z okreslonego zapytania i aktualizuje kontent html z otrzymanymi danymi
 *
 * @param {string} query - zapytanie z ktorego pobierane sa dane
 * @returns {Promise<void>} obietnica ktora zostaje wypelniona po pobraniu i przetworzeniu zapytania
 */

fetch(query)
    .then(res => {
        return res.json();
    })
    .then(data => {
        const meczDivs = document.querySelectorAll('.mecz');

        data.forEach((liga, index) => {
            if (meczDivs[index]) {
                const h5Element = meczDivs[index].querySelector('h5');
                if (h5Element) {
                    h5Element.textContent = liga.sport_title;
                }

                const klub1 = meczDivs[index].querySelector('.klub1');
                const kurs1 = meczDivs[index].querySelector('.kurs1');
                const klub2 = meczDivs[index].querySelector('.klub2');
                const kurs2 = meczDivs[index].querySelector('.kurs3');

                if (liga.bookmakers && liga.bookmakers.length > 0 &&
                    liga.bookmakers[0].markets && liga.bookmakers[0].markets.length > 0 &&
                    liga.bookmakers[0].markets[0].outcomes && liga.bookmakers[0].markets[0].outcomes.length > 0) 
                    {

                    const outcomes = liga.bookmakers[0].markets[0].outcomes;

                    if (klub1 && kurs1 && outcomes[0]) {
                        klub1.textContent = outcomes[0].name;
                        kurs1.textContent = outcomes[0].price;
                    }
                    if (klub2 && kurs2 && outcomes[1]) {
                        klub2.textContent = outcomes[1].name;
                        kurs2.textContent = outcomes[1].price;
                    }
                }
            }
        });
    })
    .catch(error => console.log(error));