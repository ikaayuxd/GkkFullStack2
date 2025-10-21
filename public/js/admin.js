async function loadProducts() {
  const res = await fetch('/api/products/Seeds'); // adjust or loop over categories
  const data = await res.json();
  const tbody = document.querySelector('#adminTable tbody');
  tbody.innerHTML = data.map(p => `
    <tr>
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.category}</td>
      <td>${p.price}</td>
      <td><button onclick="deleteProduct(${p.id})">Delete</button></td>
    </tr>
  `).join('');
}

document.querySelector("#addForm").addEventListener("submit", async e => {
  e.preventDefault();
  const product = {
    name: document.getElementById("name").value,
    category: document.getElementById("category").value,
    price: document.getElementById("price").value
  };
  await fetch('/api/products', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(product)
  });
  e.target.reset();
  loadProducts();
});

async function deleteProduct(id) {
  await fetch(`/api/products/${id}`, { method: 'DELETE' });
  loadProducts();
}

loadProducts();
