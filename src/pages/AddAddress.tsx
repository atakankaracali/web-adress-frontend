import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Input, Button, Form, message } from "antd";
import { addAddress } from "../api/addressService";

const AddAddress = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: { address: string; country?: string; zip?: string }) => {
    setLoading(true);
    try {
      await addAddress(values);
      message.success("Address added successfully!");
      navigate("/");
    } catch (error) {
      message.error("Failed to add address");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Card title="Add New Address" style={{ textAlign: "center", maxWidth: 500, margin: "0 auto" }}>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Address" name="address" rules={[{ required: true, message: "Please enter an address" }]}>
            <Input placeholder="Enter address" />
          </Form.Item>
          <Form.Item label="Country" name="country">
            <Input placeholder="Enter country (optional)" />
          </Form.Item>
          <Form.Item label="Zip Code" name="zip">
            <Input placeholder="Enter zip code (optional)" />
          </Form.Item>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <Button type="default" onClick={() => navigate("/")}>
              Back to Home
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Add Address
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AddAddress;
