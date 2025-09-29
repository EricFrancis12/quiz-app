export function FormGroup(
  props: React.ComponentPropsWithoutRef<"input"> & { label?: string }
) {
  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.label}</label>
      <input {...props} />
    </div>
  );
}
