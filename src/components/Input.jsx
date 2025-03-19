export default function Input({ className, ...props }) {
  return (
    <input
      className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 ${className}`}
      {...props}
    />
  );
}
