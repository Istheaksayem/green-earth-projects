const loadcategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        .then((json) => displayCatagories(json.categories))
}

const displayCatagories = (categories) => {
    const categoriContainer = document.getElementById("categori-container");
    categoriContainer.innerHTML = "";

    for (let categori of categories) {
        const btndiv = document.createElement("div");
        btndiv.innerHTML = `
            <button>${categori.category_name}</button>
        `;
        categoriContainer.append(btndiv);
    }
}

loadcategories();
