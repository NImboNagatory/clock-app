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