import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./components/ProductCard";
import { Col, Container, Row } from "react-bootstrap";

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

  console.log(products);
  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  return (
    <Container>
      <div className="btn-sec">
        <div className="d-flex flex-row justify-content-between">
          <div>
            <select
              className="select-dr"
              name="category"
              value={category}
              onChange={handleChange}
            >
              <option value="none_selected">Select Category</option>
              {allCategories.map((data, index) => (
                <option key={index} value={data}>
                  {data}
                </option>
              ))}
            </select>
            <button onClick={searchByCategory} className="btn btn-primary">
              Search
            </button>
          </div>
          <div>
            <button onClick={resetProducts} className="btn btn-secondary mt-4">
              Reset
            </button>
          </div>
        </div>
      </div>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <Container>
          <Row>
            {products.map((data, index) => {
              return (
                <Col lg="3">
                  <ProductCard key={index} product={data} />
                </Col>
              );
            })}
          </Row>
        </Container>
      )}
    </Container>
  );
}

export default App;
