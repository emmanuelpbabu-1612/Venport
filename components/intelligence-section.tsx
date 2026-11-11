import Image from 'next/image'
import AnimatedContent from '@/components/AnimatedContent'

const layers = [
  {
    number: '01', label: 'UNDERSTAND', title: 'Document intelligence', heading: 'Turn documents into structured shipment information.', description: 'Commercial invoices, packing lists and product descriptions contain the information needed for customs clearance. Venport aims to extract and organise these details into a structured shipment profile, reducing repetitive manual reading and data entry.', value: 'Less document handling. More structured information.', status: 'IN DEVELOPMENT', visual: 'documents',
  },
  {
    number: '02', label: 'CLASSIFY', title: 'Classification intelligence', heading: 'Make product classification easier to review.', description: "Determining the appropriate HS/HSN classification requires understanding what a product is, what it is made of and how it is used. Venport's current prototype explores AI-assisted classification to surface relevant candidate codes for professional review.", value: 'Relevant classification candidates. Professional verification.', status: 'WORKING PROTOTYPE', visual: 'classification',
  },
  {
    number: '03', label: 'VALIDATE', title: 'Compliance intelligence', heading: 'Identify inconsistencies before submission.', description: 'Shipment information must remain consistent across supporting documents and declarations. Venport is developing document comparison and validation capabilities to help customs professionals identify missing information, conflicting details and potential issues before filing.', value: 'Earlier checks. Fewer avoidable inconsistencies.', status: 'IN DEVELOPMENT', visual: 'validation',
  },
  {
    number: '04', label: 'MONITOR', title: 'Regulatory intelligence', heading: 'Keep regulatory changes connected to trade activity.', description: 'Customs requirements and trade regulations evolve. Venport aims to monitor relevant regulatory updates and connect them to affected classifications, products and workflows so professionals can identify changes that may require attention.', value: 'Relevant updates. Clearer operational awareness.', status: 'IN DEVELOPMENT', visual: 'regulatory',
  },
] as const

const layerPhotography = {
  documents: { src: '/images/intelligence/document-intelligence.jpg', alt: 'Trade paperwork and forms being reviewed on a desk', position: 'center' },
  classification: { src: '/images/intelligence/classification-intelligence.jpg', alt: 'Warehouse inventory with boxed and packaged products', position: 'center 38%' },
  validation: { src: '/images/intelligence/compliance-intelligence.jpg', alt: 'Professional reviewing and signing detailed paperwork', position: 'center' },
  regulatory: { src: '/images/intelligence/regulatory-intelligence.jpg', alt: 'Container ship and stacked freight at an international port', position: 'center' },
} as const

function LayerVisual({ type }: { type: keyof typeof layerPhotography }) {
  const photo = layerPhotography[type]
  return <div className="intelligence-visual"><Image src={photo.src} alt={photo.alt} width={1600} height={900} sizes="(max-width: 900px) 100vw, 25vw" className="intelligence-photo" style={{ objectPosition: photo.position }} /></div>
}

export function IntelligenceSection() {
  return <AnimatedContent as="section" id="intelligence" className="intelligence-section section-rule" stagger={0.08}><div className="intelligence-intro"><span className="section-number">03</span><h2>Trade intelligence</h2><p className="intelligence-statement">Every shipment carries information. Every declaration depends on decisions made from that information.</p><p>From understanding commercial documents to identifying product classifications and checking regulatory requirements, customs compliance depends on connecting information across the shipment lifecycle. Venport is building the intelligence layer that helps customs professionals make those decisions with greater clarity.</p></div><div className="intelligence-layers">{layers.map((layer) => <AnimatedContent as="article" className="intelligence-layer" stagger={0.06} key={layer.number}><div className="intelligence-layer-top"><span>{layer.number} — {layer.label}</span><span className="intelligence-status">{layer.status}</span></div><LayerVisual type={layer.visual} /><div className="intelligence-layer-copy"><h3>{layer.title}</h3><h4>{layer.heading}</h4><p>{layer.description}</p></div><p className="intelligence-value"><b>Practical value</b>{layer.value}</p></AnimatedContent>)}</div><AnimatedContent as="div" className="intelligence-workflow" stagger={0.08}><div className="workflow-label">ONE CONNECTED INTELLIGENCE LAYER</div><div className="workflow-sequence">{['DOCUMENTS', 'CLASSIFICATION', 'VALIDATION', 'MONITORING'].map((step, index) => <span key={step}><b>{step}</b>{index < 3 && <i>→</i>}</span>)}</div><p>One connected intelligence layer. Four connected parts of the customs workflow.</p></AnimatedContent><p className="intelligence-distinction">Venport works upstream of customs filing. It is being built to assist customs professionals, not replace them or replace official submission systems such as ICEGATE. Final classification and compliance decisions remain with the responsible professional.</p><a className="arrow-link intelligence-cta" href="/how-it-works">Explore how it works <span>↗</span></a></AnimatedContent>
}
