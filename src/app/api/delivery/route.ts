import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET() {
  try {
    const partners = await prisma.deliveryPartner.findMany({
      include: {
        hiringRequests: true
      }
    })
    return NextResponse.json({ success: true, partners })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
