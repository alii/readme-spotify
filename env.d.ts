declare module "text-to-image" {
  export function generate(text: string): Promise<string>;
}
