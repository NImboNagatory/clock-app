function showInfo(){
    const quoteCont = document.getElementById("quote__container")
    const moreBtnText = document.getElementById("btn_text")
    const moreBtnSvg = document.getElementById("btn_svg")
    const timeCont = document.getElementById("time__container")
    const infoCont = document.getElementById("info__container")
    if (moreBtnText.textContent === "MORE"){
        moreBtnText.textContent = "LESS"
        moreBtnSvg.src = "./assets/desktop/icon-arrow-up.svg"
        timeCont.style = "margin-top:0;"
        quoteCont.style = "display:none;"
        infoCont.style = "display:flex;"
    } else if (moreBtnText.textContent === "LESS"){
        moreBtnText.textContent = "MORE"
        moreBtnSvg.src = "./assets/desktop/icon-arrow-down.svg"
        timeCont.style = "margin-top:16.180555555555557%;"
        quoteCont.style = "display:block;"
        infoCont.style = "display:none;"
    }

    
}

async function updateQuote() {
    // Fetch a random quote from the Quotable API
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    console.log(data)
    const quoteBody = document.getElementById("quote")
    const quoteauthor = document.getElementById("quoteauthor")
    if (response.ok) {
        // Update DOM elements
        quoteBody.textContent = data.content;
        quoteauthor.textContent = data['author'];
    } else {
        quote.textContent = "An error occured";
        console.log(data);
    }
}




document.addEventListener("DOMContentLoaded", () => {
    const refreshBtn = document.getElementById("refreshBtn")
    refreshBtn.addEventListener("click", () => {
        updateQuote()
    })

    updateQuote()
});