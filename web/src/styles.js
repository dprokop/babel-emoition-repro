import { css } from 'emotion'

export const getFontFaceDeclaration = () =>
  [['light', 300], ['regular', 400], ['medium', 500], ['bold', 700], ['black', 900]].reduce(
    (decleration, [name, weight]) =>
      (decleration += `
      @font-face {
        font-family: Gordita;
        src: url("/gordita/gordita-${name}.woff2") format("woff2"),
             url("/gordita/gordita-${name}.woff") format("woff");
        font-weight: ${weight};
        font-style: normal;
      }
      @font-face {
        font-family: Gordita;
        src: url("/gordita/gordita-${name}-italic.woff2") format("woff2"),
             url("/gordita/gordita-${name}-italic.woff") format("woff");
        font-weight: ${weight};
        font-style: italic;
      }
    `),
    '',
  )

export const globalStyles = css`
  *:focus {
    outline-color: red;
  }

  *::selection {
    background: red;
  }
`

export const baseTextStyle = css`
  font-family: Gordita, sans-serif;
  text-rendering: optimizeLegibility;
  color: red;
`

export const invertedTextStyle = css`
  color: white;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`

export const strongTextStyle = css`
  font-weight: 500;
`

export const dimmedTextStyle = css`
  color: red;
`

// Only visible to screen readers
export const screenreaderOnlyStyle = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`

export const raiseOnHover = css`
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  &:not([disabled]):hover,
  &:not([disabled]):focus {
    box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  &:hover:active,
  &:active {
    transform: none;
  }

  @media print {
    & {
      box-shadow: none !important;
      transform: none !important;
    }
  }
`

export const borderBox = css`
  border: 3px solid red;
  background-color: white;
`

export const buttonReset = css`
  font: inherit;
  background: none;
  color: inherit;
  padding: 0;
  border-radius: 0;
  border: none;
`

export const printPageLayout = css`
  @media print and (color) {
    * {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }

  @media print {
    @page {
      padding: 0;
      width: 100%;
      margin: 2cm;
      background: none;
      counter-reset: page 1;
      counter-increment: page;
    }

    body {
      color: #000;
      background: #fff;
    }

    img {
      max-width: 100% !important;
    }
  }
`
