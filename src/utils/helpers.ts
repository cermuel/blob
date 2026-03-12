import { BlobSpec } from "../types";

export function roundedRectPath(w: number, h: number, topShift: number) {
  const r = 10,
    l = 8,
    t = 8,
    right = w - 8,
    bot = h - 8;
  return `M ${l + r + topShift} ${t} H ${right - r + topShift} Q ${right + topShift} ${t} ${right + topShift} ${t + r} V ${bot - r} Q ${right + topShift} ${bot} ${right - r + topShift} ${bot} H ${l + r} Q ${l} ${bot} ${l} ${bot - r} V ${t + r} Q ${l} ${t} ${l + r + topShift} ${t} Z`;
}

export function topRoundRectPath(w: number, h: number, topShift: number) {
  const radius = w / 2 - 8,
    l = 8,
    right = w - 8,
    bot = h - 8,
    cx = w / 2 + topShift,
    topY = 8;
  return `M ${l} ${bot} L ${l} ${topY + radius} Q ${cx - radius} ${topY} ${cx} ${topY} Q ${cx + radius} ${topY} ${right} ${topY + radius} L ${right} ${bot} Z`;
}

export function semicirclePath(w: number, h: number, topShift: number) {
  const l = 6,
    right = w - 6,
    bot = h - 8,
    radius = (right - l) / 2;
  const sx = w / 2 - radius + topShift,
    ex = w / 2 + radius + topShift;
  return `M ${sx} ${bot} A ${radius} ${radius} 0 0 1 ${ex} ${bot} Z`;
}

export function mainPath(w: number, h: number, topShift: number, bend: number) {
  const left = w * 0.165,
    right = w * 0.835,
    top = h * 0.04,
    bot = h - 8;
  return `
    M ${left + topShift} ${top} L ${right + topShift} ${top}
    C ${right} ${top + h * 0.13} ${right - bend * 0.4} ${(top + bot) / 2} ${right} ${bot}
    L ${left} ${bot}
    C ${left - bend * 0.4} ${bot - h * 0.13} ${left - bend * 0.3} ${(top + bot) / 2} ${left + topShift} ${top}
    Z`;
}

export function buildPath(
  spec: BlobSpec,
  focused: boolean,
  showPassword: boolean,
) {
  const dir = focused ? (showPassword ? -1 : 1) : 0;
  const topShift =
    spec.kind === "semicircle" || spec.kind === "topRoundRect" ? 0 : dir * 24;
  const bend =
    spec.kind === "semicircle" || spec.kind === "topRoundRect" ? 0 : dir * 34;
  switch (spec.kind) {
    case "main":
      return mainPath(spec.width, spec.height, topShift, bend);
    case "semicircle":
      return semicirclePath(spec.width, spec.height, topShift);
    case "roundedRect":
      return roundedRectPath(spec.width, spec.height, topShift);
    case "topRoundRect":
      return topRoundRectPath(spec.width, spec.height, topShift);
  }
}
