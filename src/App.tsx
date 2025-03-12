import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddressPage from "./pages/AddressPage";
import AddAddress from "./pages/AddAddress";
import { Layout, Button } from "antd";

const { Header, Content } = Layout;

const App = () => (
  <Router>
    <Layout>
      <Header className="header">
        Address Management
        <Link to="/add">
          <Button type="default" style={{ marginLeft: 20 }}>+ Add Address</Button>
        </Link>
      </Header>
      <Content style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/address/:id" element={<AddressPage />} />
          <Route path="/add" element={<AddAddress />} />
        </Routes>
      </Content>
    </Layout>
  </Router>
);

export default App;
