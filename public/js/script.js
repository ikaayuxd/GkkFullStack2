document.getElementById("load").addEventListener("click", loadProducts);

async function loadProducts() {
  const category = document.getElementById("category").value;
  const response = await fetch(`/api/products/${category}`);
  const data = await response.json();
  const container = document.getElementById("products");
  container.innerHTML = data.map(p => `
    <div class="product">
      <h3>${p.name}</h3>
      <p>Category: ${p.category}</p>
      <p>Price: ₹${p.price}</p>
    </div>
  `).join('');
}
