import React, { useState, useRef } from "react";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

import "primereact/resources/themes/lara-light-cyan/theme.css";
const DeclarativeDemo = () => {
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);

  const accept = () => {
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have accepted",
      life: 3000,
    });
  };

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog
        group="declarative"
        visible={visible}
        onHide={() => setVisible(false)}
        message="Are you sure you want to proceed?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={accept}
        reject={reject}
      />
      <div>
        <Button
          onClick={() => setVisible(true)}
          icon="pi pi-check"
          label="Show ConfirmDialog"
        />
      </div>
    </>
  );
};
export default DeclarativeDemo;
