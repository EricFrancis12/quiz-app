// TODO: Possibly add a page to be returned here
// after logout is successful,
// so user sees a webpage and not JSON
export default function LogoutPage() {
  window.location.href = "/api/logout";
  return <div>Logging out...</div>;
}
