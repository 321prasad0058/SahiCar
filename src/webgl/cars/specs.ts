// The showcase cars live in showcase.ts (the homepage 3D needs only them); the traced models of every car in exact.ts.
import type { CarSpec } from './build'
import { EXACT } from './exact'
import { ALTROZ, CITY, ERTIGA, SHOWCASE, SIERRA_EV, VICTORIS } from './showcase'

export { ALTROZ, CITY, ERTIGA, SHOWCASE, SIERRA_EV, VICTORIS }

/** The closest reference shape for any body style (used without its lamp/grille signature on other cars' pages). */
export function archetype(body: string, fuel?: string): CarSpec {
  if (body === 'hatchback') return ALTROZ
  if (body === 'sedan' || body === 'coupe') return CITY
  if (body === 'mpv') return ERTIGA
  if (fuel === 'ev' && body === 'suv') return SIERRA_EV
  return VICTORIS
}

/** traced models that have passed the side-by-side check against their photos */
const READY: string[] = ['tata-nexon', 'tata-punch', 'hyundai-creta', 'maruti-brezza', 'maruti-swift', 'maruti-fronx', 'maruti-dzire', 'mahindra-scorpio-n', 'kia-seltos', 'maruti-baleno', 'mahindra-thar-roxx', 'hyundai-venue', 'kia-sonet', 'maruti-wagon-r', 'maruti-grand-vitara', 'mahindra-xuv-3xo', 'maruti-ertiga', 'tata-tiago', 'tata-harrier', 'toyota-innova-hycross', 'mahindra-xuv-7xo', 'hyundai-exter', 'kia-carens-clavis', 'toyota-urban-cruiser-hyryder', 'tata-curvv', 'hyundai-i20', 'skoda-kylaq', 'toyota-fortuner', 'tata-safari', 'mg-windsor-ev', 'honda-city', 'kia-syros', 'hyundai-alcazar', 'tata-altroz', 'hyundai-verna', 'maruti-victoris', 'tata-sierra', 'tata-sierra-ev', 'hyundai-grand-i10-nios', 'hyundai-aura', 'maruti-celerio', 'maruti-alto-k10', 'toyota-glanza', 'toyota-urban-cruiser-taisor', 'mahindra-bolero-neo', 'mahindra-bolero', 'tata-nexon-ev', 'tata-punch-ev', 'mahindra-thar', 'renault-kiger', 'nissan-magnite', 'maruti-xl6', 'toyota-rumion', 'tata-tiago-ev', 'tata-curvv-ev', 'tata-harrier-ev', 'skoda-slavia', 'volkswagen-virtus', 'skoda-kushaq', 'volkswagen-taigun', 'honda-elevate', 'honda-amaze', 'mahindra-xev-9e', 'mahindra-be-6', 'mercedes-benz-glc-electric']
// the five showcase cars; models being traced (exact.ts) join once they match their photos side by side
export const SPEC_BY_ID: Record<string, CarSpec> = Object.fromEntries([...SHOWCASE, ...EXACT.filter((s) => READY.includes(s.id))].map((s) => [s.id, s]))
