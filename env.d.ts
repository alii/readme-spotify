interface Options {
  /**
   * Sets the width of the generated image in pixels.
   */
  maxWidth: number;
  /**
   * The font size to use for the text in the image.
   */
  fontSize: number;
  /**
   * 	The font family to use for the text in the image.
   */
  fontFamily: string;
  /**
   * 	The font weight to use for the text in the image.
   */
  fontWeight: string | number;
  /**
   * 	The line height for the generated text.
   */
  lineHeight: number;
  /**
   * 	The text alignment for the generated text (possible values: left, start, center, right, end).
   */
  textAlign: string;
  /**
   * 	The margin (all sides) between the text and the border of the image.
   */
  margin: number;
  /**
   * 	Sets the background color of the image.
   */
  bgColor: string;
  /**
   * 	Sets the text color.
   */
  textColor: string;
  /**
   * 	Sets the height of the generated image in pixels. If falsy, will automatically calculate the height based on the amount of text.
   */
  customHeight: number | false;
  /**
   * 	Set to true to turn on debug mode (see debugFilename).
   */
  debug: boolean;
  /**
   * 	Set a custom file name for the file created in debug mode. Defaults to a timestamp with a .png extension.
   */
  debugFilename: string;
}

declare module "text-to-image" {
  export function generate(text: string, options?: Options): Promise<string>;
  export function generateSync(text: string, options?: Options): string;
}
