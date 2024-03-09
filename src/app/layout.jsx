import "./global.css";
import { MaterialSymbol } from "material-symbols";
import ThemeContextProvider from '../context/ThemeContextProvider'
import ImageContextProvider from '../context/ImageContextProvider'

export default function RootLayout({ children }) {
  return (
    <>
      <ThemeContextProvider>
        <ImageContextProvider>
        <html lang="en">
          <body>
            {children}
          </body>
        </html>
        </ImageContextProvider>
      </ThemeContextProvider>
    </>
  );
}
