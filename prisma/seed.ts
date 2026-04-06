import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.hiringRequest.deleteMany()
  await prisma.marketplaceConnection.deleteMany()
  await prisma.kycDocument.deleteMany()
  await prisma.deliveryPartner.deleteMany()
  await prisma.marketplace.deleteMany()
  await prisma.vendor.deleteMany()

  // Create Marketplaces
  const marketplaces = await Promise.all([
    prisma.marketplace.create({
      data: {
        name: 'Zomato',
        category: 'Food Delivery',
        description: 'Leading food delivery platform in India.',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Zomato_Logo.png',
      },
    }),
    prisma.marketplace.create({
      data: {
        name: 'Swiggy',
        category: 'Food Delivery',
        description: 'Hyperlocal food and grocery delivery service.',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Swiggy_logo.svg/1200px-Swiggy_logo.svg.png',
      },
    }),
    prisma.marketplace.create({
      data: {
        name: 'ONDC',
        category: 'E-commerce',
        description: 'Open Network for Digital Commerce.',
        logoUrl: 'https://ondc.org/assets/images/ondc-logo.svg',
      },
    }),
    prisma.marketplace.create({
      data: {
        name: 'Blinkit',
        category: 'Grocery',
        description: 'Instant grocery delivery service.',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Blinkit-logo.png',
      },
    }),
  ])

  // Create Delivery Partners
  const partners = await Promise.all([
    prisma.deliveryPartner.create({
      data: {
        name: 'Shadowfax',
        type: 'Agency',
        rating: 4.5,
        location: 'Pan India',
        availability: true,
      },
    }),
    prisma.deliveryPartner.create({
      data: {
        name: 'Borzo',
        type: 'Agency',
        rating: 4.2,
        location: 'Mumbai, Delhi, Bangalore',
        availability: true,
      },
    }),
    prisma.deliveryPartner.create({
      data: {
        name: 'Porter',
        type: 'Logistics',
        rating: 4.7,
        location: 'Metro Cities',
        availability: true,
      },
    }),
    prisma.deliveryPartner.create({
      data: {
        name: 'Dunzo',
        type: 'Hyperlocal',
        rating: 4.0,
        location: 'Bangalore, Pune, Hyderabad',
        availability: true,
      },
    }),
  ])

  console.log('Seed data created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
