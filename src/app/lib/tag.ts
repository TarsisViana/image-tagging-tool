import { Rectangle } from "../ui/tag-tool/tag-tool"

export function normalizeTag(tag:Rectangle) {
  if (tag.width > 0 && tag.height > 0) return tag
  if (tag.width < 0) {
    if (tag.height < 0) {
      const normalizedTag = {
        ...tag,
        x: tag.x + tag.width,
        y: tag.y + tag.height,
        width: Math.abs(tag.width),
        height: Math.abs(tag.height),
      }
      console.log(normalizedTag)
      return normalizedTag;
    }
    const normalizedTag = {
      ...tag,
      x: tag.x + tag.width,
      width: Math.abs(tag.width),
    }
    return normalizedTag;
  }
  const normalizedTag = {
    ...tag,
    y: tag.y + tag.height,
    height: Math.abs(tag.height),
  }
  return normalizedTag;
}