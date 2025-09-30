export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Just return children directly - let individual pages handle their own layout
  return <>{children}</>;
}