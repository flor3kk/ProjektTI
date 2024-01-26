/**
/**
 * Funkcja dodająca dzisiejszą i jutrzejszą datę do odpowiednich divów.
 * Aktualizuje zawartość elementów HTML o identyfikatorach "dzisiaj" i "jutro"
 * wartościami sformatowanymi datami dzisiaj i jutro.
 *
 */
async function body(){

    
    const dzisiaj = new Date();
    const jutro = new Date(dzisiaj);
    jutro.setDate(dzisiaj.getDate() + 1)

    document.getElementById("dzisiaj").innerHTML += dzisiaj.toLocaleDateString();
    document.getElementById("jutro").innerHTML += jutro.toLocaleDateString();

}

/**
 * Funkcja dodająca środki do portfela użytkownika.
 * Umożliwia użytkownikowi wprowadzenie kwoty do dodania poprzez okno prompt.
 * Sprawdza poprawność wprowadzonej kwoty i aktualizuje stan portfela.
 *
 * @description
 * Funkcja realizuje następujące kroki:
 * 1. Pobiera element DOM reprezentujący ilość środków w portfelu użytkownika.
 * 2. Parsuje aktualną ilość środków do formatu liczbowego (float).
 * 3. Wprowadza od użytkownika kwotę do dodania poprzez okno prompt.
 * 4. Sprawdza, czy wprowadzona kwota jest dodatnia i poprawna liczbowo.
 * 5. Jeżeli kwota jest poprawna, dodaje ją do aktualnej ilości środków.
 * 6. Aktualizuje zawartość elementu DOM z ilością środków, zaokrąglając do dwóch miejsc po przecinku.
 *
 * @example
 * // Przykład użycia:
 * // HTML: <div id="kasa">100.00 zł</div>
 * add_funds();
 * // Użytkownik zostanie poproszony o wprowadzenie kwoty do dodania, a następnie stan portfela zostanie zaktualizowany.
 */
function add_funds(){
    let funds = document.getElementById('kasa');
    let funds_add = parseFloat(funds.innerHTML);
    let add = parseFloat(prompt("podaj kwote jaka chcesz dodac: "));

    if(add < 0 || isNaN(add)){
        alert("podano bledna wartosc");
    }
    else{ 
        funds_add += add;
        funds.innerHTML = funds_add.toFixed(2) + " zł";
    }
}



let stawkaDiv = document.getElementById("stawka");
let wygranaDiv = document.getElementById("wygrana");
let kursDiv = document.getElementById("kurs");


/**
 * Włącza lub wyłącza widoczność konkretnego zaznaczonego elementu.
 * Aktualizuje wartość kursu na podstawie zawartości elementu HTML i zarządza klasą 'active'.
 *
 * @description
 * Funkcja realizuje następujące kroki:
 * 1. Pobiera wartość kursu z elementu HTML, używając selektora CSS 'span[class^="kurs"]'.
 * 2. Sprawdza, czy element posiada klasę 'active'.
 * 3. Jeżeli element ma klasę 'active', odejmuje wartość kursu od aktualnej wartości kursu w kursDiv.
 *    Następnie usuwa klasę 'active' z elementu.
 * 4. Jeżeli element nie ma klasy 'active', dodaje wartość kursu do aktualnej wartości kursu w kursDiv.
 *    Następnie dodaje klasę 'active' do elementu.
 *
 * @example
 * // Przykład użycia:
 * // HTML: <div class="kursElement"><span class="kurs">10.50</span></div>
 * toggleDiv(document.querySelector('.kursElement'));
 * // Jeżeli element nie miał klasy 'active', to zostanie dodana,
 * // a wartość kursu (jeżeli była równa 10.50) zostanie dodana do kursDiv.
 * // Jeżeli element miał już klasę 'active', to zostanie usunięta,
 * // a wartość kursu (jeżeli była równa 10.50) zostanie odjęta od kursDiv.
 */
function toggleDiv(element) {
    let kursWartosc = parseFloat(element.querySelector('span[class^="kurs"]').textContent);

    if (element.classList.contains('active')) {
        kursDiv.textContent = (parseFloat(kursDiv.textContent) - kursWartosc).toFixed(2);
        element.classList.remove('active');
    } 
    else {
        kursDiv.textContent = (parseFloat(kursDiv.textContent) + kursWartosc).toFixed(2);
        element.classList.add('active');
    }
}


/**
 * Event listener dla pola wprowadzania stawki, obliczający potencjalną wygraną
 * na podstawie zaznaczonych elementów div.
 *
 * @description
 * Event listener reaguje na zmiany w polu wprowadzania stawki. Następnie oblicza potencjalną
 * wygraną na podstawie wartości kursu i wprowadzonej stawki, zaokrąglając wynik do dwóch miejsc po przecinku.
 * Ostateczny wynik jest aktualizowany w elemencie HTML o identyfikatorze "wygranaDiv".
 *
 * @example
 * // Przykład użycia:
 * // HTML: <input id="stawkaDiv" type="number" />
 * //      <div id="kursDiv">5.00</div>
 * //      <div id="wygranaDiv"></div>
 * stawkaDiv.addEventListener("input", stawkaInputListener);
 * // Gdy użytkownik wprowadzi nową wartość w polu stawki, potencjalna wygrana zostanie automatycznie obliczona
 * // i zaktualizowana w elemencie HTML o identyfikatorze "wygranaDiv".
 */
stawkaDiv.addEventListener("input", function() {

    let kurs = parseFloat(kursDiv.textContent);
    let stawka = parseFloat(stawkaDiv.value);

    let wygrana = kurs * stawka;
    Math.round(wygrana, 2);
    wygranaDiv.textContent = wygrana.toFixed(2);
});


/**
 * Funkcja zatwierdzająca zakład.
 * Sprawdza poprawność wprowadzonej stawki, a następnie aktualizuje stan środków użytkownika
 * i wyświetla odpowiednią informację na podstawie wyniku walidacji.
 *
 * @description
 * Funkcja realizuje następujące kroki:
 * 1. Pobiera wartość kursu z elementu HTML o identyfikatorze "kursDiv".
 * 2. Pobiera wprowadzoną wartość stawki z elementu HTML o identyfikatorze "stawka".
 * 3. Pobiera element HTML o identyfikatorze "kasa" i zapisuje aktualną ilość środków użytkownika.
 * 4. Sprawdza warunki poprawności wprowadzonej stawki:
 *    a. Czy stawka nie przekracza dostępnych środków użytkownika,
 *    b. Czy stawka jest większa niż 0,
 *    c. Czy kurs jest różny od 0.
 * 5. Jeżeli warunki są spełnione, zmniejsza ilość dostępnych środków o wprowadzoną stawkę.
 *    Aktualizuje zawartość elementu HTML o identyfikatorze "kasa".
 *    Wyświetla informację "GIT" na stronie w kolorze czarnym.
 * 6. W przeciwnym przypadku wyświetla informację "BŁAD" na stronie w kolorze czerwonym.
 *
 * @example
 * // Przykład użycia:
 * // HTML: <div id="kursDiv">5.00</div>
 * //      <input id="stawka" type="number" />
 * //      <div id="kasa">100.00 zł</div>
 * //      <div id="info"></div>
 * submit();
 * // W zależności od spełnionych warunków, funkcja zaktualizuje ilość dostępnych środków
 * // i wyświetli informację "GIT" lub "BŁAD" na stronie.
 */
function submit(){
    let kurs = parseFloat(kursDiv.textContent);
    let price = document.getElementById('stawka').value;
    let change = document.getElementById("kasa");
    let our_funds = parseFloat(document.getElementById("kasa").innerHTML);
    if(price > our_funds || price == 0 || kurs == 0 || price <= 0){
        document.getElementById("info").innerHTML = "BŁAD";
        document.getElementById("info").style.color = "red";
    }
    else{
        document.getElementById("info").innerHTML = "GIT";
        document.getElementById("info").style.color = "black"; 
        our_funds -= price;  
        change.innerHTML = our_funds.toFixed(2) + " zł";
    }
}

/**
 * funkcja otiwerajaca okno dialogowe
 */

function question(){
    document.querySelector('#formularz').showModal();
}

/**
 * funkcja  zamykajaca okno dialogowe
 */
function closeDialog(){
    document.querySelector('#formularz').close();
}

/**
 * Funkcja generująca plik PDF na podstawie danych wprowadzonych w formularzu.
 *
 * @function
 * @name GeneratePdf
 * @param {Event} event - Obiekt zdarzenia (Event) wywołany w celu zatwierdzenia formularza.
 * @returns {void}
 *
 * @description
 * Funkcja realizuje następujące kroki:
 * 1. Zapobiega domyślnemu zachowaniu formularza przy użyciu `event.preventDefault()`.
 * 2. Pobiera wartości z pól formularza, takie jak data, zainteresowania i cena.
 * 3. Tworzy dynamiczny element div, w którym umieszcza informacje o użytkowniku.
 * 4. Generuje plik PDF przy użyciu biblioteki html2pdf na podstawie stworzonego diva.
 *
 * @example
 * // Przykład użycia:
 * // HTML: <form onsubmit="GeneratePdf(event)">
 * //        <input id="data" type="date" />
 * //        <input id="zainteresowania" type="text" />
 * //        <input id="cena" type="number" />
 * //        <button type="submit">Generuj PDF</button>
 * //      </form>
 * GeneratePdf(event);
 * // Wywołanie funkcji generuje plik PDF na podstawie wprowadzonych danych formularza.
 */
function GeneratePdf(event) {
    event.preventDefault(); // zapobiega domyslnym

    var data = new Date(document.getElementById('data').value).toLocaleDateString();
    var zainter = document.getElementById('zainteresowania').value;
    var cena = document.getElementById('cena').value;

    var element = document.createElement('div');
    element.innerHTML = '<h1>Info o uzytkowniku: </h1>' +
        '<p>data: ' + data + '</p>' +
        '<p>zainteresowania: ' + zainter + '</p>' +
        '<p>cena: ' + cena + '</p>';

    html2pdf().from(element).save();
}

/**
 * dodajce listener do przycisku o id druk
 */
document.getElementById('druk').addEventListener('submit', GeneratePdf);

/**
 * funkcja ktora nawiguje do okreslonej strony
 * @param {string} web - link do strony
 */
function myhref(web){
    window.location.href = web;}