const loadCards = () => {
    fetch("https://openapi.programming-hero.com/api/ai/tools/")
        .then((res) => res.json())
        .then((data) => showData(data.data.tools.slice(0, 6)))
    document.getElementById("spinner").classList.remove("d-none");
    document.getElementById("btn-seeMore").classList.remove("d-none");
};

const cardContainer = document.getElementById('card-container');
const showData = cards => {
    document.getElementById("card-container").innerHTML = "";    
    document.getElementById("spinner").classList.add("d-none");
    cards.forEach(card => {
        const { image, description, features, name, published_in, id } = card;     
        const cardDiv = document.createElement('div');        
        cardDiv.classList.add('col');

        cardDiv.innerHTML = `
        <div class="card rounded shadow p-3 w-96 h-100">
        <img src="${image ? image : 'No image found'}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${description ? description : 'information not available'}</h5>
            <h4 fw-bold>Features</h4>
            <ol>
            <li>${features[0] ? features[0] : 'No Data Found'}</li>
            <li>${features[1] ? features[1] : 'No Data Found'}</li>
            <li>${features[2] ? features[2] : 'No Data Found'}</li>
            </ol>
            
            <hr class+"container">
            <h4 fw-bold>${name ? name : 'No Name found '}</h4>
            <div class = "d-flex gap-2 align-items-center justify-content-between">
            
            <div class = "d-flex gap-2 align-items-center">
                <p><i class="fa-regular fa-calendar-days"></i></p>          
                <p>${published_in ? published_in : 'No Date Found'}</p>
            </div>           
            
            <p><i id="CardArrow" class="fa-solid fa-arrow-right" onclick="showModal('${id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></p>          

            </div>
            </div>
            </div>
            `;
        cardContainer.appendChild(cardDiv)
    })
}

const showModal = id => {
        const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
        fetch(url)
        .then((res) => res.json())
        .then((data) => showModalDetails(data.data))

};

const showModalDetails = modal => {
    const { pricing, features, integrations, input_output_examples, image_link, accuracy, description } = modal;
    const modalPrice = document.getElementById('first-section');
    const modalTitle = document.getElementById('cardModalLabel');
    modalTitle.innerText = description;

    modalPrice.innerHTML = `
    <div class = "d-flex justify-content-between row">

    <div class = "col-sm-6">            
            <div class = "gap-2 d-flex justify-content-between">            
            <div class="fs-5 text-success bg-white rounded p-2">
            <p>${pricing['0']['plan']}</p>
            <p>${pricing['0']['price'] === '0' ? 'Free of Cost' : pricing['0']['price']}</p>
            </div>
            
            <div class="fs-5 text-warning bg-white rounded p-2">
            <p>${pricing['1']['plan']}</p>
            <p>${pricing['1']['price'] === '0' ? 'Free of Cost' : pricing['1']['price']}</p>
            </div>
            
            <div class="fs-5 text-danger bg-white rounded p-2">
            <p>${pricing['2']['plan']}</p>
            <p>${pricing['2']['price']}</p>
            </div>
            </div>

            <div class = "row d-flex justify-content-between text-start">
                
            <div class = "col-sm-6">
            <h4>features</h4>
                <li>${features['1'].feature_name ? features['1'].feature_name : 'No Data Found'}</li>
                <li>${features['2'].feature_name ? features['2'].feature_name : 'No Data Found'}</li>
                <li>${features['3'].feature_name ? features['3'].feature_name : 'No Data Found'}</li>
            </div>
                
            <div class = "col-sm-6">
            <h4>Integrations</h4>
            <li>${integrations['0'] === ' ' ? 'No data found' : integrations['0']}</li>
            <li>${integrations['1'] === ' ' ? 'No data found' : integrations['1']}</li>
            <li>${integrations['2'] === ' ' ? 'No data found' : integrations['2']}</li>
            </div>

            </div>
    </div>    

    <div class ="col-sm-6">
        <div>
        <span class="sticky-md-top fs-5 text-right z-2 position-absolute p-2 rounded-2 badge rounded-pill text-bg-danger">${accuracy.score * 100 + '%' + ' accuracy' === '0' ? "No accuracy found" : accuracy.score * 100 + '%' + ' accuracy'}</span>        
        <section><img class="img-fluid rounded w-96 h-full mx-auto" src="${image_link['0']}" alt=""></section>
        </div>

        <div>
            <h3>${input_output_examples['0'].input ? input_output_examples['0'].input : 'No Data Found'}</h3>
            <p>${input_output_examples['0'].output ? input_output_examples['0'].output : 'No! Not Yet! Take a break!!!'}</p>
           
        </div>
    </div>
</div>

`;

}

const seeMoreDataTogether = () => {
        fetch("https://openapi.programming-hero.com/api/ai/tools/")
        .then((res) => res.json())
        .then((data) => {
            showData(data.data.tools);
            document.getElementById("btn-seeMore").classList.add("d-none");
        });
};


showModal()
loadCards()

