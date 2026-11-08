const referenceImage =
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-98A1PeqF4XhU9oJQz2z7tHEatiOUgN.png'

export default function Page() {
  return (
    <main className="reference-page">
      <img
        src={referenceImage}
        alt="Long-form black portfolio website reference with photography, colorful graphics, and editorial typography"
        className="reference-image"
      />
    </main>
  )
}

