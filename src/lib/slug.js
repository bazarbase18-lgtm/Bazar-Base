export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')   // remove special chars
    .replace(/[\s_]+/g, '-')    // spaces/underscores → dash
    .replace(/-+/g, '-')        // collapse multiple dashes
}

// Builds the URL slug: "royal-total-sugar-control-A3oxB3WvXNDKOsfPoTCl"
export function buildProductUrl(product) {
  return `/product/${slugify(product.name)}-${product.id}`
}

// Extracts the Firestore doc ID from the URL param (ID is always the last
// dash-separated segment since Firestore auto-IDs never contain a dash)
export function extractProductId(slugParam) {
  if (!slugParam) return null
  const lastDash = slugParam.lastIndexOf('-')
  return lastDash === -1 ? slugParam : slugParam.slice(lastDash + 1)
}