const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

function sanitize(name) {
  return (name || 'Untitled')
    .trim()
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .replace(/\s+/g, '_')
}

export async function uploadImage(file, folder = 'BazarBase') {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', UPLOAD_PRESET)
  formData.append('folder', folder)

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  )

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Cloudinary upload failed: ${err}`)
  }

  const data = await res.json()
  return data.secure_url
}

export function buildCategoryFolder(categoryName) {
  return `BazarBase/${sanitize(categoryName)}`
}

export function buildProductFolder(categoryName, productName) {
  return `BazarBase/${sanitize(categoryName)}/${sanitize(productName)}`
}

export function thumb(url, w = 400, h = 400) {
  if (!url) return url
  return url.replace('/upload/', `/upload/w_${w},h_${h},c_fill,q_auto,f_auto/`)
}