import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { vendorId, partnerId } = await req.json()

    if (!vendorId || !partnerId) {
      return NextResponse.json({ success: false, error: 'Missing vendorId or partnerId' }, { status: 400 })
    }

    const request = await prisma.hiringRequest.upsert({
      where: {
        vendorId_partnerId: { 
          vendorId, 
          partnerId 
        }
      },
      update: { 
        status: 'PENDING',
        updatedAt: new Date()
      },
      create: {
        vendorId,
        partnerId,
        status: 'PENDING'
      }
    })

    return NextResponse.json({ success: true, request })
  } catch (err: any) {
    console.error('Hiring Request Error:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
