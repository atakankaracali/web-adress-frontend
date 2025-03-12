import { useEffect, useState } from "react";
import { List, Button, Spin, Alert, Card } from "antd";
import { getAddresses } from "../api/addressService";
import { Address } from "../types";
import { useNavigate } from "react-router-dom";

const AddressList = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAddresses()
      .then(setAddresses)
      .catch(() => setError("Failed to fetch addresses. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spin size="large" style={{ display: "block", textAlign: "center", marginTop: 50 }} />;
  if (error) return <Alert message={error} type="error" showIcon />;

  return (
    <div className="container">
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Address List</h2>
      <List
        dataSource={addresses}
        renderItem={(address) => (
          <Card className="list-item">
            <div className="list-item-content">
              <span className="list-item-title">{address.address}</span>
              <span className="list-item-subtitle">{address.country || "Unknown"}</span>
            </div>
            <Button type="primary" shape="round" onClick={() => navigate(`/address/${address.id}`)}>
              View
            </Button>
          </Card>
        )}
      />
    </div>
  );
};

export default AddressList;
