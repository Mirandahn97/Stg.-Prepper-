//Funktion der formaterer et tal som en pris i danske kroner (DKK)
export const price2Dkk = value => {
    //Bruger Intl.NumberFormat til at vises tal på dansk måde
    //Fx 1234.5 → "DKK 1.234,50"
    return new Intl.NumberFormat('da-DK', {
        style: 'currency',              //Viser tallet som en valuta
        currency: 'DKK',                //Sætter valutaen til danske kroner
        currencyDisplay: 'code'         //Viser "DKK" i stedet for "kr."
    }).format(value)                    //Formatterer tallet og retunerer det som tekst
}