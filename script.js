// Spinner Handle


// Load All Categories 
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(res => res.json())
        .then(json => displayCategories(json.categories))
        .catch(err => console.error(err));
};

// Display Categories as Buttons
const displayCategories = (categories) => {
    const categoriContainer = document.getElementById("categori-container");
    categoriContainer.innerHTML = "";

    categories.forEach(category => {
        const btn = document.createElement("button");
        btn.innerText = category.category_name;
        btn.className = "btn m-2 rounded-lg";
        btn.onclick = () => {
            // Active State
            document.querySelectorAll("#categori-container button")
                .forEach(b => b.classList.remove("bg-green-500", "text-white"));
            btn.classList.add("bg-green-500", "text-white");

            loadPlantsByCategory(category.id);
        };
        categoriContainer.appendChild(btn);
    });
};

// Load All Plants
const loadAllPlants = () => {
    
    fetch("https://openapi.programming-hero.com/api/plants")
        .then(res => res.json())
        .then(json => displayPlants(json.plants))
        .catch(err => console.error(err));
};

// Load Plants by Category ID
const loadPlantsByCategory = (categoryId) => {
    
    fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
        .then(res => res.json())
        .then(json => {
        
            if (json.plants) {
                displayPlants(json.plants);
                document.getElementById("spinner").style.display="flex"
                document.getElementById("word-container").style.display="none"
            } 
        })
        .catch(err => console.error(err));
};

// Display Plants in Grid
const displayPlants = (plants) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if (!plants || plants.length === 0) {
        wordContainer.innerHTML = "<p class='text-center text-red-500'>No plants found!</p>";
        return;
    }

    const gridDiv = document.createElement("div");
    gridDiv.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4";

    plants.forEach(plant => {
        const card = document.createElement("div");
        card.className = "bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center";
        card.innerHTML = `
            <img src="${plant.image}" alt="${plant.name}" class="w-40 h-40 object-cover rounded-lg mb-3" />
            <h3 class="text-xl font-bold">${plant.name}</h3>
            <p class="text-gray-600">${plant.description.slice(0, 100)}...</p>
            <div class="flex justify-between font-bold items-center w-full">
                <p class="font-semibold mt-2 bg-green-100 rounded-lg text-green-500">${plant.category}</p>
                <p class="font-semibold mt-2">Price: $${plant.price}</p>
            </div>
            <button 
                onclick="addToCart(${plant.id}, '${plant.name}', ${plant.price})" 
                class="btn mt-3 bg-green-400 text-white rounded-lg justify-between text-center w-full">
                Add to Cart
            </button>
        `;
        gridDiv.appendChild(card);
    });

    wordContainer.appendChild(gridDiv);
    setTimeout(()=>{
        document.getElementById("spinner").style.display="none"
       document.getElementById("word-container").style.display="block"
    },3000)
    
};


// Cart System
let cart = [];

// Add to Cart
const addToCart = (id, name, price) => {
    cart.push({ id, name, price });
    displayCart();
};

// Remove from Cart
const removeFromCart = (index) => {
    cart.splice(index, 1); 
    displayCart();
};

// Display Cart
const displayCart = () => {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p class='text-gray-500'>Your cart is empty!</p>";
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const div = document.createElement("div");
        div.className = "flex justify-between items-center bg-white p-2 mb-2 rounded-lg shadow";
        div.innerHTML = `
            <span>${item.name}</span>
            <div class="flex items-center gap-2">
                <span class="font-semibold">$${item.price}</span>
                <button onclick="removeFromCart(${index})" class="text-red-500 font-bold">❌</button>
            </div>
        `;
        cartContainer.appendChild(div);
    });

    const totalDiv = document.createElement("div");
    totalDiv.className = "mt-4 font-bold text-lg flex justify-between";
    totalDiv.innerHTML = `
        <span>Total:</span>
        <span>$${total}</span>
    `;
    cartContainer.appendChild(totalDiv);
};

// Initial Calls
loadCategories();
loadAllPlants();