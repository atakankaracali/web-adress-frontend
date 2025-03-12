import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Button, message, Modal } from "antd";
import { getAddresses, deleteAddress } from "../api/addressService";
import { Address } from "../types";

const AddressDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [address, setAddress] = useState<Address | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAddresses().then((addresses) => {
      const selectedAddress = addresses.find((a) => a.id === Number(id));
      setAddress(selectedAddress || null);
    });
  }, [id]);

  const handleDelete = async () => {
    if (!address) return;

    Modal.confirm({
      title: "Are you sure?",
      content: `Do you really want to delete "${address.address}"? This action cannot be undone.`,
      onOk: async () => {
        await deleteAddress(address.id);
        message.success("Address deleted successfully!");
        navigate("/");
      },
      onCancel: () => message.info("Deletion canceled."),
    });
  };

  return address ? (
    <div className="container">
      <Card
        title={<h2 style={{ textAlign: "center" }}>{address.address}</h2>}
        style={{
          textAlign: "center",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          padding: "20px",
        }}
      >
        <p><strong>Country:</strong> {address.country || "Unknown"}</p>
        <p><strong>Zip:</strong> {address.zip || "N/A"}</p>

        <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "25px" }}>
          <Button type="default" size="large" onClick={() => navigate("/")}>
            Back to Home
          </Button>
          <Button danger size="large" onClick={handleDelete} className="delete-button">
            Delete Address
          </Button>
        </div>
      </Card>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default AddressDetail;
