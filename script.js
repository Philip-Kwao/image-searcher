API_KEY = "eCzZo5wvpNNs-WwqMs_5YAHgcrXLP0mQwiHfp2fQL5I"
// API_KEY1 = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw"

const formEl = document.querySelector("form")
// console.log(formEl)
const searchInput = document.getElementById("search-input")
// console.log(searchInput)
const searchResult = document.getElementById("search-results")
const moreResultsEl = document.querySelector(".moreBtn")
// console.log(moreResultsEl)
const containerEl = document.querySelector(".container")

    let inputData = ""
    let page = 1

    if(page===0){
        searchResult.innerHTML = ""
    }

async function getImages(){
    inputData = searchInput.value
    // console.log(inputData)

    const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${API_KEY}`)
    const data = await response.json()
    results = data.results

    
    
    results.map((result) => {     
        // console.log(result.urls)
    
    
        //Creating Image Box
        const imgBox = document.createElement("div")
        imgBox.classList.add("img-box")
    
        //Creating Image
        const image = document.createElement("img")
        image.src = result.urls.small
        image.alt = result.urls.alt_description
    
        //Creating Anchor Tag
        const imageLink = document.createElement("a")
        imageLink.href = result.links.html
        imageLink.target = "_blank"
    
        const imageDescription = document.createElement("div")
        imageDescription.classList.add("img-description")
        imageDescription.textContent = result.alt_description
    
        containerEl.appendChild(imgBox)
        imageLink.appendChild(image)
        imgBox.appendChild(imageLink)
        imgBox.appendChild(imageDescription)
    })
    page++
    if(page>1){
        moreResultsEl.style.display = "block"
    }

    moreResultsEl.addEventListener("click", ()=>{
        getImages()
    })


}
//Form Submit
formEl.addEventListener("submit", (event) => {
    event.preventDefault()
    page = 1
    getImages()
})
