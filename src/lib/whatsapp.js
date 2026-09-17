const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER

export function whatsappLink(message) {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`
}

export function productWhatsappMessage(product) {
  return `Hi, I'm interested in this product:\n\n*${product.name}*\nPrice: ₹${product.price}\n\nLink: ${window.location.href}`
}

export function labBookingWhatsappMessage(form) {
  return (
    `New Lab Test Booking Request\n\n` +
    `Name: ${form.name}\n` +
    `Age: ${form.age}\n` +
    `Doctor Name: ${form.doctorName}\n` +
    `Address: ${form.address}\n` +
    `Mobile: ${form.mobile}\n` +
    `Email: ${form.email}` +
    (form.prescriptionUrl ? `\nPrescription: ${form.prescriptionUrl}` : '')
  )
}