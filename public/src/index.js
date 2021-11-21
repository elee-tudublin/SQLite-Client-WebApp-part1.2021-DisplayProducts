// import everything from fetchAPI.js
// This will allow resources to be referenced as api.BASE_URL, etc.
import * as api from "./fetchAPIHelper.js";

// 1. Parse JSON
// 2. Create product rows
// 3. Display in web page
//
function displayProducts(products) {
  // Use the Array map method to iterate through the array of products (in json format)

  const rows = products.map((product) => {
    // returns a template string for each product, values are inserted using ${ }
    // <tr> is a table row and <td> a table division represents a column
    // product_price is converted to a Number value and displayed with two decimal places
    // icons - https://icons.getbootstrap.com/
    let row = `<tr>
                <td>${product._id}</td>
                <td>${product.product_name}</td>
                <td>${product.product_description}</td>
                <td>${product.product_stock}</td>
                <td class="price">&euro;${Number(product.product_price).toFixed(
                  2
                )}</td>
                <td><button id="${product._id}" 
                  class="btn btn-sm btn-outline-primary btn-update-product">
                  <span class="bi bi-pencil-square" 
                  data-toggle="tooltip" title="Edit Product">
                  </span></button>
                </td>
              </tr>`;

    return row;
  });
  // Set the innerHTML of the productRows root element = rows
  // join('') converts the rows array to a string, replacing the ',' delimiter with '' (blank)
  document.getElementById("productRows").innerHTML = rows.join("");

  // Add Event listeners
  //
  // 1. Find button all elements with matching class name
  const updateButtons = document.getElementsByClassName("btn-update-product");

  // 2. Assign a 'click' event listener to each button
  // Both arrays have same length so only need 1 loop
  for (let i = 0; i < updateButtons.length; i++) {
    updateButtons[i].addEventListener("click", prepareProductUpdate);
  }
} // end function

//
// Get all products then display
//
async function loadProducts() {
  // Get products using the fetchAPIHelper function
  const products = await api.getDataAsync();

  // If products returned then display them
  if (Array.isArray(products)) {
    displayProducts(products);
  }
}

// Fill the product form when an edit button is clicked
//
async function prepareProductUpdate() {
  try {
    // Get product by id
    // this.id is the id of the button element which called this function
    const product = await api.getDataAsync(`${api.BASE_URL}/${this.id}`);

    // Fill out the form
    document.getElementById("_id").value = product._id; // uses a hidden field - see the form
    document.getElementById("category_id").value = product.category_id;
    document.getElementById("product_name").value = product.product_name;
    document.getElementById("product_description").value = product.product_description;
    document.getElementById("product_stock").value = product.product_stock;
    document.getElementById("product_price").value = product.product_price;

  } catch (err) {
    console.log(err);
  }
}

export { loadProducts, prepareProductUpdate };

// load and display products when this script is first loaded
loadProducts();

