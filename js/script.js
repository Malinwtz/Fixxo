

//arrow
const arrow = document.querySelector('#totop-arrow')
arrow.addEventListener('click', function(){
   window.scrollTo({ top: 0, behavior: "smooth"}) 
})

//scroll-function//self-function utan namn
window.addEventListener('scroll', function() { 
    //get position
    const scrollPosY = window.scrollY

    if(scrollPosY >= 100) {
        arrow.style.display = "block";
    } else {
        arrow.style.display = "none";  
    }
})   


try {
    const toggleButton = document.querySelector('[data-option="toggle"]') 
    //vad vill vi hämta:
    const target = toggleButton.getAttribute('data-target')
    toggleButton.addEventListener('click', toggleTarget)

    function toggleTarget() {
        const element = document.querySelector(target) 

        if (!element.classList.contains('hide')) {
            element.classList.add('hide')
        } 
        else {
            element.classList.remove('hide')
        }
    }

} catch {}


//star rating*******************************************************************************
function createStarRating(rating) {
    //                                      callback function - för varje element i stars
    const stars = Array.from({ length: 5 }, (_, index) => {
        const starClass = index < rating ? "fa-solid" : "fa-regular";
        return `<i class="fa-sharp fa-star ${starClass}"></i>`;
    });
  
    return stars.join("");
  }
  

//HÄMTA PRODUKTER
async function getProducts(target, tag) {
    const element = document.querySelector(target)

    const res = await fetch(`https://kyh-net22.azurewebsites.net/api/products/${tag}`)
    const data = await res.json()

    for(let item of data) {
        element.innerHTML +=
        `
            <div class="collection-card">
            <div class="card-content">    
                <img src="${item.imageUrl}" alt="${item.name}">

                <div class="card-menu">

                    <nav class="icons">
                        <a class="link" href="#"><i class="fa-regular fa-code-compare"></i></a>
                        <a class="link" href="#"><i class="fa-regular fa-heart"></i></a>
                        <a class="link" href="#"><i class="fa-regular fa-bag-shopping"></i></a>
                    </nav>

                    <a class="btn-theme" href="#" >QUICK VIEW</a>
                </div>
            </div>

            <div class="card-body">
                <p class="cathegory">${item.category}</p>
                <p class="title">${item.name}</p>
                <div class="rating">
                    ${createStarRating(item.starRating)}
                </div>
                <p class="price">$${item.originalPrice}</p>
            </div> 

        </div>

        `
    }
}


//HÄMTA ALLA PRODUKTER
async function getAllProducts(target) {
    const element = document.querySelector(target)

    const res = await fetch(`https://kyh-net22.azurewebsites.net/api/products`)
    const data = await res.json()
    

    for(let item of data) {
        element.innerHTML +=
        `
            <div class="collection-card">
            <div class="card-content">    
                <img src="${item.imageUrl}" alt="${item.name}">

                <div class="card-menu">

                    <nav class="icons">
                        <a class="link" href="#"><i class="fa-regular fa-code-compare"></i></a>
                        <a class="link" href="#"><i class="fa-regular fa-heart"></i></a>
                        <a class="link" href="#"><i class="fa-regular fa-bag-shopping"></i></a>
                    </nav>

                    <a class="btn-theme" href="#" >QUICK VIEW</a>
                </div>
            </div>

            <div class="card-body">
                <p class="cathegory">${item.category}</p>
                <p class="title">${item.name}</p>
                <div class="rating">
                    ${createStarRating(item.starRating)}
                </div>
                <p class="price">$${item.originalPrice}</p>
            </div> 

        </div>

        `
    }
}


//SKICKA TILL API

// async function handleContactForm(e) {
//     e.preventDefault()

//     const form = {
//         name: "Malin",
//         email: "mal3eine@hotmail.com",
//         comments: "Jag vill bli kontaktad."
//     }
    
//     // skicka formuläret:
//     const res = await fetch('https://kyh-net22.azurewebsites.net/api/contacts', {
//         method: 'post',
//         headers: {
//             'Content-Type' : 'application/json'
//         },
//         body: JSON.stringify(form)
//     })
    
//     if(res.status === 200)
//         console.log('tack för din förfrågan!')

// }