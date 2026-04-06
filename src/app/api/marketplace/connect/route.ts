import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { vendorId, marketplaceId } = await req.json()

    if (!vendorId || !marketplaceId) {
      return NextResponse.json({ success: false, error: 'Missing vendorId or marketplaceId' }, { status: 400 })
    }

    const connection = await prisma.marketplaceConnection.upsert({
      where: {
        vendorId_marketplaceId: { 
          vendorId, 
          marketplaceId 
        }
      },
      update: { 
        status: 'CONNECTED',
        updatedAt: new Date()
      },
      create: {
        vendorId,
        marketplaceId,
        status: 'CONNECTED'
      }
    })

    return NextResponse.json({ success: true, connection })
  } catch (err: any) {
    console.error('Marketplace Connection Error:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
