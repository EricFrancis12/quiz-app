import { useState } from "react";
import { Overlay } from "../components/overlay";

type ConfirmOptions = {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
};

export function useConfirm() {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmOptions, setConfirmOptions] = useState<ConfirmOptions | null>(
    null
  );
  const [resolvePromise, setResolvePromise] = useState<
    ((value: boolean) => void) | null
  >(null);

  function showConfirm(options: ConfirmOptions): Promise<boolean> {
    return new Promise((resolve) => {
      setConfirmOptions(options);
      setResolvePromise(() => resolve);
      setIsOpen(true);
    });
  }

  function handleResponse(confirmed: boolean) {
    setIsOpen(false);
    if (resolvePromise) {
      resolvePromise(confirmed);
      setResolvePromise(null);
    }
    setConfirmOptions(null);
  }

  const ConfirmDialog =
    isOpen && confirmOptions ? (
      <Overlay onCloseIntent={() => handleResponse(false)}>
        <div style={{ textAlign: "center" }}>
          {confirmOptions.title && (
            <h2 style={{ marginBottom: "16px", color: "#333" }}>
              {confirmOptions.title}
            </h2>
          )}

          <p
            style={{
              marginBottom: "24px",
              color: "#666",
              fontSize: "16px",
              lineHeight: "1.5",
            }}
          >
            {confirmOptions.message}
          </p>

          <div
            style={{ display: "flex", gap: "12px", justifyContent: "center" }}
          >
            <button
              onClick={() => handleResponse(false)}
              style={{
                ...commonButtonStyle,
                backgroundColor: "#6c757d",
              }}
            >
              {confirmOptions.cancelText || "No"}
            </button>

            <button
              onClick={() => handleResponse(true)}
              style={{
                ...commonButtonStyle,
                backgroundColor: "#dc3545",
              }}
            >
              {confirmOptions.confirmText || "Yes"}
            </button>
          </div>
        </div>
      </Overlay>
    ) : null;

  return {
    showConfirm,
    ConfirmDialog,
  };
}

const commonButtonStyle: React.CSSProperties = {
  padding: "10px 20px",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
  minWidth: "80px",
};
