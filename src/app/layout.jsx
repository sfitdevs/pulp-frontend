import "./global.css";
import { MaterialSymbol } from "material-symbols";
import ThemeContextProvider from '../context/ThemeContextProvider'

export default function RootLayout({ children }) {
  return (
    <>
      <ThemeContextProvider>
        <html lang="en">
          <body>
            {children}
          </body>
        </html>
      </ThemeContextProvider>
    </>
  );
}
