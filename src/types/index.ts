export type BlobKind = "main" | "semicircle" | "roundedRect" | "topRoundRect";
export type BlobSpec = {
  kind: BlobKind;
  color: string;
  width: number;
  height: number;
  left: string;
  eyeY: number;
  eyeGap: number;
  eyeRx: number;
  enterDelay: number;
  zIndex?: number;
  bounceDelay: number;
};
