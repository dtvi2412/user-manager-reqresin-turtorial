import { useState } from 'react';

function useDialog() {
  const [dialog, setDialog] = useState({
    isOpen: false,
    message: '',
  });

  const closeDialog = () => {
    setDialog({
      isOpen: false,
      message: '',
    });
  };

  const handleChangeDialog = (isOpen, message) => {
    setDialog({
      isOpen,
      message,
    });
  };

  return { dialog, closeDialog, handleChangeDialog };
}

export default useDialog;
