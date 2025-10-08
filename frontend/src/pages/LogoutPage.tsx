export default function LogoutPage() {
  window.location.href = "/api/logout?redirect_to_login=true";
  return <div>Logging out...</div>;
}
