export function FormGroup(
  props: React.ComponentPropsWithoutRef<"input"> & { label?: string }
) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <label htmlFor={props.id} style={{ marginRight: "8px" }}>
        {props.label}
      </label>
      <input {...props} />
    </div>
  );
}
