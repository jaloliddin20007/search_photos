const API_KEY = "563492ad6f91700001000001a83d5d38d9b7497d8ac3949e94be86c1";
const input = document.querySelector('input')
const btn =  document.querySelector('button')

let searchText = ""
let search = false;


// odatiy holatdagi rasmlar

async function defaultPhotos(){
    const data = await fetch(`https://api.pexels.com/v1/curated`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization:  API_KEY
        }
    })

    const response = await data.json()
    console.log(response)
    displayImages(response)
}

// rasmlarni chiqarish uchun funkisya

function displayImages(response){
    response.photos.forEach((image) => {
        const photoDiv = document.createElement('div')
        photoDiv.innerHTML =  
            `<a href=${image.src.large} target="_blank">
                <img class="image" src=${image.src.large} alt=${image.url}>
            </a>`
        document.querySelector('.display_images').appendChild(photoDiv)
    })
}

//qidiruv uchun funkisya

async function searchPhotos(qiymat){
    const data = await fetch(`https://api.pexels.com/v1/search?query=${qiymat}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization:  API_KEY
        }
    })

    const response = await data.json()

    console.log(response)
    displayImages(response)
}

// hodisalar

input.addEventListener('input', (e) => {
    e.preventDefault();
    searchText=e.target.value;
})

btn.addEventListener('click', () => {
    if(input.value == ""){
        document.querySelector(".alert").innerHTML = "Hech narsa kiritmading, nimadir kirit!"
    } else {
        document.querySelector(".alert").innerHTML = "";
        tozalash();
        search = true;
        searchPhotos(searchText)
    }
})

function tozalash() {
    document.querySelector('.display_images').innerHTML = "";
}

defaultPhotos();