import { Button } from 'antd';

interface DeleteButtonProps {
  onDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete }) => {
  return <Button danger onClick={onDelete}>Delete</Button>;
};

export default DeleteButton;
