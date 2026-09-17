import { useState } from 'react'
import { uploadImage } from '../lib/cloudinary'

export default function ImageUploader({ multiple = false, folder = 'BazarBase', onUploaded }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleChange(e) {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setUploading(true)
    setError('')
    try {
      const urls = []
      for (const file of files) {
        const url = await uploadImage(file, folder)
        urls.push(url)
      }
      onUploaded(multiple ? urls : urls[0])
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleChange}
        disabled={uploading}
        className="text-sm"
      />
      {uploading && <p className="text-xs text-slate-500 mt-1">Uploading…</p>}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  )
}