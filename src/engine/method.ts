// How each SahiScore dimension is measured, in plain words: shown on About and How we score.
import type { Dim } from './sahiscore'

export const DIM_HOW: Record<Dim, string> = {
  tco: 'On-road price for your state + fuel or charging at real-world mileage + service, tyres and insurance renewals + loan interest − resale value, over the years you’ll keep it. Scored against the cheapest car you could actually buy.',
  safety: 'Bharat NCAP adult and child stars (child stars count double if you have kids). Older, easier Global NCAP results are discounted. Untested cars get a cautious score from airbags and ESC. ADAS adds a little, more if you drive highways.',
  space: 'Wheelbase against how many people ride, boot against your luggage (CNG cylinders eat boot space), cabin height for elderly passengers, and a third row if you sometimes need one.',
  fuel: 'Does the fuel suit your life? EVs need home or office charging and enough real range for your day. Diesel needs high mileage, and Delhi-NCR’s 10-year rule counts against it. CNG needs a pump nearby and suffers in the hills. Strong hybrids shine in city traffic.',
  budget: 'Cars that use 80–100% of your budget score highest. Much cheaper cars score a little lower (you said you could spend more), and anything in your “stretch” zone loses points steadily. If you share your take-home pay, a car whose EMI is above 15% of it ranks a little lower, and above 25% clearly lower.',
  drive: 'Gearbox against your traffic (a torque-converter, CVT or DCT beats an AMT, which beats a manual in jams), length against your parking, turning circle, and a bonus for compact, forgiving cars if it’s your first.',
  ownership: 'Resale strength, service cost and how far the service network reaches — weighted more heavily if you live in a small town or village.',
  terrain: 'Ground clearance against what your roads need: about 160 mm for smooth roads, 172 for mixed, 185 for rough, 200 for unpaved, +10 mm if your area floods. Power-to-weight counts if you drive in the hills.',
  features: 'How well equipped the car is, scaled by how far up the trim ladder your budget reaches.',
  performance: 'Power-to-weight, plus torque if you spend a lot of time on highways.',
  fresh: 'How recently the car was launched or updated. An old design is likelier to be replaced soon.',
}
