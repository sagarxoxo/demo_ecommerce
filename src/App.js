import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [category, setCategory] = useState("none_selected");
  const [allCategories, setAllCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const searchByCategory = () => {
    category === "none_selected" ? getProducts() : getProductsByCategories();
  };

  const resetProducts = () => {
    getProducts();
    setCategory("none_selected");
  };

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  async function getProducts() {
    setLoading(true);
    await axios("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  async function getCategories() {
    await axios("https://fakestoreapi.com/products/categories")
      .then((response) => setAllCategories(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  async function getProductsByCategories() {
    setLoading(true);
    await axios(`https://fakestoreapi.com/products/category/${category}`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  return (
    <div className="App">
      <h2>Fake Store</h2>
      <div className="btn-sec">
        <select name="category" value={category} onChange={handleChange}>
          <option value="none_selected">Select Category</option>
          {allCategories.map((data, index) => (
            <option key={index} value={data}>
              {data}
            </option>
          ))}
        </select>
        <button onClick={searchByCategory}>Search</button>
        <button onClick={resetProducts}>Reset</button>
      </div>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <table className="table-main">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Images</th>
              <th>Price</th>
              <th>Description</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              return (
                <tr key={index}>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>
                    <img src={product.image} width="50px" />
                  </td>
                  <td>{product.price}</td>
                  <td>{product.description}</td>
                  <td>{product.category}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
