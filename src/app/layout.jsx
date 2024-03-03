
import "./global.css";
import { MaterialSymbol } from "material-symbols";

export const metadata = {
  title: "Pulp",
  description: "Code Sharing Platform",
};

export default function RootLayout({ children }) {
 
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
